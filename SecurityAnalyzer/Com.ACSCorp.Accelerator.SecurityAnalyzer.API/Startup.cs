using Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.Dependencies.MiddlewareExtensions;
using Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.DependencyResolver;

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

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.API
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
            services.AddControllers();
            services.ResolveDependencies(Configuration);
            services.AddRazorPages();
            services.AddHttpService();
            services.RegisterTokenAuth();
            services.RegisterRenderTemplate();

            // Register the Swagger generator, defining 1 or more Swagger documents
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

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
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
                "/api/DynamicScan/PostSilent/",
                "/api/DynamicScan/InitiateScan"
            };

            return !urls.Any(url => context.Request.Path.Value.Contains(url, StringComparison.InvariantCultureIgnoreCase));
        }
    }
}
