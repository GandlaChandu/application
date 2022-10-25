using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients
{
    public interface ISecurityAnalyzerClient
    {
        public Task<int> GetDynamicScansCountAsync(ListParameter listParameter, int? projectId);
        public Task<List<ListItem<int>>> GetProjectDynamicScanUrlListAsync(List<int> projectIdList);
        public Task<bool> PostScanAsync(int projectId);
    }
}
