using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Service.SourceControl;

using Microsoft.Extensions.DependencyInjection;

using System;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.DependencyResolver
{
    public static class CloneRepositoryResolver
    {
        public static void AddCloneRepositoryTransient(this IServiceCollection services)
        {
            services.AddTransient<GitSourceControl>();

            services.CloneRepositoryFactoryResolver();
        }

        private static void CloneRepositoryFactoryResolver(this IServiceCollection services)
        {
            services.AddTransient<Func<SourceControlType, ISourceControl>>(serviceProvider => sourceControlType =>
            {
                switch (sourceControlType)
                {
                    case SourceControlType.GitHub:
                        return serviceProvider.GetService<GitSourceControl>();
                    case SourceControlType.GitLab:
                        return serviceProvider.GetService<GitSourceControl>();
                    default:
                        throw new NotSupportedException($"Repository Clone not supported for {sourceControlType}");
                }
            });
        }
    }
}
