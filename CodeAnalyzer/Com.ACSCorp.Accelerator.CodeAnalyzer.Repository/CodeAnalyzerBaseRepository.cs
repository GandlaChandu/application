using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository
{
    public class CodeAnalyzerBaseRepository<TEntity> : BaseRepository<TEntity>, IBaseRepository where TEntity : class
    {
        protected new readonly CodeAnalyzerContext _dbContext;
        public CodeAnalyzerBaseRepository(CodeAnalyzerContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
