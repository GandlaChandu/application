using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IStaticScanResultService
    {
        public Task<Result<StaticScanOverviewDTO>> GetStaticScanOverviewAsync(int scanId);
        public Task<Result<ListResult<SonarIssueDTO>>> GetStaticScanResultsAsync(int scanId, Pagination pagination = null);
        public Task<Result<List<SonarIssueDTO>>> GetScanResultsByProjectAndStaticScanDtails(ProjectDTO project, StaticScanDetailsDTO staticScanDetails);
    }
}
