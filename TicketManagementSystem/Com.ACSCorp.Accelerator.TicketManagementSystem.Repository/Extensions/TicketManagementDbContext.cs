using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Context
{
    public partial class TicketManagementDbContext
    {
        private readonly IAuditDataPopulator _auditDataPopulator;

        public TicketManagementDbContext(DbContextOptions<TicketManagementDbContext> options, IAuditDataPopulator auditDataPopulator)
            : base(options)
        {
            _auditDataPopulator = auditDataPopulator;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            _auditDataPopulator.PopulateMetadataColumns(ChangeTracker);

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
