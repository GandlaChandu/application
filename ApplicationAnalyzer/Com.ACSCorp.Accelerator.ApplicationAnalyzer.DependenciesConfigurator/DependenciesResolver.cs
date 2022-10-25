using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Service.ApiClients;
using Com.ACSCorp.Accelerator.Core.Repository;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.DependencyResolver
{
    public static class DependenciesResolver
    {
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationAnalyzerContext>(options => options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")), ServiceLifetime.Transient);
            services.InjectServices();
            services.InjectRepositories();
        }

        internal static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<ISecurityAnalyzerClient, SecurityAnalyzerClient>();
            services.AddScoped<ICodeAnalyzerClient, CodeAnalyzerClient>();
            services.AddScoped<IQueueApiClient, QueueApiClient>();

            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IDivisionService, DivisionService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRoleService, UserRoleService>();
            services.AddScoped<IUserAccessService, UserAccessService>();
            services.AddScoped<IVulnerabilityStatisticsService, VulnerabilityStatisticsService>();
            services.AddScoped<IJobService, JobService>();
            services.AddScoped<IJobScanTypeService, JobScanTypeService>();
            services.AddScoped<IJobScheduleService, JobScheduleService>();
            services.AddScoped<IJobExecutionSummaryService, JobExecutionSummaryService>();
            services.AddScoped<ICweInfoService, CweInfoService>();
        }

        internal static void InjectRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuditDataPopulator, AuditDataPopulator>();

            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IDivisionRepository, DivisionRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserRoleRepository, UserRoleRepository>();
            services.AddScoped<IVulnerabilityStatisticsRepository, VulnerabilityStatisticsRepository>();
            services.AddScoped<IJobRepository, JobRepository>();
            services.AddScoped<IJobScanTypeRepository, JobScanTypeRepository>();
            services.AddScoped<IJobScheduleRepository, JobScheduleRepository>();
            services.AddScoped<IJobExecutionSummaryRepository, JobExecutionSummaryRepository>();
            services.AddScoped<ICweInfoRepository, CweInfoRepository>();
        }
    }
}
