using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.StaticScanners;

using Microsoft.Extensions.DependencyInjection;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.DependencyResolver
{
    public static class StaticScanResolver
    {
        public static void AddStaticScanTransient(this IServiceCollection services)
        {
            services.AddScoped<DotnetStaticScan>();
            services.AddScoped<JavaMavenStaticScan>();
            services.AddScoped<GenericStaticScan>();

            StaticScanFactoryResolver(services);
        }

        private static void StaticScanFactoryResolver(IServiceCollection services)
        {
            services.AddTransient<Func<SourceCodeType, IStaticScan>>(serviceProvider => codeType =>
            {
                switch (codeType)
                {
                    case SourceCodeType.DotNet:
                        return serviceProvider.GetService<DotnetStaticScan>();
                    case SourceCodeType.JavaMaven:
                        return serviceProvider.GetService<JavaMavenStaticScan>();
                    case SourceCodeType.Generic:
                        return serviceProvider.GetService<GenericStaticScan>();
                    default:
                        throw new NotSupportedException($"Static scan not supported for {codeType}");
                }
            });
        }
    }
}
