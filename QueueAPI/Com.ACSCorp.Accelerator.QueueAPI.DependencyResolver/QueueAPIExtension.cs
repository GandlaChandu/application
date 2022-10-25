
using Com.ACSCorp.Accelerator.QueueAPI.Enque;
using Com.ACSCorp.Accelerator.QueueAPI.Enque.Interfaces;
using Com.ACSCorp.Accelerator.QueueAPI.Repository;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Context;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Interfaces;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.QueueAPI.DependencyResolver
{
    public static class QueueAPIExtension
    {
        public static void AddQueueAPI(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<QueueDbContext>(options => options.UseNpgsql(configuration.GetConnectionString("SAConnectionString")));
            services.InjectServices();
            services.InjectRepositories();
        }

        private static void InjectServices(this IServiceCollection services)
        {
            services.AddTransient<IQueueService, QueueService>();
        }

        private static void InjectRepositories(this IServiceCollection services)
        {
            services.AddTransient<IQueueAPIRepository, QueueAPIRepository>();
        }
    }
}
