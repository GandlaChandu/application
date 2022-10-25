using Com.ACSCorp.Accelerator.QueueAPI.Repository.Context;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.QueueAPI.Repository
{
    public class QueueAPIRepository : BaseRepository<QueueAPIEntity>, IQueueAPIRepository
    {
        public QueueAPIRepository(QueueDbContext context) : base(context)
        {
        }

        public override Task AddAsync(QueueAPIEntity entity)
        {
            entity.CreatedById = 0;
            entity.CreatedOn = DateTime.UtcNow;
            return base.AddAsync(entity);
        }

        public override Task AddRangeAsync(List<QueueAPIEntity> entities)
        {
            foreach (var entity in entities)
            {
                entity.CreatedById = 0;
                entity.CreatedOn = DateTime.UtcNow;
            }
            return base.AddRangeAsync(entities);
        }

        public override Task UpdateAsync(QueueAPIEntity entity)
        {
            entity.ModifiedById = 0;
            entity.ModifiedOn = DateTime.UtcNow;
            return base.UpdateAsync(entity);
        }

        public override Task UpdateRangeAsync(IEnumerable<QueueAPIEntity> entities)
        {
            foreach (var entity in entities)
            {
                entity.ModifiedById = 0;
                entity.ModifiedOn = DateTime.UtcNow;
            }
            return base.UpdateRangeAsync(entities);
        }
    }
}
