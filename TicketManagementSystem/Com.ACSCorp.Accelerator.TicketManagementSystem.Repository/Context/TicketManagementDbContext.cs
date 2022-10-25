using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Models;

using Microsoft.EntityFrameworkCore;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Context
{
    public partial class TicketManagementDbContext : DbContext
    {
        public TicketManagementDbContext()
        {
        }

        public virtual DbSet<IssueTrackerEntity> IssueTracker { get; set; }
        public virtual DbSet<TicketSystemConfiguration> TicketSystemConfigurations { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IssueTrackerEntity>(entity =>
            {
                entity.ToTable("IssueTracker", "TicketSystemManagement");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.ScanId)
                    .IsRequired()
                    .HasColumnType("integer");

                entity.Property(e => e.ScanIssueId)
                    .IsRequired()
                    .HasColumnType("character varying");

                entity.Property(e => e.ScanType)
                    .IsRequired()
                    .HasColumnType("smallint");

                entity.Property(e => e.TicketSystemIssueId)
                    .IsRequired()
                    .HasColumnName("TicketSystemIssueId​")
                    .HasColumnType("character varying");

                entity.Property(e => e.TicketSystemType)
                .IsRequired()
                .HasColumnType("smallint");
            });

            modelBuilder.Entity<TicketSystemConfiguration>(entity =>
            {
                entity.ToTable("TicketingSystemConfiguration", "TicketSystemManagement");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Type)
                .IsRequired()
                .HasColumnType("smallint");

                entity.Property(e => e.Configuration)
                    .IsRequired()
                    .HasColumnType("character varying");
                });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
