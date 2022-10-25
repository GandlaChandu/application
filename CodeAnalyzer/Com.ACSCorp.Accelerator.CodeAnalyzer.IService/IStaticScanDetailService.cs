using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScanDetailService
    {
        public Task<Result<int>> AddStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails);

        public Task<Result<int>> UpdateStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails);

        public Task<Result<StaticScanDetailsDTO>> GetStaticScanDetailsByProjectIdAsync(int projectId, bool validateAccess = true);

        public Task<Result<bool>> DeleteStaticScanDetailsByIdAsync(int id);

        public Task<Result<List<ListItem<int>>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList);
    }
}
