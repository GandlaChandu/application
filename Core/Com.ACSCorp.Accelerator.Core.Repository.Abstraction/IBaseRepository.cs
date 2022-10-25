using Microsoft.EntityFrameworkCore.Storage;

namespace Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces
{
    public interface IBaseRepository
    {
        public IDbContextTransaction BeginTransaction();
    }
}
