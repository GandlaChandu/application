
using Com.ACSCorp.Accelerator.Core.Repository;
using Com.ACSCorp.Accelerator.Core.Repository.Abstraction.Interfaces;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IRepository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService.ApiClients;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Repository.Context;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service.ApiClients;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.DependencyResolver
{
    public static class DependenciesResolver
    {
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<TicketManagementDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")));
            services.AddApplicationAnalyzerHttpClient(configuration);
            services.InjectServices();
            services.InjectRepositories();
            services.AddTicketServiceTransient();
        }

        internal static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<IApplicationAnalyzerClient, ApplicationAnalyzerClient>();
            services.AddScoped<IHeaderValuesService, HeaderValuesService>();
            services.AddScoped<ITicketService, GitHubTicketService>();
            services.AddScoped<ITicketSystemService, TicketSystemService>();
            services.AddScoped<ITicketSystemConfigurationService, TicketSystemConfigurationService>();
        }

        internal static void InjectRepositories(this IServiceCollection services)
        {
            services.AddScoped<IAuditDataPopulator, AuditDataPopulator>();

            services.AddScoped<IIssueTrackerRepository, IssueTrackerRepository>();
            services.AddScoped<ITicketSystemConfigurationRepository, TicketSystemConfigurationRepository>();
        }
    }
}
