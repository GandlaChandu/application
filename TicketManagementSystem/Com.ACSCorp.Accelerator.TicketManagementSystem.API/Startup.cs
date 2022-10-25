using Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.Dependencies.MiddlewareExtensions;
using Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.TicketManagementSystem.DependencyResolver;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.RegisterCors(Configuration);
            services.RegisterLogger(Configuration);
            services.AddControllers().AddNewtonsoftJson();
            services.AddMvc();
            services.ResolveDependencies(Configuration);
            services.AddHttpService();
            services.RegisterTokenAuth();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(Configuration.GetValue<string>("SwaggerSettings:Version"),
                    new OpenApiInfo
                    {
                        Title = Configuration.GetValue<string>("SwaggerSettings:Name"),
                        Version = Configuration.GetValue<string>("SwaggerSettings:Version")
                    });
                c.OperationFilter<HeaderFilter>();
            });
            services.AddSwaggerGenNewtonsoftSupport();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.ConfigureExceptionHandler();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(Configuration.GetValue<string>("SwaggerSettings:SwaggerJSONPath"),
                    Configuration.GetValue<string>("SwaggerSettings:Title"));
            });

            app.UseCors();

            //app.UseHttpsRedirection();
            app.UseHeaderInfoMiddleware();
            app.UseRouting();

            app.UseAuthorization();
            app.UseTokenAuth();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
