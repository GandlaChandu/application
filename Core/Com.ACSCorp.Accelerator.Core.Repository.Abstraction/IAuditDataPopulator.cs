using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces
{
    public interface IAuditDataPopulator
    {
        public void PopulateMetadataColumns(ChangeTracker changeTracker);
    }
}
