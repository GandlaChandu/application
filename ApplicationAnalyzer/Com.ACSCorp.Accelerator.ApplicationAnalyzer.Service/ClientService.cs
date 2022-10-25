using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Common;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Validators;
using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using FluentValidation.Results;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service
{
    public class ClientService : IClientService
    {
        #region Variables

        private readonly IClientRepository _clientRepository;
        private readonly IIdentityService _identityService;
        private readonly IUserAccessService _userAccessService;
        private readonly IDivisionService _divisionService;

        #endregion Variables

        #region Constructors

        public ClientService(IClientRepository clientRepository,
            IIdentityService identityService,
            IUserAccessService userAccessService,
            IDivisionService divisionService)
        {
            _clientRepository = clientRepository;
            _identityService = identityService;
            _userAccessService = userAccessService;
            _divisionService = divisionService;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<ListResult<ClientDTO>>> GetAllClientsAsync(ClientListRequest request)
        {
            List<int> accessibleClients = _identityService.GetAccessibleClients();
            ListResult<ClientDTO> clientsResult = await _clientRepository.GetAllClientsAsync(request, accessibleClients);

            return Result.Ok(clientsResult);
        }

        public async Task<Result<List<IdNamePair>>> GetAllActiveClientsAsync()
        {
            List<int> accessibleClients = await _userAccessService.GetAllAccessibleClientsAsync();
            List<IdNamePair> clientsResult = await _clientRepository.GetAllActiveClientsAsync(accessibleClients);

            return Result.Ok(clientsResult);
        }

        public async Task<Result<ClientDTO>> GetClientAsync(int clientId)
        {
            ClientDTO client = await _clientRepository.GetClientAsync(clientId);

            if (client == null || client.IsDeleted)
            {
                return Result.Fail<ClientDTO>(Messages.ClientNotFound);
            }

            return Result.Ok(client);
        }

        public async Task<Result<int>> AddClientAsync(ClientDTO clientDTO)
        {
            Result result = await ValidateClientAsync(clientDTO);
            if (!result.IsSucceeded)
            {
                return Result.Fail<int>(result.GetErrorString());
            }

            if (!_identityService.IsAdmin())
            {
                return Result.Fail<int>(Messages.UnAuthorizedEntityAccess);
            }

            ClientDTO existingClient = await _clientRepository.GetClientByNameAsync(clientDTO.Name);
            if (existingClient != null)
            {
                return Result.Fail<int>(Messages.ClientExistWithGivenName);
            }

            clientDTO.IsDeleted = false;

            int clientId = await _clientRepository.AddClientAsync(clientDTO);

            // Adding default Division for Client
            Result<int> divisionResult = await AddDefaultDivisionAsync(clientId);
            if (!divisionResult.IsSucceeded)
            {
                return Result.Fail<int>(Messages.DivisionAddFailed);
            }

            return Result.Ok(clientId);
        }

        public async Task<Result<bool>> UpdateClientAsync(ClientDTO request)
        {
            Result result = await ValidateClientAsync(request);
            if (!result.IsSucceeded)
            {
                return Result.Fail<bool>(result.GetErrorString());
            }

            if (!_identityService.HasClientAdminAccess(request.Id))
            {
                return Result.Fail<bool>(Messages.UnAuthorizedEntityAccess);
            }

            ClientDTO clientDTO = await _clientRepository.GetClientAsync(request.Id);
            if (clientDTO == null || clientDTO.IsDeleted)
            {
                return Result.Fail<bool>(Messages.ClientNotFound);
            }

            ClientDTO clientWithSameName = await _clientRepository.GetClientByNameAsync(request.Name);
            if (clientWithSameName != null && clientWithSameName.Id != clientDTO.Id)
            {
                return Result.Fail<bool>(Messages.ClientExistWithGivenName);
            }

            clientDTO.Name = request.Name;
            clientDTO.IsActive = request.IsActive;

            bool recordUpdated = await _clientRepository.UpdateClientAsync(clientDTO);
            return Result.Ok(recordUpdated);
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result> ValidateClientAsync(ClientDTO clientDTO)
        {
            var clientValidator = new ClientValidator();
            ValidationResult validationResult = await clientValidator.ValidateAsync(clientDTO);

            if (!validationResult.IsValid)
            {
                return Result.Fail(validationResult.ToString());
            }

            return Result.Ok();
        }

        private async Task<Result<int>> AddDefaultDivisionAsync(int clientId)
        {
            DivisionDTO divisionDTO = new DivisionDTO
            {
                ClientId = clientId,
                Name = "Default",
                IsActive = true
            };
            Result<int> divisionResult = await _divisionService.AddDivisionAsync(divisionDTO);
            return divisionResult;
        }

        #endregion Private Methods
    }
}
