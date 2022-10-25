using Com.ACSCorp.Accelerator.Core.Authorization.Interfaces;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

using System;
using System.Linq;

namespace Com.ACSCorp.Accelerator.Core.Repository
{
    public class AuditDataPopulator : IAuditDataPopulator
    {
        private readonly IIdentityService _identityService;

        public AuditDataPopulator(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public void PopulateMetadataColumns(ChangeTracker changeTracker)
        {
            // Get all the entities that have a state of Added or Modified
            var entries = changeTracker
                .Entries()
                .Where(e => e.State == EntityState.Added
                        || e.State == EntityState.Modified);

            // For each entity we will set the Audit properties
            foreach (var entityEntry in entries)
            {
                // If the entity state is Added let's set the CreatedOn and CreatedById properties
                if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Property("CreatedOn").CurrentValue = DateTime.UtcNow;
                    entityEntry.Property("CreatedById").CurrentValue = _identityService.GetCurrentUserId();
                }
                else
                {
                    // If the state is Modified then we don't want to modify the CreatedOn and CreatedById properties
                    // so we set their state as IsModified to false
                    entityEntry.Property("CreatedOn").IsModified = false;
                    entityEntry.Property("CreatedById").IsModified = false;

                    // Setting the ModifiedOn and ModifiedById
                    entityEntry.Property("ModifiedOn").CurrentValue = DateTime.UtcNow;
                    entityEntry.Property("ModifiedById").CurrentValue = _identityService.GetCurrentUserId();
                }
            }
        }
    }
}
