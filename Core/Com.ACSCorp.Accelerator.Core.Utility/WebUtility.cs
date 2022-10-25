using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.Utility
{
    // ToDo - remove this class after removing all its dependencies.
    public static class WebUtility
    {
        private static readonly HttpClient _client;
        static WebUtility()
        {
            var socketsHandler = new SocketsHttpHandler
            {
                PooledConnectionLifetime = TimeSpan.FromMinutes(2)
            };

            _client = new HttpClient(socketsHandler);
        }

        public static async Task<HttpResponseMessage> HttpGetResponseAsync(string apiUrl, string uri, string endpoint)
        {
            return await _client.GetAsync($"{apiUrl}{uri}{endpoint}");
        }

        public static async Task<HttpResponseMessage> HttpPostResponseAsync<T>(string apiUrl, string uri, string endpoint, List<T> listEntity)
        {
            string json = JsonConvert.SerializeObject(listEntity);
            StringContent stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            stringContent.Headers.Add("Accept", "application/json");
            stringContent.Headers.Add("Content-Type", "application/json; charset=utf-8");
            return await _client.PostAsync($"{apiUrl}{uri}{endpoint}", stringContent);
        }

        public static async Task<HttpResponseMessage> HttpPostResponseAsync<T>(string apiUrl, string uri, string endpoint, T listEntity)
        {
            string json = JsonConvert.SerializeObject(listEntity);
            StringContent stringContent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            stringContent.Headers.Add("Accept", "application/json");
            return await _client.PostAsync($"{apiUrl}{uri}{endpoint}", stringContent);
        }
    }
}
