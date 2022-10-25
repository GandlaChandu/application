using Com.ACSCorp.Accelerator.TicketManagementSystem.Common;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.API
{
    public class HeaderFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            if (operation.Parameters == null)
            {
                operation.Parameters = new List<OpenApiParameter>();
            }

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = Constant.HeaderProjectId,
                In = ParameterLocation.Header,
                Schema = new OpenApiSchema() { Type = "integer" },
                Required = true
            });
        }
    }
}
