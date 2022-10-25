using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;

using System.Threading;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context
{
    public partial class CodeAnalyzerContext
    {
        private readonly IAuditDataPopulator _auditDataPopulator;

        public CodeAnalyzerContext(DbContextOptions<CodeAnalyzerContext> options, IAuditDataPopulator auditDataPopulator)
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
