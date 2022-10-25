using Com.ACSCorp.Accelerator.CodeAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Context;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Repository;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.DependencyResolver
{
    public static class DependenciesResolver
    {
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<CodeAnalyzerContext>(options => options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")));
            services.AddSonarHttpClient(configuration);
            services.AddTicketSystemHttpClient(configuration);
            services.InjectServices();
            services.InjectRepositories();
        }

        internal static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<IApplicationAnalyzerClient, ApplicationAnalyzerClient>();
            services.AddScoped<ITicketSystemClient, TicketSystemClient>();
            services.AddScoped<IQueueAPIClient, QueueAPIClient>();

            services.AddScoped<IStaticScanService, StaticScanService>();
            services.AddScoped<IStaticScanDetailService, StaticScanDetailService>();
            services.AddScoped<IStaticScanResultService, StaticScanResultService>();
            services.AddScoped<IStaticScanReportService, StaticScanReportService>();
            services.AddScoped<IStaticScanEmailService, StaticScanEmailService>();

            services.AddScoped<IQualityProfileService, QualityProfileService>();
            services.AddScoped<IQualityProfilePreferencesService, QualityProfilePreferencesService>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<IDataService, DataService>();
            services.AddScoped<ICMDService, CMDService>();
            services.AddScoped<ISonarQubeClient, SonarQubeClient>();
            services.AddCloneRepositoryTransient();
            services.AddStaticScanTransient();
        }

        internal static void InjectRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuditDataPopulator, AuditDataPopulator>();

            services.AddScoped<IStaticScanRepository, StaticScanRepository>();
            services.AddScoped<IStaticScanDetailsRepository, StaticScanDetailsRepository>();
            services.AddScoped<IQualityProfileRepository, QualityProfileRepository>();
            services.AddScoped<IQualityProfilePreferencesRepository, QualityProfilePreferencesRepository>();
            services.AddScoped<ILanguageRepository, LanguageRepository>();
        }
    }
}
