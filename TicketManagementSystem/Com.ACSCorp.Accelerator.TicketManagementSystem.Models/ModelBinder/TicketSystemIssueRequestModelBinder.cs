using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.TicketManagementSystem.Common.Enum;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

using Newtonsoft.Json.Linq;

using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.ModelBinder
{
    public class TicketSystemIssueRequestModelBinder<T> : IModelBinder where T: BaseTicketSystemIssueModel
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

            if (!JsonUtility.TryDeserialize(json, out T ticketSystemIssue, out Dictionary<string, string> validations))
            {
                foreach (var validation in validations)
                {
                    bindingContext.ModelState.TryAddModelError(validation.Key, validation.Value);
                }

                bindingContext.Result = ModelBindingResult.Failed();
                return;
            }

            if (ticketSystemIssue.IssueInformation != null)
            {
                JObject jObject = JObject.Parse(json);

                var result = DeserializeIssueInformation(jObject["issueInformation"].ToString(), ticketSystemIssue.IssueInformation.Type);
                if (result != null)
                {
                    ticketSystemIssue.IssueInformation = result;
                }
            }

            bindingContext.Result = ModelBindingResult.Success(ticketSystemIssue);
        }

        private BaseTicketSystemModel DeserializeIssueInformation(string issueInformation, TicketSystemType ticketSystemType)
        {
            switch (ticketSystemType)
            {
                case TicketSystemType.GitHub:
                    return JsonUtility.DeserializeObject<GitHubIssueRequestModel>(issueInformation);
                default:
                    return null;
            }
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
    }
}
