
using Microsoft.EntityFrameworkCore.Storage;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces
{
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Get All
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll();

        /// <summary>
        /// Get All
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="includeExpressions"></param>
        /// <returns></returns>
        public IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeExpressions);

        /// <summary>
        /// Get count
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public int GetCount(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Get Async
        /// </summary>
        /// <param name="expression"></param>
        /// <returns></returns>
        public Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> expression);

        /// <summary>
        /// Add async
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public Task AddAsync(TEntity entity);

        /// <summary>
        /// Add Range Async
        /// </summary>
        /// <param name="entities"></param>
        /// <returns></returns>
        public Task AddRangeAsync(List<TEntity> entities);

        /// <summary>
        /// Update Async
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public Task UpdateAsync(TEntity entity);

        /// <summary>
        /// Update Range
        /// </summary>
        /// <param name="entities"></param>
        /// <returns></returns>
        public Task UpdateRangeAsync(IEnumerable<TEntity> entities);

        /// <summary>
        /// SaveChanges Async
        /// </summary>
        /// <returns></returns>
        public Task<bool> SaveChangesAsync();

        /// <summary>
        /// Begin sql transaction
        /// </summary>
        /// <returns></returns>
        public IDbContextTransaction BeginTransaction();
    }
}
