using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context
{
    public partial class ApplicationAnalyzerContext : DbContext
    {
        public ApplicationAnalyzerContext()
        {
        }

        public ApplicationAnalyzerContext(DbContextOptions<ApplicationAnalyzerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Cweinfo> Cweinfo { get; set; }
        public virtual DbSet<Division> Division { get; set; }
        public virtual DbSet<Job> Job { get; set; }
        public virtual DbSet<JobExecutionSummary> JobExecutionSummary { get; set; }
        public virtual DbSet<JobScanType> JobScanType { get; set; }
        public virtual DbSet<JobSchedule> JobSchedule { get; set; }
        public virtual DbSet<JobStatus> JobStatus { get; set; }
        public virtual DbSet<Project> Project { get; set; }
        public virtual DbSet<ScanType> ScanType { get; set; }
        public virtual DbSet<StaticScanType> StaticScanType { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<VulnerabilityStatistics> VulnerabilityStatistics { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Cweinfo>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("CWEInfo", "AppAnalyzer");

                entity.Property(e => e.Category).HasMaxLength(150);

                entity.Property(e => e.Cweid).HasColumnName("CWEId");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Division>(entity =>
            {
                entity.ToTable("Division", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Division)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_division_clientid_client_id");
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("Job", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.Job)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Job_ProjectId_Project_Id");
            });

            modelBuilder.Entity<JobExecutionSummary>(entity =>
            {
                entity.ToTable("JobExecutionSummary", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.JobName).HasMaxLength(50);

                entity.Property(e => e.RunDuration).HasColumnType("time without time zone");

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobExecutionSummary)
                    .HasForeignKey(d => d.JobId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobExecutionSummary_JobId_Job_Id");

                entity.HasOne(d => d.JobStatus)
                    .WithMany(p => p.JobExecutionSummary)
                    .HasForeignKey(d => d.JobStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobExecutionSummary_JobStatusId_JobStatus_Id");
            });

            modelBuilder.Entity<JobScanType>(entity =>
            {
                entity.ToTable("JobScanType", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobScanType)
                    .HasForeignKey(d => d.JobId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_JobScanType_JobId_Job_Id");

                entity.HasOne(d => d.ScanType)
                    .WithMany(p => p.JobScanType)
                    .HasForeignKey(d => d.ScanTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_JobScanType_ScanTypeId_ScanType_Id");
            });

            modelBuilder.Entity<JobSchedule>(entity =>
            {
                entity.ToTable("JobSchedule", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.CronSchedule)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.CronScheduleDesc).HasMaxLength(200);

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobSchedule)
                    .HasForeignKey(d => d.JobId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_JobSchedule_JobId_Job_Id");
            });

            modelBuilder.Entity<JobStatus>(entity =>
            {
                entity.ToTable("JobStatus", "AppAnalyzer");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.ToTable("Project", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Division)
                    .WithMany(p => p.Project)
                    .HasForeignKey(d => d.DivisionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_project_divisionid_division_id");
            });

            modelBuilder.Entity<ScanType>(entity =>
            {
                entity.ToTable("ScanType", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<StaticScanType>(entity =>
            {
                entity.ToTable("StaticScanType", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.ToTable("UserRole", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRole)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_userrole_userid_user_id");
            });

            modelBuilder.Entity<VulnerabilityStatistics>(entity =>
            {
                entity.ToTable("VulnerabilityStatistics​", "AppAnalyzer");

                entity.Property(e => e.Id).UseIdentityAlwaysColumn();

                entity.Property(e => e.Severity)
                    .IsRequired()
                    .HasColumnType("character varying");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnType("character varying");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.VulnerabilityStatistics)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_VulnerabilityStatistics_ClientId_Client_Id");

                entity.HasOne(d => d.Division)
                    .WithMany(p => p.VulnerabilityStatistics)
                    .HasForeignKey(d => d.DivisionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_VulnerabilityStatistics_DivisionId_Division_Id");

                entity.HasOne(d => d.Project)
                    .WithMany(p => p.VulnerabilityStatistics)
                    .HasForeignKey(d => d.ProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_VulnerabilityStatistics_ProjectId_Project_Id");

                entity.HasOne(d => d.ScanType)
                    .WithMany(p => p.VulnerabilityStatistics)
                    .HasForeignKey(d => d.ScanTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_VulnerabilityStatistics_ScanTypeId_ScanType_Id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
