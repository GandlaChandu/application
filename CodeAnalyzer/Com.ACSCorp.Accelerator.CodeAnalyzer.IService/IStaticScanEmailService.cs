using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScanEmailService
    {
        public Task<Result> SendEmail(StaticScanDTO staticScanDTO, ProjectDTO project);
    }
}
