using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IDivisionService
    {
        public Task<Result<ListResult<DivisionDTO>>> GetAllAsync(int clientId, ListParameter listParameter);
        public Task<Result<List<IdNamePair>>> GetAllActiveAsync(int clientId);
        public Task<Result<DivisionDTO>> GetByIdAsync(int divisionId);
        public Task<Result<int>> AddDivisionAsync(DivisionDTO division);
        public Task<Result<int>> UpdateDivisionAsync(DivisionDTO division);
    }
}
