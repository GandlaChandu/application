using Com.ACSCorp.Accelerator.QueueAPI.Repository.Context;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace Com.ACSCorp.Accelerator.QueueAPI.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected readonly QueueDbContext _dbContext;

        public BaseRepository(QueueDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return _dbContext.Set<TEntity>().AsNoTracking();
        }

        public virtual IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeExpressions)
        {
            var query = _dbContext.Set<TEntity>().AsNoTracking();

            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            if (includeExpressions == null)
            {
                return query;
            }

            return includeExpressions.Aggregate(query, (current, expression) => current.Include(expression));
        }

        public virtual int GetCount(Expression<Func<TEntity, bool>> predicate)
        {
            return _dbContext.Set<TEntity>().AsNoTracking().Count(predicate);
        }

        public virtual async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await _dbContext.Set<TEntity>().AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public virtual async Task AddAsync(TEntity entity)
        {
            await _dbContext.Set<TEntity>().AddAsync(entity);
            await SaveChangesAsync();
        }

        public virtual async Task AddRangeAsync(List<TEntity> entities)
        {
            await _dbContext.Set<TEntity>().AddRangeAsync(entities);
            await SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(TEntity entity)
        {
            _dbContext.Set<TEntity>().Update(entity);
            await SaveChangesAsync();
        }

        public virtual async Task UpdateRangeAsync(IEnumerable<TEntity> entities)
        {
            _dbContext.Set<TEntity>().UpdateRange(entities);
            await SaveChangesAsync();
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
