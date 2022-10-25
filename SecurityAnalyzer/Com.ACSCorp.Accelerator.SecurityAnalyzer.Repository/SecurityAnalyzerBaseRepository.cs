using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public class SecurityAnalyzerBaseRepository<TEntity> : BaseRepository<TEntity>, IBaseRepository where TEntity : class
    {
        protected new readonly SecurityAnalyzerContext _dbContext;
        public SecurityAnalyzerBaseRepository(SecurityAnalyzerContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
