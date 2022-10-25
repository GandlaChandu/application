using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using Com.ACSCorp.Accelerator.Core.Models.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Enums;
using Com.ACSCorp.Accelerator.QueueAPI.Repository.Models;

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace Com.ACSCorp.Accelerator.QueueAPI.Process
{
    public static class ExtensionMethods
    {
        public static HttpRequestModel GetHttpRequestModel(this QueueAPIEntity queue)
        {
            HttpRequestModel httpRequest = null;
            if (queue != null)
            {
                httpRequest = new HttpRequestModel
                {
                    Headers = queue.Headers == null ? null : JsonSerializer.Deserialize<Dictionary<string, string>>(queue.Headers),
                    HttpContent = queue.Content == null ? null : new StringContent(queue.Content, Encoding.UTF8, "application/json"),
                    HttpMethod = ((HttpMethodType)queue.HttpType).GetHttpMethod(),
                    RequestUrl = queue.Uri
                };
            }
            return httpRequest;
        }

        public static void UpdateQueStatus(this IEnumerable<QueueAPIEntity> queueApis, QueueStatus queueStatus)
        {
            foreach (var queApi in queueApis)
            {
                queApi.Status = (short)queueStatus;
            }
        }

        public static HttpMethod GetHttpMethod(this HttpMethodType httpMethodType)
        {
            switch (httpMethodType)
            {
                case HttpMethodType.Post:
                    return HttpMethod.Post;
                case HttpMethodType.Put:
                    return HttpMethod.Put;
                case HttpMethodType.Delete:
                    return HttpMethod.Delete;
                default:
                    throw new NotImplementedException($"{httpMethodType} not implemented");
            }
        }
    }
}
