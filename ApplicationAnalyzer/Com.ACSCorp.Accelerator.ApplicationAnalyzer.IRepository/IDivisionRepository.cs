using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface IDivisionRepository : IBaseRepository
    {
        public Task<ListResult<DivisionDTO>> GetAllDivisionsAsync(int clientId, ListParameter listParameter);
        public Task<List<IdNamePair>> GetAllActiveDivisionsAsync(int clientId, List<int> accessibleProjects);
        public Task<DivisionDTO> GetByIdAsync(int divisionId);
        public Task<int> AddDivisionAsync(DivisionDTO division);
        public Task<int> UpdateDivisionAsync(DivisionDTO division);
        public Task<DivisionDTO> GetDivisionByNameAndClientIdAsync(string name, int clientId);
    }
}
