using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context
{
    public partial class CodeAnalyzerContext : DbContext
    {
        public CodeAnalyzerContext()
        {
        }

        public CodeAnalyzerContext(DbContextOptions<CodeAnalyzerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Language> Language { get; set; }
        public virtual DbSet<QualityProfile> QualityProfile { get; set; }
        public virtual DbSet<QualityProfilePreferences> QualityProfilePreferences { get; set; }
        public virtual DbSet<Severity> Severity { get; set; }
        public virtual DbSet<StaticScan> StaticScan { get; set; }
        public virtual DbSet<StaticScanDetails> StaticScanDetails { get; set; }
        public virtual DbSet<StaticScanResult> StaticScanResult { get; set; }
        public virtual DbSet<StaticScanStatus> StaticScanStatus { get; set; }
        public virtual DbSet<StaticScanType> StaticScanType { get; set; }
        public virtual DbSet<Vulnerability> Vulnerability { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Language>(entity =>
            {
                entity.ToTable("Language", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<QualityProfile>(entity =>
            {
                entity.ToTable("QualityProfile", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasColumnType("character varying");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Language)
                    .WithMany(p => p.QualityProfile)
                    .HasForeignKey(d => d.LanguageId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_qualityprofile_languageid_language_id");
            });

            modelBuilder.Entity<QualityProfilePreferences>(entity =>
            {
                entity.ToTable("QualityProfilePreferences", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.QualityProfile)
                    .WithMany(p => p.QualityProfilePreferences)
                    .HasForeignKey(d => d.QualityProfileId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_qualityprofilepreferences_qualityprofileid_qualityprofile_id");
            });

            modelBuilder.Entity<Severity>(entity =>
            {
                entity.ToTable("Severity", "CodeAnalyzer");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<StaticScan>(entity =>
            {
                entity.ToTable("StaticScan", "CodeAnalyzer");

                entity.HasIndex(e => e.StatusId)
                    .HasName("None");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.SonarQubeAnalysisTaskId).HasColumnType("character varying");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.StaticScan)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("fk_staticscan_statusid_staticscanstatus_id");
            });

            modelBuilder.Entity<StaticScanDetails>(entity =>
            {
                entity.ToTable("StaticScanDetails", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Password).HasMaxLength(100);

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Username).HasMaxLength(100);
            });

            modelBuilder.Entity<StaticScanResult>(entity =>
            {
                entity.ToTable("StaticScanResult", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Component).HasMaxLength(100);

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Message).IsRequired();

                entity.Property(e => e.RuleKey).HasMaxLength(50);

                entity.Property(e => e.RuleLanguage).HasMaxLength(50);

                entity.Property(e => e.RuleName).HasMaxLength(50);

                entity.Property(e => e.Severity)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.StaticScan)
                    .WithMany(p => p.StaticScanResult)
                    .HasForeignKey(d => d.StaticScanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_staticscanresult_staticscanid_staticscan_id");
            });

            modelBuilder.Entity<StaticScanStatus>(entity =>
            {
                entity.ToTable("StaticScanStatus", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<StaticScanType>(entity =>
            {
                entity.ToTable("StaticScanType", "CodeAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.StaticScanDetails)
                    .WithMany(p => p.StaticScanType)
                    .HasForeignKey(d => d.StaticScanDetailsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_staticscantype_staticscandetailsid_staticscandetails_id");
            });

            modelBuilder.Entity<Vulnerability>(entity =>
            {
                entity.ToTable("Vulnerability", "CodeAnalyzer");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
