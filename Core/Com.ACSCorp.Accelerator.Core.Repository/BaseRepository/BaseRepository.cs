using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.Repository.BaseRepository
{
    public class BaseRepository<TEntity> : IBaseRepository where TEntity : class
    {
        protected readonly DbContext _dbContext;

        public BaseRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        protected virtual IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsNoTracking();
        }

        protected virtual IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().AsNoTracking().Where(predicate);
        }

        protected virtual IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeExpressions)
        {
            IQueryable<TEntity> query = _dbContext.Set<TEntity>().AsNoTracking().Where(predicate);

            if (includeExpressions == null)
            {
                return query;
            }

            return includeExpressions.Aggregate(query, (current, expression) => current.Include(expression));
        }

        protected virtual async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbContext.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(predicate);
        }

        protected virtual async Task AddAsync(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

        protected virtual async Task AddRangeAsync(List<TEntity> entities)
        {
            await _dbContext.Set<TEntity>().AddRangeAsync(entities);
            await SaveChangesAsync();
        }

        protected virtual async Task UpdateAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            await SaveChangesAsync();
        }

        public virtual async Task UpdateRangeAsync(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().UpdateRange(entities);
            await SaveChangesAsync();
        }

        public virtual int GetCount(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().AsNoTracking().Count(predicate);
        }

        public virtual async Task<bool> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync().ConfigureAwait(false) > 0;
        }

        public virtual IDbContextTransaction BeginTransaction()
        {
            return _dbContext.Database.BeginTransaction();
        }
    }
}
