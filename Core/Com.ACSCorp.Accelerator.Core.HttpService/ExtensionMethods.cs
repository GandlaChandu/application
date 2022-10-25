using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace Com.ACSCorp.Accelerator.Core.HttpService
{
    public static class ExtensionMethods
    {

        /// <summary>
        /// Append headers.
        /// </summary>
        /// <param name="httpRequestMessage"></param>
        /// <param name="headers"></param>
        public static void AppendHeaders(this HttpRequestMessage httpRequestMessage, IDictionary<string, string> headers)
        {
            if (headers != null && headers.Count > 0)
            {
                foreach (KeyValuePair<string, string> header in headers)
                {
                    httpRequestMessage.Headers.Add(header.Key, header.Value);
                }
            }
        }

        public static string AppendQueryParameters(this string url, IDictionary<string, string> queryParams)
        {
            string urlWithQueryParams = url;

            if (queryParams != null && queryParams.Count > 0)
            {
                StringBuilder query = new StringBuilder();
                query.Append(url);

                foreach (KeyValuePair<string, string> parameter in queryParams)
                {
                    query.Append(Uri.EscapeDataString(parameter.Key));
                    query.Append("=");
                    query.Append(parameter.Value);
                    query.Append("&");
                }

                urlWithQueryParams = query.ToString();
            }
            return urlWithQueryParams;
        }
    }
}
