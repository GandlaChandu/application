using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.DTO.QualityProfile;
using Com.ACSCorp.Accelerator.Core.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces
{
    public interface ISonarQubeClient
    {
        /// <summary>
        /// Get Scan results
        /// </summary>
        /// <param name="parameters"></param>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public Task<Result<ListResult<SonarIssueDTO>>> GetScanResultAsync(IssueListParametersDTO parameters, Pagination pagination);

        /// <summary>
        /// It will get list of issues
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public Task<Result<List<SonarIssueDTO>>> GetScanResultByScanIdAsync(IssueListParametersDTO parameters);

        /// <summary>
        /// It will get list of issues
        /// </summary>
        /// <param name="projectKey"></param>
        /// <param name="types"></param>
        /// <returns></returns>
        public Task<Result<List<SonarIssueDTO>>> GetScanResult(string projectKey, string types);

        /// <summary>
        /// Get rules
        /// </summary>
        /// <param name="ruleListRequest"></param>
        /// <returns></returns>
        public Task<Result<ListResult<SonarRuleDTO>>> GetRulesAsync(RuleListRequestDTO ruleListRequest);

        /// <summary>
        /// Get scan overview
        /// </summary>
        /// <param name="componentKey"></param>
        /// <returns></returns>
        public Task<Result<StaticScanOverviewDTO>> GetScanOverviewAsync(Guid componentKey);

        /// <summary>
        /// Get scan overview
        /// </summary>
        /// <param name="componentKey"></param>
        /// <returns></returns>
        public Task<Result<StaticScanOverviewDTO>> GetScanOverviewAsync(string componentKey);

        /// <summary>
        /// Add quality profile
        /// </summary>
        /// <param name="qualityProfile"></param>
        /// <returns></returns>
        public Task<Result<CreateQualityProfileResponseDTO>> AddQualityProfileAsync(CreateQualityProfile qualityProfile);

        /// <summary>
        /// Update rule activation
        /// </summary>
        /// <param name="ruleActivationDTO"></param>
        /// <returns></returns>
        public Task<Result<bool>> ChangeRuleActivationAsync(RuleActivationDTO ruleActivationDTO);

        /// <summary>
        /// Get quality profile rules
        /// </summary>
        /// <param name="qualityProfileKey"></param>
        /// <param name="pagination"></param>
        /// <returns></returns>
        public Task<Result<ListResult<SonarRuleDTO>>> GetQualityProfileRulesAsync(string qualityProfileKey, Pagination pagination);

        /// <summary>
        /// remove project quality profile
        /// </summary>
        /// <param name="projectQualityProfile"></param>
        /// <returns></returns>
        public Task<Result> RemoveProjectQualityProfileAsync(ProjectQualityProfileDTO projectQualityProfile);

        /// <summary>
        /// add quality profile to a project.
        /// </summary>
        /// <param name="projectQualityProfile"></param>
        /// <returns></returns>
        public Task<Result> AddProjectQualityProfileAsync(ProjectQualityProfileDTO projectQualityProfile);

        /// <summary>
        /// Creates a project
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public Task<Result> AddProjectAsync(string key);
    }
}
