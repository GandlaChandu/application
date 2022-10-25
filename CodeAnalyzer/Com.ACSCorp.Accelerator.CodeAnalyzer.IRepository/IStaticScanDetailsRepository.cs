using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository
{
    public interface IStaticScanDetailsRepository : IBaseRepository
    {
        public Task<int> AddStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails);
        public Task<int> AddStaticScanTypesAsync(List<StaticScanTypeDTO> types);
        public Task<int> UpdateStaticScanDetailsAsync(StaticScanDetailsDTO staticScanDetails);
        public Task<int> UpdateStaticScanTypesAsync(List<StaticScanTypeDTO> types);
        public StaticScanDetailsDTO GetStaticScanDetailById(int id);
        public Task<StaticScanDetailsDTO> GetStaticScanDetailsByProjectIdAsync(int projectId);
        public Task<List<ListItem<int>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList);
    }
}
