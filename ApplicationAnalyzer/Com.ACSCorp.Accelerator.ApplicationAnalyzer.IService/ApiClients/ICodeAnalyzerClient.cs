using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients
{
    public interface ICodeAnalyzerClient
    {
        public Task<int> GetStaticScansCountAsync(ListParameter listParameter, int? projectId);
        public Task<List<ListItem<int>>> GetProjectStaticScanUrlListAsync(List<int> projectIdList);
        public Task<bool> CreateProjectAsync(string key);
        public Task<bool> PostScanAsync(int projectId);
    }
}
