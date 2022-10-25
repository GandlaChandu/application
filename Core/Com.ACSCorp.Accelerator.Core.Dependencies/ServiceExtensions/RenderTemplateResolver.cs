using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions
{
    public static class RenderTemplateResolver
    {
        public static void RegisterRenderTemplate(this IServiceCollection services)
        {
            services.AddScoped<IRenderTemplate, RenderTemplate>();
        }
    }
}
