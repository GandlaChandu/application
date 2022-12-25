using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Mapper;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

using CommonConstants = Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter
{
    public class SonarQubeClient : ISonarQubeClient
    {
        #region Variables

        private readonly IHttpService _httpService;

        #endregion Variables

        #region Constructors

        public SonarQubeClient(IHttpServiceFactory httpServiceFactory)
        {
            _httpService = httpServiceFactory.CreateHttpService(CommonConstants.Constants.SonarServerHttpClient);
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<SonarIssueDTO>>> GetScanResultAsync(IssueListParametersDTO parameters, Pagination pagination)
        {
            Result<SonarStaticScanResultDTO> issuesResponse = await GetIssuesAsync(parameters, pagination);

            if (!issuesResponse.IsSucceeded)
            {
                return Result.Fail<ListResult<SonarIssueDTO>>(issuesResponse.GetErrorString());
            }

            return Result.Ok(issuesResponse.Value.ToPagedStaticScanIssues());
        }

        public async Task<Result<List<SonarIssueDTO>>> GetScanResultByScanIdAsync(IssueListParametersDTO parameters)
        {
            Result<SonarStaticScanResultDTO> issuesResponse = await GetIssuesAsync(parameters, null);

            if (!issuesResponse.IsSucceeded)
            {
                return Result.Fail<List<SonarIssueDTO>>(issuesResponse.GetErrorString());
            }

            var issues = issuesResponse.Value.ToStaticScanIssues();
            await MapCweIdsAsync(parameters, issuesResponse, issues);

            return Result.Ok(issues);
        }

        public async Task<Result<List<SonarIssueDTO>>> GetScanResult(string projectKey, string types)
        {
            Result<SonarStaticScanResultDTO> issuesResponse = await GetIssuesAsync(projectKey, types, null);

            if (!issuesResponse.IsSucceeded)
            {
                return Result.Fail<List<SonarIssueDTO>>(issuesResponse.GetErrorString());
            }

            var issues = issuesResponse.Value.ToStaticScanIssues();
            await MapCweIdsAsync(projectKey, types, issuesResponse, issues);

            return Result.Ok(issues);
        }

        public async Task<Result<StaticScanOverviewDTO>> GetScanOverviewAsync(Guid componentKey)
        {
            return await GetScanOverviewAsync(componentKey.ToString());
        }

        public async Task<Result<StaticScanOverviewDTO>> GetScanOverviewAsync(string componentKey)
        {
            string commaSeparatedMetrics =
                string.Join(",",
                    SonarMetricConstants.Coverage,
                    SonarMetricConstants.Complexity,
                    SonarMetricConstants.DuplicatedLines,
                    SonarMetricConstants.DuplicatedLinesDensity,
                    SonarMetricConstants.Tests,
                    SonarMetricConstants.TestSuccessDensity
                );
            string componentOverviewUri = $"measures/component?component={componentKey}&metricKeys={commaSeparatedMetrics}";

            HttpResponseModel response = await _httpService.GetAsync(componentOverviewUri);
            if (!response.IsSuccess)
            {
                return Result.Fail<StaticScanOverviewDTO>(Messages.UnableToFetchComponentScanOverview);
            }

            MeasureResponse measureResponse = JsonUtility.DeserializeObject<MeasureResponse>(response.Response);

            return Result.Ok(measureResponse.ToStaticScanOverviewDTO());
        }

        public async Task<Result<ListResult<SonarRuleDTO>>> GetRulesAsync(RuleListRequestDTO ruleListRequest)
        {
            string rulesUri = $"rules/search?languages={ruleListRequest.LanguageCode}&severities={ruleListRequest.Severities}&sonarsourceSecurity={ruleListRequest.SonarSourceSecurities}&p={ruleListRequest.Pagination.PageNumber}&ps={ruleListRequest.Pagination.PageSize}";

            HttpResponseModel response = await _httpService.GetAsync(rulesUri);
            if (!response.IsSuccess)
            {
                return Result.Fail<ListResult<SonarRuleDTO>>(Messages.UnableToFetchRules);
            }

            RulesResponse rulesResponse = JsonUtility.DeserializeObject<RulesResponse>(response.Response);

            return Result.Ok(rulesResponse.ToPagedRuleDTO());
        }

        public async Task<Result<CreateQualityProfileResponseDTO>> AddQualityProfileAsync(CreateQualityProfile qualityProfile)
        {
            string qualityProfileCreateUri = "qualityprofiles/create";
            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("language", qualityProfile.Language),
                new KeyValuePair<string, string>("name", qualityProfile.Name)
            });

            HttpResponseModel response = await _httpService.PostAsync(qualityProfileCreateUri, content);
            if (!response.IsSuccess)
            {
                return Result.Fail<CreateQualityProfileResponseDTO>(Messages.UnableToCreateQualityProfile);
            }

            return Result.Ok(JsonUtility.DeserializeObject<CreateQualityProfileResponseDTO>(response.Response));
        }

        public async Task<Result<bool>> ChangeRuleActivationAsync(RuleActivationDTO ruleActivationDTO)
        {
            string ruleActivationUrl;
            if (ruleActivationDTO.IsActive)
            {
                ruleActivationUrl = "qualityprofiles/activate_rule";
            }
            else
            {
                ruleActivationUrl = "qualityprofiles/deactivate_rule";
            }

            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("key", ruleActivationDTO.QualityProfileKey),
                new KeyValuePair<string, string>("rule", ruleActivationDTO.RuleKey)
            });

            HttpResponseModel response = await _httpService.PostAsync(ruleActivationUrl, content);
            if (!response.IsSuccess)
            {
                return Result.Fail<bool>(ruleActivationDTO.IsActive ? Messages.UnableToActivateRule : Messages.UnableToDeactivateRule);
            }

            return Result.Ok(true);
        }

        public async Task<Result<ListResult<SonarRuleDTO>>> GetQualityProfileRulesAsync(string qualityProfileKey, Pagination pagination)
        {
            string rulesUri = $"rules/search?activation=true&qprofile={qualityProfileKey}&p={pagination.PageNumber}&ps={pagination.PageSize}";

            HttpResponseModel response = await _httpService.GetAsync(rulesUri);
            if (!response.IsSuccess)
            {
                return Result.Fail<ListResult<SonarRuleDTO>>(Messages.UnableToFetchRules);
            }

            RulesResponse rulesResponse = JsonUtility.DeserializeObject<RulesResponse>(response.Response);

            return Result.Ok(rulesResponse.ToPagedRuleDTO());
        }

        public async Task<Result> RemoveProjectQualityProfileAsync(ProjectQualityProfileDTO projectQualityProfile)
        {
            string removeProjectQualityProfile = "qualityprofiles/remove_project";
            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("language", projectQualityProfile.Language),
                new KeyValuePair<string, string>("project", projectQualityProfile.ProjectKey.ToString()),
                new KeyValuePair<string, string>("qualityProfile", projectQualityProfile.QualityProfileName)
            });

            HttpResponseModel response = await _httpService.PostAsync(removeProjectQualityProfile, content);
            if (!response.IsSuccess)
            {
                return Result.Fail(Messages.FailedToUnMapQualityProfileToProject);
            }

            return Result.Ok();
        }

        public async Task<Result> AddProjectQualityProfileAsync(ProjectQualityProfileDTO projectQualityProfile)
        {
            string assignQualityProfileUri = "qualityprofiles/add_project";
            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("language", projectQualityProfile.Language),
                new KeyValuePair<string, string>("project", projectQualityProfile.ProjectKey.ToString()),
                new KeyValuePair<string, string>("qualityProfile", projectQualityProfile.QualityProfileName)
            });

            HttpResponseModel response = await _httpService.PostAsync(assignQualityProfileUri, content);
            if (!response.IsSuccess)
            {
                return Result.Fail(Messages.FailedToMapQualityProfileToProject);
            }

            return Result.Ok();
        }

        public async Task<Result> AddProjectAsync(string key)
        {
            string createProjectUri = "projects/create";
            FormUrlEncodedContent content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("name", key),
                new KeyValuePair<string, string>("project", key)
            });

            HttpResponseModel response = await _httpService.PostAsync(createProjectUri, content);
            if (!response.IsSuccess)
            {
                return Result.Fail(Messages.FailedToCreateProject);
            }

            return Result.Ok();
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result<SonarStaticScanResultDTO>> GetIssuesAsync(IssueListParametersDTO parameters, Pagination pagination, string cweId = "")
        {
           return await GetIssuesAsync(parameters.ProjectKey.ToString(), parameters.Types, pagination, cweId);
        }

        private async Task<Result<SonarStaticScanResultDTO>> GetIssuesAsync(string projectKey, string types, Pagination pagination, string cweId = "")
        {
            string issuesUri = $"issues/search?componentKeys={projectKey}&s=FILE_LINE&additionalFields=_all&types={types}";

            if (!string.IsNullOrWhiteSpace(cweId))
            {
                issuesUri += $"&cwe={cweId}";
            }
            else
            {
                issuesUri += "&facets=cwe";
            }

            if (pagination != null)
            {
                issuesUri += $"&p={pagination.PageNumber}&ps={pagination.PageSize}";
            }

            HttpResponseModel issuesResponse = await _httpService.GetAsync(issuesUri);

            if (!issuesResponse.IsSuccess)
            {
                return Result.Fail<SonarStaticScanResultDTO>(Messages.UnableToFindStaticScanIssues);
            }

            var sonarStaticScanResult = JsonUtility.DeserializeObject<SonarStaticScanResultDTO>(issuesResponse.Response);

            return Result.Ok(sonarStaticScanResult);
        }

        private async Task MapCweIdsAsync(IssueListParametersDTO parameters, Result<SonarStaticScanResultDTO> issuesResponse, List<SonarIssueDTO> issues)
        {
            var cweIds = issuesResponse.Value?.Facets?.FirstOrDefault(c => c.Property.Equals("cwe"));

            if (cweIds != null)
            {
                foreach (var cweId in cweIds.Values)
                {
                    if (!cweId.Val.Equals("unknown"))
                    {
                        var cweIssuesResponse = await GetIssuesAsync(parameters, null, cweId.Val);
                        MapCweIds(Convert.ToInt32(cweId.Val), issues, cweIssuesResponse.Value);
                    }
                }
            }
        }

        private async Task MapCweIdsAsync(string projectKey, string types, Result<SonarStaticScanResultDTO> issuesResponse, List<SonarIssueDTO> issues)
        {
            var cweIds = issuesResponse.Value?.Facets?.FirstOrDefault(c => c.Property.Equals("cwe"));

            if (cweIds != null)
            {
                foreach (var cweId in cweIds.Values)
                {
                    if (!cweId.Val.Equals("unknown"))
                    {
                        var cweIssuesResponse = await GetIssuesAsync(projectKey, types, null, cweId.Val);
                        MapCweIds(Convert.ToInt32(cweId.Val), issues, cweIssuesResponse.Value);
                    }
                }
            }
        }

        private void MapCweIds(int cweId, List<SonarIssueDTO> issues, SonarStaticScanResultDTO cweIssues)
        {
            foreach (var cweIssue in cweIssues.Issues)
            {
                var issue = issues.FirstOrDefault(c => c.Key.Equals(cweIssue.Key));
                if (issue != null)
                {
                    issue.CweId = cweId;
                }
            }
        }

        #endregion Private Methods
    }
}
