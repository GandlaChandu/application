using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService.ApiClients;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service.Validators;

using FluentValidation.Results;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Service
{
    public class TicketSystemConfigurationService : ITicketSystemConfigurationService
    {
        protected readonly ITicketSystemConfigurationRepository _ticketSystemConfigurationRepository;
        private readonly IIdentityService _identityService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;

        public TicketSystemConfigurationService(ITicketSystemConfigurationRepository ticketSystemConfigurationRepository,
            IIdentityService identityService,
            IApplicationAnalyzerClient applicationAnalyzerClient)
        {
            _ticketSystemConfigurationRepository = ticketSystemConfigurationRepository;
            _identityService = identityService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
        }

        public async Task<Result<TicketSystemConfigurationDTO>> GetTicketSystemConfigurationByProjectIdAsync(int projectId)
        {
            if (projectId <= 0)
            {
                return Result.Fail<TicketSystemConfigurationDTO>(Messages.InvalidProjectId);
            }

            var accessibilityResult = await ValidateProjectAccessibility(projectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<TicketSystemConfigurationDTO>(accessibilityResult.GetErrorString());
            }

            return Result.Ok(await _ticketSystemConfigurationRepository.GetByProjectIdAsync(projectId));
        }

        public async Task<Result<int>> CreateTicketSystemConfiguration(TicketSystemConfigurationDTO ticketSystemConfigurationDTO)
        {
            var validationResult = await ValidateTicketSystemConfigurationAsync(ticketSystemConfigurationDTO);
            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            var accessibilityResult = await ValidateProjectAccessibility(ticketSystemConfigurationDTO.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            return Result.Ok(await _ticketSystemConfigurationRepository.AddTicketSystemConfiguration(ticketSystemConfigurationDTO));
        }

        public async Task<Result<int>> UpdateTicketSystemConfigurationAsync(TicketSystemConfigurationDTO ticketSystemConfigurationDTO)
        {
            if (ticketSystemConfigurationDTO.Id <= 0)
            {
                return Result.Fail<int>(Messages.InvalidTicketConfigurationId);
            }

            var validationResult = await ValidateTicketSystemConfigurationAsync(ticketSystemConfigurationDTO);
            if (!validationResult.IsValid)
            {
                return Result.Fail<int>(validationResult.ToString());
            }

            var accessibilityResult = await ValidateProjectAccessibility(ticketSystemConfigurationDTO.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<int>(accessibilityResult.GetErrorString());
            }

            return Result.Ok(await _ticketSystemConfigurationRepository.UpdateTicketSystemConfiguration(ticketSystemConfigurationDTO));
        }

        public async Task<Result<bool>> DeleteTicketSystemConfigurationAsync(int id)
        {
            if (id <= 0)
            {
                return Result.Fail<bool>(Messages.InvalidTicketConfigurationId);
            }

            TicketSystemConfigurationDTO ticketSystemConfiguration = await _ticketSystemConfigurationRepository.GetByIdAsync(id);

            if (ticketSystemConfiguration == null)
            {
                return Result.Fail<bool>(Messages.TicketSystemConfigurationNotFound);
            }

            var accessibilityResult = await ValidateProjectAccessibility(ticketSystemConfiguration.ProjectId);

            if (!accessibilityResult.IsSucceeded)
            {
                return Result.Fail<bool>(accessibilityResult.GetErrorString());
            }

            return Result.Ok(await _ticketSystemConfigurationRepository.DeleteTicketSystemConfiguration(id));
        }

        protected async Task<ValidationResult> ValidateTicketSystemConfigurationAsync(TicketSystemConfigurationDTO ticketSystemConfiguration)
        {
            TicketSystemConfigurationValidator ticketSystemValidator = new TicketSystemConfigurationValidator();
            return await ticketSystemValidator.ValidateAsync(ticketSystemConfiguration);
        }

        private async Task<Result> ValidateProjectAccessibility(int id)
        {
            var project = await _applicationAnalyzerClient.GetProjectByIdAsync(id);

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
    }
}
