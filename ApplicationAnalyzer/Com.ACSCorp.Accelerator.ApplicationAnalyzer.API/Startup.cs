using Com.ACSCorp.Accelerator.ApplicationAnalyzer.DependencyResolver;
using Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.Dependencies.MiddlewareExtensions;
using Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

using System;
using System.Collections.Generic;
using System.Linq;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.API
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
            });
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

            app.UseRouting();
            app.UseAuthorization();
            app.UseWhen(context => AllowAnonymousUrls(context), appBuilder =>
            {
                appBuilder.UseTokenAuth();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private bool AllowAnonymousUrls(HttpContext context)
        {
            var urls = new List<string>
            {
                "/api/Me/",
                "/api/VulnerabilityStatistics/Post",
                "/api/User/Get/",
                "/api/Project/Get/",
                "/api/Job/Trigger/",
                "/api/JobSchedule/",
                "/api/JobExecutionSummary/",
                "/api/Cwe/GetAll/"
            };

            return urls.All(url => !context.Request.Path.Value.Contains(url, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
