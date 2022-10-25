using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.QueryUtility;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

using Microsoft.EntityFrameworkCore;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository
{
    public class ClientRepository : BaseRepository<Client>, IClientRepository
    {
        #region Constructors

        public ClientRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<ListResult<ClientDTO>> GetAllClientsAsync(ClientListRequest request, List<int> accessibleClients)
        {
            var query = GetAll(c => !c.IsDeleted);

            query = ApplyAccessibleClientsFilter(accessibleClients, query);

            query = ApplyFilters(request, query).OrderByDescending(c => c.Id);

            ListResult<Client> pagedResult = await QueryUtility<Client>.GetQueryResultAsync(query, request.ListParameter);

            return new ListResult<ClientDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToClientDTOList()
            };
        }

        public async Task<List<IdNamePair>> GetAllActiveClientsAsync(List<int> accessibleClients)
        {
            IQueryable<Client> query = GetAll(c => !c.IsDeleted
                && c.IsActive);

            query = ApplyAccessibleClientsFilter(accessibleClients, query);

            List<IdNamePair> activeClients = await query.Select(c => new IdNamePair
            {
                Id = c.Id,
                Name = c.Name
            }).OrderBy(c => c.Name).ToListAsync();

            return activeClients;
        }

        public async Task<ClientDTO> GetClientAsync(int clientId)
        {
            Client client = await GetAsync(c => c.Id == clientId);
            return client.ToClientDTO();
        }

        public async Task<int> AddClientAsync(ClientDTO clientDTO)
        {
            Client client = clientDTO.ToClientEntity();
            await AddAsync(client);
            return client.Id;
        }

        public async Task<bool> UpdateClientAsync(ClientDTO clientDTO)
        {
            Client client = clientDTO.ToClientEntity();
            await UpdateAsync(client);
            return true;
        }

        public async Task<ClientDTO> GetClientByNameAsync(string name)
        {
            Client client = await GetAsync(c => !c.IsDeleted && c.Name.ToLower().Equals(name.ToLower()));
            return client.ToClientDTO();
        }

        #endregion Public Methods

        #region Private Methods

        private IQueryable<Client> ApplyFilters(ClientListRequest request, IQueryable<Client> query)
        {
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(c => c.Name.Contains(request.SearchTerm));
            }

            return query;
        }

        private IQueryable<Client> ApplyAccessibleClientsFilter(List<int> accessibleClients, IQueryable<Client> query)
        {
            if (accessibleClients != null)
            {
                query = query.Where(c => accessibleClients.Contains(c.Id));
            }

            return query;
        }

        #endregion Private Methods
    }
}
