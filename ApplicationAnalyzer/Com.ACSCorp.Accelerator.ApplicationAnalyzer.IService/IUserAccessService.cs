using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService
{
    public interface IUserAccessService
    {
        public Task<List<int>> GetAllAccessibleClientsAsync();
    }
}
