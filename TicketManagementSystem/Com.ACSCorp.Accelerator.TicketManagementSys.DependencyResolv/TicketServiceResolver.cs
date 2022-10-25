using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.IService;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Service;

using Microsoft.Extensions.DependencyInjection;

using System;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.DependencyResolver
{
    public static class TicketServiceResolver
    {
        public static void AddTicketServiceTransient(this IServiceCollection services)
        {
            services.AddTransient<GitHubTicketService>();

            TicketSystemFactoryResolver(services);
        }

        private static void TicketSystemFactoryResolver(IServiceCollection services)
        {
            services.AddTransient<Func<TicketSystemType?, ITicketService>>(serviceProvider => ticketType =>
            {
                switch (ticketType)
                {
                    case TicketSystemType.GitHub:
                        return serviceProvider.GetService<GitHubTicketService>();
                    default:
                        throw new NotSupportedException($"Service not found for ticket system type: {ticketType}");
                }
            });
        }
    }
}
