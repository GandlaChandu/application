using Com.ACSCorp.Accelerator.Core.Dependencies;
using Com.ACSCorp.Accelerator.Core.Models;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

using Serilog;

using System.Net;

namespace Com.ACSCorp.Accelerator.Dependencies.MiddlewareExtensions
{
    public static class ExceptionHandlerExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    IExceptionHandlerFeature contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        Log.Error($"{Messages.SomethingWentWrong} {contextFeature.Error}");

                        ExceptionDetails exceptionDetails = new ExceptionDetails
                        {
                            StatusCode = (int)HttpStatusCode.InternalServerError,
                            Message = Messages.InternalServerError
                        };

                        await context.Response.WriteAsync(exceptionDetails.ToString());
                    }
                });
            });
        }
    }
}
