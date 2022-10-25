using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IClientService
    {
        public Task<Result<ListResult<ClientDTO>>> GetAllClientsAsync(ClientListRequest request);
        public Task<Result<List<IdNamePair>>> GetAllActiveClientsAsync();
        public Task<Result<ClientDTO>> GetClientAsync(int clientId);
        public Task<Result<int>> AddClientAsync(ClientDTO clientDTO);
        public Task<Result<bool>> UpdateClientAsync(ClientDTO clientDTO);
    }
}
