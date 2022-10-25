
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using Microsoft.EntityFrameworkCore;


namespace Com.ACSCorp.Accelerator.QueueAPI.Repository.Context
{
    public partial class QueueDbContext : DbContext
    {
        public QueueDbContext()
        {
        }

        public QueueDbContext(DbContextOptions<QueueDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<QueueAPIEntity> QueueApis { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<QueueAPIEntity>(entity =>
            {
                entity.Property(e => e.Id).UseIdentityAlwaysColumn().UseSerialColumn();

                entity.Property(e => e.Message).HasColumnType("character varying");

                entity.Property(e => e.Content).HasColumnType("character varying");

                entity.Property(e => e.Uri)
                    .IsRequired()
                    .HasColumnType("character varying");
                entity.Property(e => e.HttpType)
                    .IsRequired()
                    .HasColumnType("smallint");
                entity.Property(e => e.CreatedById)
                    .IsRequired()
                    .HasColumnType("integer");
                entity.Property(e => e.CreatedOn)
                    .IsRequired()
                    .HasColumnType("timestamp without time zone");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
