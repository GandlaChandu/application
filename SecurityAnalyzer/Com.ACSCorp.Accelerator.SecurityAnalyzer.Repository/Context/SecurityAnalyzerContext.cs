using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context
{
    public partial class SecurityAnalyzerContext : DbContext
    {
        public SecurityAnalyzerContext()
        {
        }

        public SecurityAnalyzerContext(DbContextOptions<SecurityAnalyzerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DynamicScan> DynamicScan { get; set; }
        public virtual DbSet<DynamicScanDetails> DynamicScanDetails { get; set; }
        public virtual DbSet<DynamicScanResult> DynamicScanResult { get; set; }
        public virtual DbSet<DynamicScanStatus> DynamicScanStatus { get; set; }
        public virtual DbSet<EntityType> EntityType { get; set; }
        public virtual DbSet<ScanPolicy> ScanPolicy { get; set; }
        public virtual DbSet<ScanPolicyMapping> ScanPolicyMapping { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DynamicScan>(entity =>
            {
                entity.ToTable("DynamicScan", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.UrlCount).HasDefaultValueSql("0");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.DynamicScan)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("fk_dynamicscan_statusid_dynamicscanstatus_id");
            });

            modelBuilder.Entity<DynamicScanDetails>(entity =>
            {
                entity.ToTable("DynamicScanDetails", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<DynamicScanResult>(entity =>
            {
                entity.ToTable("DynamicScanResult", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Cweid).HasColumnName("CWEId");

                entity.Property(e => e.Url).HasMaxLength(500);

                entity.Property(e => e.Wascid).HasColumnName("WASCId");

                entity.HasOne(d => d.DynamicScan)
                    .WithMany(p => p.DynamicScanResult)
                    .HasForeignKey(d => d.DynamicScanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_dynamicscanresult_dynamicscanid_dynamicscan_id");
            });

            modelBuilder.Entity<DynamicScanStatus>(entity =>
            {
                entity.ToTable("DynamicScanStatus", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<EntityType>(entity =>
            {
                entity.ToTable("EntityType", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<ScanPolicy>(entity =>
            {
                entity.ToTable("ScanPolicy", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.ScanPolicyName)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<ScanPolicyMapping>(entity =>
            {
                entity.ToTable("ScanPolicyMapping", "SecurityAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.ScanPolicy)
                    .WithMany(p => p.ScanPolicyMapping)
                    .HasForeignKey(d => d.ScanPolicyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_scanpolicymapping_statusid_scanpolicy_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
