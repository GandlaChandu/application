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
    public class DivisionRepository : BaseRepository<Division>, IDivisionRepository
    {
        #region Constructors

        public DivisionRepository(ApplicationAnalyzerContext dbContext) : base(dbContext)
        {
        }

        #endregion Constructors

        #region Public Methods

        public async Task<ListResult<DivisionDTO>> GetAllDivisionsAsync(int clientId, ListParameter listParameter)
        {
            var query = GetAll(c => c.ClientId == clientId && !c.IsDeleted);
            query = query.OrderByDescending(c => c.Id);
            var pagedResult = await QueryUtility<Division>.GetQueryResultAsync(query, listParameter);

            return new ListResult<DivisionDTO>
            {
                Total = pagedResult.Total,
                Items = pagedResult.Items.ToDivisionDTOList()
            };
        }

        public async Task<List<IdNamePair>> GetAllActiveDivisionsAsync(int clientId, List<int> accessibleProjects)
        {
            var query = GetAll(c => c.ClientId == clientId
                && !c.IsDeleted);

            if (accessibleProjects != null)
            {
                query = query.Include(c => c.Project)
                    .Where(c => c.Project
                    .Any(c => accessibleProjects
                    .Contains(c.Id)));
            }

            List<IdNamePair> activeDivisions = await query.Select(x => new IdNamePair
            {
                Id = x.Id,
                Name = x.Name
            })
            .OrderBy(s => s.Name)
            .ToListAsync();

            return activeDivisions;
        }

        public async Task<DivisionDTO> GetByIdAsync(int divisionId)
        {
            var division = await GetAsync(c => c.Id == divisionId);
            return division.ToDivisionDTO();
        }

        public async Task<int> AddDivisionAsync(DivisionDTO divisionDTO)
        {
            Division division = divisionDTO.ToDivisionEntity();

            await AddAsync(division);

            return division.Id;
        }

        public async Task<int> UpdateDivisionAsync(DivisionDTO divisionDTO)
        {
            Division division = divisionDTO.ToDivisionEntity();

            await UpdateAsync(division);

            return division.Id;
        }

        public async Task<DivisionDTO> GetDivisionByNameAndClientIdAsync(string name, int clientId)
        {
            Division division = await GetAsync(c => c.ClientId == clientId
                && c.Name.ToLower().Equals(name.ToLower())
                && !c.IsDeleted);

            return division.ToDivisionDTO();
        }

        #endregion Public Methods
    }
}
