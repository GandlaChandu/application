using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.ModelBinders
{
    public class TicketSystemConfigurationBinder : IModelBinder
    {
        public async Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var json = await ExtractRequestJson(bindingContext.ActionContext);
            if (json == null)
            {
                bindingContext.ModelState.TryAddModelError(string.Empty, "A non-empty request body is required.");
                bindingContext.Result = ModelBindingResult.Failed();
                return;
            }

            if (!JsonUtility.TryDeserialize(json, out TicketSystemConfigurationDTO ticketSystemConfiguration, out Dictionary<string, string> validations))
            {
                foreach (var validation in validations)
                {
                    bindingContext.ModelState.TryAddModelError(validation.Key, validation.Value);
                }

                bindingContext.Result = ModelBindingResult.Failed();
                return;
            }

            if (ticketSystemConfiguration.Configuration != null)
            {
                JObject jObject = JObject.Parse(json);

                ticketSystemConfiguration.Configuration = GetTicketSystemConfigurationDTOType(ticketSystemConfiguration.Type, jObject["configuration"].ToString());
            }

            bindingContext.Result = ModelBindingResult.Success(ticketSystemConfiguration);
        }

        private async Task<string> ExtractRequestJson(ActionContext actionContext)
        {
            string content;
            using (var sr = new StreamReader(actionContext.HttpContext.Request.Body))
            {
                content = await sr.ReadToEndAsync();
            }
            return content;
        }

        private BaseTicketSystemModel GetTicketSystemConfigurationDTOType(TicketSystemType ticketSystemType, string obj)
        {
            switch (ticketSystemType)
            {
                case TicketSystemType.GitHub:
                    return JsonConvert.DeserializeObject<GitHubTicketSystemConfigurationDTO>(obj);
                default:
                    throw new NotImplementedException($"{ticketSystemType} not implemented");
            }
        }
    }
}
