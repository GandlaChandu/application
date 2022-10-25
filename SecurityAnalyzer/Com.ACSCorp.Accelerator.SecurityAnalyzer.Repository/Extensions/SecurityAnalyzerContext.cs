using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context
{
    public partial class SecurityAnalyzerContext
    {
        private readonly IAuditDataPopulator _auditDataPopulator;

        public SecurityAnalyzerContext(DbContextOptions<SecurityAnalyzerContext> options, IAuditDataPopulator auditDataPopulator)
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
