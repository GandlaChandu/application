using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.CweInfo;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface ICweInfoService
    {
        Task<Result<List<CweInfoDTO>>> GetCweInfoByIdsAsync(List<int> cweIds);
    }
}
