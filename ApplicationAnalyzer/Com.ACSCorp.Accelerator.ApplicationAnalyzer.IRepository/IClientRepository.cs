using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IClientRepository : IBaseRepository
    {
        public Task<ListResult<ClientDTO>> GetAllClientsAsync(ClientListRequest request, List<int> accessibleClients);
        public Task<List<IdNamePair>> GetAllActiveClientsAsync(List<int> accessibleClients);
        public Task<ClientDTO> GetClientAsync(int clientId);
        public Task<ClientDTO> GetClientByNameAsync(string name);
        public Task<int> AddClientAsync(ClientDTO client);
        public Task<bool> UpdateClientAsync(ClientDTO clientDTO);
    }
}
