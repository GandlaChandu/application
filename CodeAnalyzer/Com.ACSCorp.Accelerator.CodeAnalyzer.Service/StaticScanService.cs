using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class StaticScanService : IStaticScanService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IStaticScanRepository _staticScanRepository;
        private readonly IStaticScanDetailsRepository _staticScanDetailsRepository;
        private readonly IServiceProvider _provider;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IStaticScanResultService _staticScanResultService;
        private readonly IStaticScanEmailService _staticScanEmailService;
        private readonly IQueueAPIClient _queueAPIClient;
        private readonly IIdentityService _identityService;

        #endregion Variables

        #region Constructor

        public StaticScanService(
            ILogger<StaticScanService> logger,
            IStaticScanRepository staticScanRepository,
            IStaticScanDetailsRepository staticScanDetailsRepository,
            IServiceProvider provider,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IQueueAPIClient queueAPIClient,
            IStaticScanResultService staticScanResultService,
            IStaticScanEmailService staticScanEmailService,
            IIdentityService identityService)
        {
            _staticScanRepository = staticScanRepository;
            _staticScanDetailsRepository = staticScanDetailsRepository;
            _provider = provider;
            _logger = logger;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _queueAPIClient = queueAPIClient;
            _staticScanResultService = staticScanResultService;
            _staticScanEmailService = staticScanEmailService;
            _identityService = identityService;
        }

        #endregion Constructor

        #region Public Methods

        public async Task<Result<ListResult<StaticScanDTO>>> GetAllScansAsync(StaticScanListRequest request)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            ListResult<StaticScanDTO> staticScanResult = await _staticScanRepository.GetAllStaticScansAsync(request, accessibleProjects);

            await MapProjectName(staticScanResult);

            return Result.Ok(staticScanResult);
        }

        public async Task<Result<StaticScanDTO>> GetStaticScanAsync(int scanId, bool validateAccess = true)
        {
            StaticScanDTO staticScanDTO = await _staticScanRepository.GetStaticScanAsync(scanId);

            if (staticScanDTO == null)
            {
                return Result.Fail<StaticScanDTO>(Messages.UnableToFindScanDetails);
            }

            if (validateAccess)
            {
                Result accessibilityResult = await ValidateProjectAccess(staticScanDTO.ProjectId);

                if (!accessibilityResult.IsSucceeded)
                {
                    return Result.Fail<StaticScanDTO>(accessibilityResult.GetErrorString());
                }
            }

            return Result.Ok(staticScanDTO);
        }

        public async Task<Result<int>> AddStaticScanAsync(int projectId, bool verifyAccess = false)
        {
            if (verifyAccess)
            {
                Result accessibilityResult = await ValidateProjectAccess(projectId);
                if (!accessibilityResult.IsSucceeded)
                {
                    return Result.Fail<int>(accessibilityResult.GetErrorString());
                }
            }

            StaticScanDetailsDTO staticScanDetails = await _staticScanDetailsRepository.GetStaticScanDetailsByProjectIdAsync(projectId);
            if (staticScanDetails == null)
            {
                return Result.Fail<int>(Messages.ProjectNotConfiguredForStaticScan);
            }

            StaticScanDTO staticScanDTO = GetStaticScanDTO(projectId, staticScanDetails);
            int scanId = await _staticScanRepository.AddStaticScanAsync(staticScanDTO);

            await _queueAPIClient.QueueStaticScan(scanId);

            return Result.Ok(scanId);
        }

        public async Task<Result> InitiateStaticScanAsync(int staticScanId)
        {
            StaticScanDTO staticScanDTO = await _staticScanRepository.GetStaticScanAsync(staticScanId);
            if (staticScanDTO == null)
            {
                _logger.LogError(Messages.UnableToFindScanDetails);
                return Result.Fail(Messages.UnableToFindScanDetails);
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(staticScanDTO.ProjectId);
            if (project == null)
            {
                _logger.LogError(Messages.UnableToFindProject);
                return Result.Fail(Messages.UnableToFindProject);
            }

            ///TODO: Removed as Background job is not sending any token
            //if (!_identityService.HasProjectAccess(project.Id, project.ClientId.Value))
            //{
            //    _logger.LogError(Messages.UnAuthorizedEntityAccess);
            //    return Result.Fail(Messages.UnAuthorizedEntityAccess);
            //}

            StaticScanDetailsDTO staticScanDetails = await _staticScanDetailsRepository.GetStaticScanDetailsByProjectIdAsync(staticScanDTO.ProjectId);
            if (staticScanDetails == null)
            {
                return Result.Fail<int>(Messages.FailedToGetStaticScanDetails);
            }

            _logger.LogInformation("Creating Task");

            bool isTaskCreated = false;
            IProgress<bool> taskCreated = new Progress<bool>(taskCreated => isTaskCreated = taskCreated);

            var task = Task.Run(async () => await StartStaticScan(staticScanDTO, project.Key, staticScanDetails, taskCreated));

            while (!isTaskCreated)
            {
                Thread.Sleep(1000);
            }

            return Result.Ok();
        }

        /// <summary>
        /// Save static scan analysis status
        /// </summary>
        /// <param name="sonarCallback"></param>
        public async Task SaveStaticScanAnalysisStatus(SonarQubeCallbackModel sonarCallback)
        {
            _logger.LogInformation(string.Format(Messages.SonarCallBackForTaskId, sonarCallback.TaskId));

            StaticScanDTO staticScanDTO = await _staticScanRepository.GetStaticScanByTaskIdAsync(sonarCallback.TaskId);
            if (staticScanDTO == null)
            {
                _logger.LogError(Messages.UnableToFindScanDetails);
                return;
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(staticScanDTO.ProjectId);
            if (project == null)
            {
                _logger.LogError(Messages.UnableToFindProject);
                return;
            }

            ///TODO: Removed as Background job is not sending any token
            //if (!_identityService.HasProjectAccess(project.Id, project.ClientId.Value))
            //{
            //    _logger.LogError(Messages.UnAuthorizedEntityAccess);
            //    return;
            //}

            if (sonarCallback.Status == Constants.SonarSuccess)
            {
                staticScanDTO.StatusId = (int)StaticScanStatus.Completed;
            }
            else
            {
                staticScanDTO.StatusId = (int)StaticScanStatus.Failed;
            }
            staticScanDTO.EndTime = DateTime.Now;

            await _staticScanRepository.UpdateStaticScanAsync(staticScanDTO);

            //Vulnerablity statistics calculation and saving
            if (sonarCallback.Status == Constants.SonarSuccess)
            {
                await CalculateAndSaveVulnerabilityStatistics(staticScanDTO);
                //Email sending logic        
                if (staticScanDTO.RunById > 0)
                {
                    var emailSendResult = await _staticScanEmailService.SendEmail(staticScanDTO, project);

                    if (!emailSendResult.IsSucceeded)
                    {
                        _logger.LogError(emailSendResult.GetErrorString());
                    }
                    else
                    {
                        _logger.LogInformation(Messages.EmailSentSuccess);
                    }
                }
            }
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateProjectAccess(int projectId)
        {
            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectId);

            if (project == null)
            {
                return Result.Fail(Messages.ProjectDetailNotFound);
            }

            if (!_identityService.HasProjectAdminAccess(project.Id, project.ClientId.Value))
            {
                return Result.Fail(Messages.UnAuthorizedEntityAccess);
            }
            return Result.Ok();
        }

        /// <summary>
        /// Calculate And Save Vulnerability Statistics
        /// </summary> 
        /// <param name="staticScanDTO"></param>
        /// <returns></returns>
        private async Task CalculateAndSaveVulnerabilityStatistics(StaticScanDTO staticScanDTO)
        {
            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(staticScanDTO.ProjectId);
            if (project == null)
            {
                _logger.LogError(Messages.UnableToFindProject);
                return;
            }

            StaticScanDetailsDTO staticScanDetails = await _staticScanDetailsRepository.GetStaticScanDetailsByProjectIdAsync(staticScanDTO.ProjectId);
            if (staticScanDetails == null)
            {
                _logger.LogError(Messages.ProjectStaticScanDetailsNotFound);
                return;
            }

            if (staticScanDetails.StaticScanPreferences != null || staticScanDetails.StaticScanPreferences.Count > 0)
            {
                _logger.LogInformation(Messages.VulnerablityStatisticsCalculationStarted);

                var result = await _staticScanResultService.GetScanResultsByProjectAndStaticScanDtails(project, staticScanDetails);
                if (!result.IsSucceeded)
                {
                    _logger.LogError(Messages.SonarQubeGetFailed);
                    return;
                }

                List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs = PrepareVulnerabilityStatisticsList(result.Value, project, staticScanDTO);

                bool isInserted = await _applicationAnalyzerClient.SaveVulnerabilityStatistics(vulnerabilityStatisticsDTOs);
                if (!isInserted)
                {
                    _logger.LogError(Messages.VulnerablityStatisticsSaveFailed);
                }

                _logger.LogInformation(Messages.VulnerablityStatisticsCalculationEnded);
            }
            else
            {
                _logger.LogInformation(Messages.ProjectNotConfiguredForStaticScan);
            }
        }

        /// <summary>
        /// Prepare VulnerabilityStatistics List from alerts
        /// </summary>
        /// <param name="results"></param>
        /// <param name="project"></param>
        /// <param name="scanId"></param>
        /// <returns></returns>
        private List<VulnerabilityStatisticsDTO> PrepareVulnerabilityStatisticsList(List<SonarIssueDTO> results, ProjectDTO project, StaticScanDTO staticScanDTO)
        {
            List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs =
                results.GroupBy(c => new { c.Type, c.Severity })
                .Select(c =>
                {
                    VulnerabilityStatisticsDTO vulnerabilityStatisticsDTO = MapVulnerabilityStatisticsDTO(project, staticScanDTO);
                    vulnerabilityStatisticsDTO.Severity = c.Key.Severity;
                    vulnerabilityStatisticsDTO.Type = c.Key.Type;
                    vulnerabilityStatisticsDTO.Value = c.Count();
                    return vulnerabilityStatisticsDTO;
                }).ToList();

            return vulnerabilityStatisticsDTOs;
        }

        /// <summary>
        /// Start static scan
        /// </summary>
        /// <param name="staticScanRequest"></param>
        /// <returns></returns>
        private async Task StartStaticScan(StaticScanDTO staticScanDTO, Guid projectKey, StaticScanDetailsDTO staticScanDetails, IProgress<bool> taskCreated)
        {
            _logger.LogInformation("Task Created");

            using IServiceScope scope = _provider.CreateScope();
            IStaticScanRepository _staticScanRepository = scope.ServiceProvider.GetService<IStaticScanRepository>();
            Func<SourceControlType, ISourceControl> _sourceControlServiceAccessor = scope.ServiceProvider.GetService<Func<SourceControlType, ISourceControl>>();
            Func<SourceCodeType, IStaticScan> _staticScanServiceAccessor = scope.ServiceProvider.GetService<Func<SourceCodeType, IStaticScan>>();

            ISourceControl sourceControl = null;

            _logger.LogInformation("Scope Created");

            try
            {
                taskCreated.Report(true);

                staticScanDTO.StatusId = (int)StaticScanStatus.InProgress;
                staticScanDTO.StartTime = DateTime.Now;

                //await _staticScanRepository.UpdateStaticScanAsync(staticScanDTO);

                // Clone Source Code
                SourceControlDTO sourceControlDTO = new SourceControlDTO
                {
                    SourceControlType = staticScanDetails.SourceControlType,
                    ProjectKey = projectKey.ToString(),
                    UserName = staticScanDTO.Username,
                    Password = staticScanDTO.Password,
                    Url = staticScanDTO.Url
                };

                _logger.LogInformation("Repository clone initiated");

                sourceControl = _sourceControlServiceAccessor(sourceControlDTO.SourceControlType);
                sourceControl.CloneRepository(sourceControlDTO);

                _logger.LogInformation("Repository clone done");

                _logger.LogInformation("Scanner scan initiated");

                //Run Scan
                IStaticScan staticScan = _staticScanServiceAccessor(staticScanDetails.SourceCodeType);

                string projectPath = projectKey.ToString();
                if (!string.IsNullOrWhiteSpace(staticScanDetails.ProjectPath))
                {
                    projectPath = $"{projectPath}\\{staticScanDetails.ProjectPath}";
                }

                string sonarQubeAnalysisTaskId = staticScan.RunScan(projectPath);

                //Update WaitingForResults.
                // staticScanDTO.StatusId = (int)StaticScanStatus.WaitingForResult;
                staticScanDTO.SonarQubeAnalysisTaskId = sonarQubeAnalysisTaskId;
                await _staticScanRepository.UpdateStaticScanAsync(staticScanDTO);

                _logger.LogInformation("Scanner analysis done");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to Process static scan with scanId: {staticScanDTO.Id}");

                if (staticScanDTO != null)
                {
                    staticScanDTO.StatusId = (int)StaticScanStatus.Failed;
                    staticScanDTO.EndTime = DateTime.Now;
                    await _staticScanRepository.UpdateStaticScanAsync(staticScanDTO);
                }
            }
            finally
            {
                sourceControl?.DeleteLocalRepository();
                _logger.LogInformation("Scan Completed");
            }
        }

        /// <summary>
        /// Map project, division, client to VulnerabilityStatisticsDTO
        /// </summary>
        /// <param name="project"></param>
        /// <param name="scanId"></param>
        /// <returns></returns>
        private static VulnerabilityStatisticsDTO MapVulnerabilityStatisticsDTO(ProjectDTO project, StaticScanDTO staticScanDTO)
        {
            VulnerabilityStatisticsDTO vulnerabilityStatisticsDTO = new VulnerabilityStatisticsDTO()
            {
                ScanId = staticScanDTO.Id,
                ScanTypeId = Convert.ToInt16(ScanType.Static),
                ClientId = project.ClientId ?? 0,
                DivisionId = project.DivisionId,
                ProjectId = project.Id,
                ScanDate = staticScanDTO.CreatedOn
            };

            return vulnerabilityStatisticsDTO;
        }

        private StaticScanDTO GetStaticScanDTO(int projectId, StaticScanDetailsDTO staticScanDetails)
        {
            StaticScanDTO staticScanDTO = new StaticScanDTO
            {
                ProjectId = projectId,
                ProjectStaticScanDetailsId = staticScanDetails.Id,
                Url = staticScanDetails.CodeOrCodeURL,
                Username = staticScanDetails.UserName,
                Password = staticScanDetails.Password,
                RunById = _identityService.GetCurrentUserId(),
                StatusId = (int)StaticScanStatus.Queued,
                IsDeleted = false,
            };

            return staticScanDTO;
        }

        private async Task MapProjectName(ListResult<StaticScanDTO> result)
        {
            IEnumerable<int> ids = result.Items.Select(c => c.ProjectId).Distinct().ToArray();
            List<IdNamePair> projectNames = await _applicationAnalyzerClient.GetProjectNamesByIdsAsync(ids);

            foreach (StaticScanDTO staticScan in result.Items)
            {
                IdNamePair projectDTO = projectNames.FirstOrDefault(c => c.Id == staticScan.ProjectId);
                staticScan.ProjectName = projectDTO?.Name;
            }
        }

        #endregion Private Methods
    }
}