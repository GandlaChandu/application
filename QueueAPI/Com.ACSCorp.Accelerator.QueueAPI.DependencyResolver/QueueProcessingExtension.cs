using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Process;
using Com.ACSCorp.Accelerator.QueueAPI.Process.Interfaces;

using Microsoft.Extensions.DependencyInjection;

using System;

namespace Com.ACSCorp.Accelerator.QueueAPI.DependencyResolver
{
    internal static class QueueProcessingExtension
    {
        public static void AddQueueProcessingTransient(this IServiceCollection services)
        {
            services.AddTransient<SingleQueueExecutor>();
            services.AddTransient<BatchQueueExecutor>();
            services.AddQueueProcessingFactory();
        }

        private static void AddQueueProcessingFactory(this IServiceCollection services)
        {
            services.AddTransient<Func<QueueProcessingType, IQueueExecutor>>(serviceProvider => queueProcessingType =>
          {
              switch (queueProcessingType)
              {
                  case QueueProcessingType.SingleRecord:
                      return serviceProvider.GetService<SingleQueueExecutor>();
                  case QueueProcessingType.BatchRecord:
                      return serviceProvider.GetService<BatchQueueExecutor>();
                  default:
                      throw new NotSupportedException($"queue Processing not supported for {queueProcessingType}");
              }
          });

        }
    }
}