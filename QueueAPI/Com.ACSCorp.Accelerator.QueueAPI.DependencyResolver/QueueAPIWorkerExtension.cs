using Com.ACSCorp.Accelerator.QueueAPI.Process;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Context;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.QueueAPI.DependencyResolver
{
    public static class QueueAPIWorkerExtension
    {
        public static void AddQueueWorker(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<QueueDbContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")), ServiceLifetime.Transient);
            services.AddQueueProcessingTransient();
            services.AddHttpClient();
            services.InjectServices();
            services.InjectRepositories();
        }

        private static void InjectServices(this IServiceCollection services)
        {
            services.AddTransient<IQueueProcessingService, QueueProcessingService>();
        }

        private static void InjectRepositories(this IServiceCollection services)
        {
            services.AddTransient<IQueueAPIRepository, QueueAPIRepository>();
        }
    }
}
