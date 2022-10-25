using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IDynamicScanEmailService
    {
        public Task<Result> SendEmail(DynamicScanDTO dynamicScanDTO, ProjectDTO projectDTO);
    }
}
