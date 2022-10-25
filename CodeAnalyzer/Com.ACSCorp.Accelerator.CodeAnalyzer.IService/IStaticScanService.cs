using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScanService
    {
        public Task<Result<ListResult<StaticScanDTO>>> GetAllScansAsync(StaticScanListRequest staticScanListRequest);

        public Task<Result<StaticScanDTO>> GetStaticScanAsync(int scanId, bool validateAccess = true);

        public Task<Result<int>> AddStaticScanAsync(int projectId, bool verifyAccess = false);

        /// <summary>
        /// Initiate Static Scan
        /// </summary>
        /// <param name="staticScanId"></param>
        /// <returns></returns>
        public Task<Result> InitiateStaticScanAsync(int staticScanId);

        /// <summary>
        /// Save Static scan analysis status
        /// </summary>
        /// <param name="sonarCallbackModel"></param>
        Task SaveStaticScanAnalysisStatus(SonarQubeCallbackModel sonarCallbackModel);
    }
}
