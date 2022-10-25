
using Com.ACSCorp.Accelerator.Core.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.Dependencies.ServiceExtensions;
using Com.ACSCorp.Accelerator.QueueAPI.DependencyResolver;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

namespace Com.ACSCorp.Accelerator.QueueAPI.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.RegisterLogger(Configuration);
            services.AddQueueAPI(Configuration);
            services.AddControllers();
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

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(Configuration.GetValue<string>("SwaggerSettings:SwaggerJSONPath"),
                    Configuration.GetValue<string>("SwaggerSettings:Title"));
            });

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            //app.UseTokenAuth();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
