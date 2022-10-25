using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService.ApiClients;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Mapper;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Validators;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service
{
    public class TicketSystemService : ITicketSystemService
    {
        #region Variables

        private readonly ITicketService _ticketService;
        private readonly IIssueTrackerRepository _issueTrackerRepository;
        private readonly IHeaderValuesService _headerValuesService;
        private readonly IHttpHeaderService _httpHeaderService;
        private readonly IIdentityService _identityService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;

        #endregion Variables

        #region Constructors

        public TicketSystemService(
            Func<TicketSystemType?, ITicketService> ticketServiceResolver,
            IIssueTrackerRepository issueTrackerRepository,
            IHeaderValuesService headerValuesService,
            IHttpHeaderService httpHeaderService,
            IIdentityService identityService,
            IApplicationAnalyzerClient applicationAnalyzerClient
            )
        {
            _headerValuesService = headerValuesService;
            _httpHeaderService = httpHeaderService;
            _ticketService = ticketServiceResolver(headerValuesService.TicketSystemConfiguration?.Type);
            _issueTrackerRepository = issueTrackerRepository;
            _identityService = identityService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<TicketSystemIssueModel>> GetIssueByIdAsync(int id)
        {
            IssueTrackerDTO issueInfo = await _issueTrackerRepository.GetIssueTrackerAsync(id);
            if (issueInfo == null)
            {
                return Result.Fail<TicketSystemIssueModel>(Messages.IssueTrackerInformationNotFound);
            }

            var accessibilityResult = await ValidateProjectAccessibility(GetProjectId());
            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<TicketSystemIssueModel>(accessibilityResult.GetErrorString());
            }

            Result<BaseTicketSystemModel> ticketSystemIssueResult = await _ticketService.GetIssueAsync(issueInfo.TicketSystemIssueId);
            if (!ticketSystemIssueResult.IsSucceeded)
            {
                return Result.Fail<TicketSystemIssueModel>(ticketSystemIssueResult.GetErrorString());
            }

            TicketSystemIssueModel ticketSystemIssue = issueInfo.ToTicketSystemIssue(ticketSystemIssueResult.Value);

            return Result.Ok(ticketSystemIssue);
        }

        public async Task<Result<int>> CreateIssueAsync(TicketSystemIssueModel issueRequest)
        {
            if (issueRequest.IssueInformation.Type != _headerValuesService.TicketSystemConfiguration.Type)
            {
                return Result.Fail<int>(Messages.ProjectIsNotConfiguredForGivenTicketSystemType);
            }

            IssueRequestValidator issueInformationValidator = new IssueRequestValidator();
            var validationResult = await issueInformationValidator.ValidateAsync(issueRequest.IssueInformation);
            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            var accessibilityResult = await ValidateProjectAccessibility(GetProjectId());
            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            Result<int> issueResult = await _ticketService.CreateIssueAsync(issueRequest);
            if (!issueResult.IsSucceeded)
            {
                return Result.Fail<int>(issueResult.GetErrorString());
            }

            IssueTrackerDTO issueTrackerDTO = GetIssueTrackerDTO(issueRequest, issueResult.Value);
            int issueTrackerId = await _issueTrackerRepository.AddIssueInfoAsync(issueTrackerDTO);
            if (issueTrackerId <= 0)
            {
                return Result.Fail<int>(Messages.FailedToSaveIssue);
            }

            return Result.Ok(issueTrackerId);
        }

        public async Task<Result<int>> UpdateIssueAsync(UpdateTicketSystemIssueModel issueRequest)
        {
            if (issueRequest.Id <= 0)
            {
                return Result.Fail<int>(Messages.InvalidIssueId);
            }

            if (issueRequest.IssueInformation.Type != _headerValuesService.TicketSystemConfiguration.Type)
            {
                return Result.Fail<int>(Messages.ProjectIsNotConfiguredForGivenTicketSystemType);
            }

            IssueRequestValidator issueInformationValidator = new IssueRequestValidator();
            var validationResult = await issueInformationValidator.ValidateAsync(issueRequest.IssueInformation);

            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            IssueTrackerDTO issueTrackerDTO = await _issueTrackerRepository.GetIssueTrackerAsync(issueRequest.Id);

            if (issueTrackerDTO == null)
            {
                return Result.Fail<int>(Messages.IssuetrackerRecordNotFound);
            }

            var accessibilityResult = await ValidateProjectAccessibility(GetProjectId());

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            Result<int> issueResult = await _ticketService.UpdateIssueAsync(issueRequest);
            if (!issueResult.IsSucceeded)
            {
                return Result.Fail<int>(issueResult.GetErrorString());
            }

            return Result.Ok(issueRequest.Id);
        }

        public async Task<Result<IssueTrackerDTO>> GetIssueTrackerAsync(int id)
        {
            IssueTrackerDTO issueTrackerDTO = await _issueTrackerRepository.GetIssueTrackerAsync(id);
            if (issueTrackerDTO == null)
            {
                return Result.Fail<IssueTrackerDTO>(Messages.IssuetrackerRecordNotFound);
            }

            var accessibilityResult = await ValidateProjectAccessibility(GetProjectId());

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<IssueTrackerDTO>(accessibilityResult.GetErrorString());
            }

            return Result.Ok(issueTrackerDTO);
        }

        public async Task<Result<BaseTicketSystemModel>> GetIssueMetaData()
        {
            return await _ticketService.GetMetaData();
        }

        public async Task<Result<IEnumerable<IssueStatusDTO>>> GetIssuesResult(IssuesResultRequestDTO issueResultsRequest)
        {
            var accessibilityResult = await ValidateProjectAccessibility(GetProjectId());
            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<IEnumerable<IssueStatusDTO>>(accessibilityResult.GetErrorString());
            }

            List<IssueTrackerDTO> issues = _issueTrackerRepository.GetIssueTrackersAsync(issueResultsRequest);
            if (issues.Count > 0)
            {
                await _ticketService.UpdateIssuesTrackerStatusAsync(issues);
            }

            var result = issues.Select(s => new IssueStatusDTO
            {
                Id = s.Id,
                ScanIssueId = s.ScanIssueId,
                Status = s.Status,
                TicketSystemType = s.TicketSystemType
            });

            return Result.Ok(result);
        }

        #endregion Public Methods

        #region Private Methods

        private int GetProjectId()
        {
            return Convert.ToInt32(_httpHeaderService.Read("Project-Id"));
        }

        private IssueTrackerDTO GetIssueTrackerDTO(TicketSystemIssueModel ticketSystemIssue, int gitHubIssueId)
        {
            return new IssueTrackerDTO
            {
                ScanId = ticketSystemIssue.ScanId,
                ScanIssueId = ticketSystemIssue.ScanIssueId,
                ScanType = ticketSystemIssue.ScanType,
                TicketSystemType = ticketSystemIssue.IssueInformation.Type,
                TicketSystemIssueId = gitHubIssueId.ToString()
            };
        }

        private async Task<Result> ValidateProjectAccessibility(int projectId)
        {
            var project = await _applicationAnalyzerClient.GetProjectByIdAsync(projectId);
            if (project == null)
            {
                return Result.Fail(Messages.ProjectNotFound);
            }

            if (!_identityService.HasProjectAccess(project.Id, project.ClientId.Value))
            {
                return Result.Fail(Messages.UnAuthorizedEntityAccess);
            }
            return Result.Ok();
        }

        #endregion Private Methods
    }
}
