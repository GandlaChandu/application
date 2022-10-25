using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.CweInfo;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository
{
    public interface ICweInfoRepository
    {
        Task<List<CweInfoDTO>> GetCweInfoByIdsAsync(List<int> cweIds);
    }
}
