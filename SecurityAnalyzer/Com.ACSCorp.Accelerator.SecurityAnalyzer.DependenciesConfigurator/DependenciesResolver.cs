using Com.ACSCorp.Accelerator.Core.Repository;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Service;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.ApiClients;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.DependencyResolver
{
    public static class DependenciesResolver
    {
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SecurityAnalyzerContext>(options => options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")), ServiceLifetime.Scoped);
            services.AddTicketSystemHttpClient(configuration);
            services.InjectServices();
            services.InjectRepositories();
        }

        internal static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<IApplicationAnalyzerClient, ApplicationAnalyzerClient>();
            services.AddScoped<ITicketSystemClient, TicketSystemClient>();
            services.AddScoped<IQueueAPIClient, QueueAPIClient>();

            services.AddScoped<IDynamicScanDetailService, DynamicScanDetailService>();
            services.AddScoped<IDynamicScanService, DynamicScanService>();
            services.AddScoped<IDynamicScanResultService, DynamicScanResultService>();
            services.AddScoped<IDynamicScanEmailService, DynamicScanEmailService>();
            services.AddScoped<IDynamicScanReportService, DynamicScanReportService>();

            services.AddScoped<IScanPolicyService, ScanPolicyService>();
            services.AddScoped<IScanPolicyConfigService, ScanPolicyConfigService>();
        }

        internal static void InjectRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuditDataPopulator, AuditDataPopulator>();

            services.AddScoped<IDynamicScanRepository, DynamicScanRepository>();
            services.AddScoped<IDynamicScanResultRepository, DynamicScanResultRepository>();
            services.AddScoped<IScanPolicyRepository, ScanPolicyRepository>();
            services.AddScoped<IScanPolicyMappingRepository, ScanPolicyMappingRepository>();
            services.AddScoped<IDynamicScanDetailsRepository, DynamicScanDetailsRepository>();
        }
    }
}
