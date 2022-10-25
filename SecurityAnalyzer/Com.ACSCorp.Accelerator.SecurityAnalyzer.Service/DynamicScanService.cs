using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.Mapper;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class DynamicScanService : IDynamicScanService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IIdentityService _identityService;
        private readonly IServiceProvider _provider;
        private readonly IDynamicScanRepository _dynamicScanRepository;
        private readonly IDynamicScanDetailsRepository _dynamicScanDetailsRepository;
        private readonly IQueueAPIClient _queueAPIClient;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly OWASPAdapter.OWASPAdapter _owaspAdapter;

        #endregion Variables

        #region Constructors

        public DynamicScanService(
            ILogger<DynamicScanService> logger,
            IIdentityService identityService,
            IServiceProvider provider,
            IConfiguration configuration,
            IDynamicScanRepository dynamicScanRepository,
            IDynamicScanDetailsRepository dynamicScanDetailsRepository,
            IQueueAPIClient queueAPIClient,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            ILoggerFactory loggerFactory)
        {
            _logger = logger;
            _identityService = identityService;
            _provider = provider;
            _owaspAdapter = new OWASPAdapter.OWASPAdapter(configuration, loggerFactory.CreateLogger<OWASPAdapter.OWASPAdapter>());
            _dynamicScanRepository = dynamicScanRepository;
            _dynamicScanDetailsRepository = dynamicScanDetailsRepository;
            _queueAPIClient = queueAPIClient;
            _applicationAnalyzerClient = applicationAnalyzerClient;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> QueueDynamicScanAsync(int projectId, bool verifyAccess = false)
        {
            var project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectId);
            if (project == null || project.IsDeleted)
            {
                return Result.Fail<int>(Messages.ProjectNotFound);
            }

            if (verifyAccess)
            {
                if (!_identityService.HasProjectAccess(projectId, project.ClientId.Value))
                {
                    return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
                }
            }

            DynamicScanDetailsDTO dynamicScanDetails = await _dynamicScanDetailsRepository.GetDynamicScanDetailsByProjectIdAsync(projectId);
            if (dynamicScanDetails == null)
            {
                return Result.Fail<int>(Messages.ProjectDynamicScanNotConfigured);
            }

            var dynamicScanRequestDTO = new DynamicScanRequestDTO
            {
                ProjectId = projectId,
                Target = dynamicScanDetails.ApplicationURL,
                UserId = _identityService.GetCurrentUserId()
            };

            DynamicScanDTO dynamicScanDTO = dynamicScanRequestDTO.ToDynamicScanDTO();
            int scanId = await _dynamicScanRepository.SaveDynamicScanAsync(dynamicScanDTO);
            await _queueAPIClient.QueueDynamicScan(scanId);

            return Result.Ok(scanId);
        }

        public async Task<Result> InitiateDynamicScanAsync(int dynamicScanId)
        {
            DynamicScanDTO dynamicScanDTO = await _dynamicScanRepository.GetDynamicScanByIdAsync(dynamicScanId);
            if (dynamicScanDTO == null)
            {
                _logger.LogError(Messages.DynamicScanNotFound);
                return Result.Fail(Messages.DynamicScanNotFound);
            }

            ProjectDTO project = await _applicationAnalyzerClient.GetProjectByIdAsync(dynamicScanDTO.ProjectId);
            if (project == null || project.IsDeleted)
            {
                return Result.Fail<int>(Messages.ProjectNotFound);
            }

            ///TODO: Removed as Background job is not sending any token
            //if (!_identityService.HasProjectAccess(dynamicScanDTO.ProjectId, project.ClientId.Value))
            //{
            //    return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            //}

            var dynamicScanRequestDTO = new DynamicScanRequestDTO
            {
                ProjectId = dynamicScanDTO.ProjectId,
                Target = dynamicScanDTO.Url,
                UserId = _identityService.GetCurrentUserId()
            };

            _logger.LogInformation("Creating Task");

            bool isTaskCreated = false;
            IProgress<bool> taskCreated = new Progress<bool>(taskCreated => isTaskCreated = taskCreated);

            var task = Task.Run(async () => await ProcessDynamicScanAsync(dynamicScanRequestDTO, dynamicScanDTO, taskCreated, project));

            while (!isTaskCreated)
            {
                Thread.Sleep(1000);
            }

            return Result.Ok();
        }

        public async Task<Result<ListResult<DynamicScanDTO>>> GetDynamicScansAsync(DynamicScanListRequest request)
        {
            List<int> accessibleProjects = _identityService.GetAccessibleProjects();
            var result = await _dynamicScanRepository.GetDynamicScansAsync(request, accessibleProjects);
            await MapProjectName(result);

            return Result.Ok(result);
        }

        public async Task<Result<DynamicScanDTO>> GetDynamicScanByIdAsync(int scanId)
        {
            DynamicScanDTO dto = await _dynamicScanRepository.GetDynamicScanByIdAsync(scanId);

            if (dto == null)
            {
                return Result.Fail<DynamicScanDTO>(Messages.DynamicScanNotFound);
            }

            var project = await _applicationAnalyzerClient.GetProjectByIdAsync(dto.ProjectId);

            if (project == null || project.IsDeleted)
            {
                return Result.Fail<DynamicScanDTO>(Messages.ProjectNotFound);
            }

            if (!_identityService.HasProjectAdminAccess(dto.ProjectId, project.ClientId.Value))
            {
                return Result.Fail<DynamicScanDTO>(Messages.UnAuthorizedEntityAccess);
            }

            return Result.Ok(dto);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task ProcessDynamicScanAsync(DynamicScanRequestDTO request, DynamicScanDTO dynamicScanDTO, IProgress<bool> taskCreated, ProjectDTO projectDTO)
        {
            using (var scope = _provider.CreateScope())
            {
                var dynamicScanResultServiceScoped = scope.ServiceProvider.GetService<IDynamicScanResultService>();
                var dynamicScanRepositoryScoped = scope.ServiceProvider.GetService<IDynamicScanRepository>();
                var attachmentServiceScoped = scope.ServiceProvider.GetService<IDynamicScanReportService>();
                var dynamicScanEmailServiceScoped = scope.ServiceProvider.GetService<IDynamicScanEmailService>();

                _logger.LogInformation("OWASP ZAP scan process started");
                bool updated = false;
                DynamicScanDTO dto = new DynamicScanDTO();
                try
                {
                    taskCreated.Report(true);
                    dto.Id = dynamicScanDTO.Id;
                    dto.UpdateStartTimeOnly = true;
                    updated = await dynamicScanRepositoryScoped.UpdateDynamicScanAsync(dto);

                    Tuple<List<Alert>, int> resultList = await _owaspAdapter.RunDynamicScanAsync(request);
                    List<Alert> results = resultList.Item1;
                    _logger.LogInformation("OWASP ZAP scan process ended");

                    dto.UpdateStartTimeOnly = false;
                    dto.UpdateEndTimeOnly = true;
                    dto.UrlCount = (short)resultList.Item2;
                    updated = await dynamicScanRepositoryScoped.UpdateDynamicScanAsync(dto);

                    if (results != null)
                    {
                        if (results.Count > 0)
                        {
                            List<DynamicScanResultDTO> dynamicScanResults = results.ToDynamicScanResultDTOList(request, dynamicScanDTO.Id);
                            _logger.LogInformation("Dynamic scan results saving started");
                            await dynamicScanResultServiceScoped.SaveDynamicScanResultAsync(dynamicScanResults);
                            _logger.LogInformation("Dynamic scan results saving ended");

                        }

                        _logger.LogInformation("Dynamic scan status update started");
                        dto.UpdateStartTimeOnly = false;
                        dto.UpdateEndTimeOnly = false;
                        dto.StatusId = (short)DynamicScanStatusEnum.Completed;
                        await dynamicScanRepositoryScoped.UpdateDynamicScanAsync(dto);
                        _logger.LogInformation("Dynamic scan status update ended");
                    }
                    await CalculateAndSaveVulnerabilityStatistics(dynamicScanDTO, results, projectDTO);

                    if (dynamicScanDTO.RunById > 0)
                    {
                        var emailSendResult = await dynamicScanEmailServiceScoped.SendEmail(dynamicScanDTO, projectDTO);

                        if (!emailSendResult.IsSucceeded)
                        {
                            _logger.LogError(emailSendResult.GetErrorString());
                        }
                        else
                        {
                            _logger.LogInformation("Dynamic scan email report sent to user");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to process OWASP ZAP Scan");
                    dto.UpdateStartTimeOnly = false;
                    dto.UpdateEndTimeOnly = false;
                    dto.StatusId = (short)DynamicScanStatusEnum.Failed;
                    await dynamicScanRepositoryScoped.UpdateDynamicScanAsync(dto);
                }
            }
        }

        private async Task CalculateAndSaveVulnerabilityStatistics(DynamicScanDTO dynamicScanDTO, List<Alert> results, ProjectDTO project)
        {
            _logger.LogInformation(Messages.VulnerablityStatisticsSaveStarted);

            if (project != null && results != null)
            {
                List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs = PrepareVulnerabilityStatisticsList(results, project, dynamicScanDTO);
                bool isInserted = await _applicationAnalyzerClient.SaveVulnerabilityStatistics(vulnerabilityStatisticsDTOs);

                if (!isInserted)
                {
                    _logger.LogInformation(Messages.VulnerablityStatisticsSaveFailed);
                }
            }
            _logger.LogInformation(Messages.VulnerablityStatisticsSaveEnded);
        }

        /// <summary>
        /// Map project, division, client to VulnerabilityStatisticsDTO
        /// </summary>
        /// <param name="project"></param>
        /// <param name="dynamicScanDTO"></param>
        /// <returns></returns>
        private VulnerabilityStatisticsDTO MapVulnerabilityStatisticsDTO(ProjectDTO project, DynamicScanDTO dynamicScanDTO)
        {
            var vulnerabilityStatisticsDTO = new VulnerabilityStatisticsDTO
            {
                ScanId = dynamicScanDTO.Id,
                ScanTypeId = (short)ScanType.Dynamic,
                ClientId = project.ClientId ?? 0,
                DivisionId = project.DivisionId,
                ProjectId = project.Id,
                ScanDate = dynamicScanDTO.CreatedOn
            };

            return vulnerabilityStatisticsDTO;
        }

        /// <summary>
        /// Prepare VulnerabilityStatistics List from alerts
        /// </summary>
        /// <param name="results"></param>
        /// <param name="project"></param>
        /// <param name="dynamicScanDTO"></param>
        /// <returns></returns>
        private List<VulnerabilityStatisticsDTO> PrepareVulnerabilityStatisticsList(List<Alert> results, ProjectDTO project, DynamicScanDTO dynamicScanDTO)
        {
            List<VulnerabilityStatisticsDTO> vulnerabilityStatisticsDTOs =
                results.GroupBy(c => new { c.AlertMessage, c.Risk })
                .Select(c =>
                {
                    VulnerabilityStatisticsDTO vulnerabilityStatisticsDTO = MapVulnerabilityStatisticsDTO(project, dynamicScanDTO);
                    vulnerabilityStatisticsDTO.Severity = Convert.ToString(c.Key.Risk);
                    vulnerabilityStatisticsDTO.Type = c.Key.AlertMessage;
                    vulnerabilityStatisticsDTO.Value = c.Count();
                    return vulnerabilityStatisticsDTO;
                })
                .ToList();

            return vulnerabilityStatisticsDTOs;
        }

        private async Task MapProjectName(ListResult<DynamicScanDTO> result)
        {
            IEnumerable<int> ids = result.Items.Select(c => c.ProjectId).Distinct().ToArray();
            List<IdNamePair> projectNames = await _applicationAnalyzerClient.GetProjectNamesByIdsAsync(ids);

            foreach (var dynamicScan in result.Items)
            {
                var projectDTO = projectNames.FirstOrDefault(c => c.Id == dynamicScan.ProjectId);
                dynamicScan.ProjectName = projectDTO?.Name;
            }
        }

        #endregion Private Methods
    }
}
