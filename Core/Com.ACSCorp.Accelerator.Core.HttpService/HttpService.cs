using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction;
using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using Com.ACSCorp.Accelerator.Core.Utility;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.HttpService
{
    public class HttpService : IHttpService, IDisposable
    {
        private readonly HttpClient _httpClient;

        [ActivatorUtilitiesConstructor]
        public HttpService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        public HttpService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<HttpResponseModel> SendAsync(HttpRequestModel httpRequest)
        {
            httpRequest.RequestUrl = httpRequest.RequestUrl.AppendQueryParameters(httpRequest.QueryParameters);

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage(httpRequest.HttpMethod, httpRequest.RequestUrl);
            httpRequestMessage.AppendHeaders(httpRequest.Headers);
            if (httpRequest.HttpMethod == HttpMethod.Post || httpRequest.HttpMethod == HttpMethod.Put)
            {
                httpRequestMessage.Content = httpRequest.HttpContent;
            }

            HttpResponseMessage httpResponse = await _httpClient.SendAsync(httpRequestMessage);

            return new HttpResponseModel
            {
                IsSuccess = httpResponse.IsSuccessStatusCode,
                StatusCode = httpResponse.StatusCode,
                Response = await httpResponse.Content.ReadAsStringAsync()
            };
        }

        public void Dispose()
        {
            _httpClient?.Dispose();
        }

        public string FormUrl(string controllerName, string methodName)
        {
            if (string.IsNullOrWhiteSpace(controllerName) || string.IsNullOrWhiteSpace(methodName))
            {
                return null;
            }

            controllerName += controllerName.EndsWith("/") ? string.Empty : "/";

            return $"{controllerName}{methodName}";
        }

        public string FormUrl(string baseUrl, string controllerName, string methodName)
        {
            if (string.IsNullOrWhiteSpace(baseUrl) || string.IsNullOrWhiteSpace(controllerName) || string.IsNullOrWhiteSpace(methodName))
            {
                return null;
            }

            baseUrl += baseUrl.EndsWith("/") ? string.Empty : "/";
            baseUrl += FormUrl(controllerName, methodName);

            return baseUrl;
        }

        public async Task<T> GetAsync<T>(string url, IDictionary<string, string> headers = null)
        {
            return await GetWithQueryParamsAsync<T>(url, null, headers);
        }

        public async Task<T> GetWithQueryParamsAsync<T>(string url, IDictionary<string, string> queryParameters, IDictionary<string, string> headers = null)
        {
            T value = default;
            HttpResponseModel result = await GetWithQueryParamsAsync(url, queryParameters, headers);
            if (result.IsSuccess)
            {
                value = JsonUtility.DeserializeObject<T>(result.Response);
            }
            return value;
        }

        public async Task<HttpResponseModel> GetAsync(string url, IDictionary<string, string> headers = null)
        {
            return await GetWithQueryParamsAsync(url, null, headers);
        }

        public async Task<HttpResponseModel> GetWithQueryParamsAsync(string url, IDictionary<string, string> queryParameters = null, IDictionary<string, string> headers = null)
        {
            HttpRequestModel httpRequest = new HttpRequestModel
            {
                RequestUrl = url,
                Headers = headers,
                QueryParameters = queryParameters,
                HttpMethod = HttpMethod.Get
            };

            return await SendAsync(httpRequest);
        }

        public async Task<HttpResponseModel> PostAsync(string url, object obj)
        {
            return await PostAsync(url, obj, null);
        }

        public async Task<HttpResponseModel> PostAsync(string url, object obj, IDictionary<string, string> headers)
        {
            string serializedString = JsonUtility.SerializeObject(obj);
            HttpContent httpContent = new StringContent(serializedString, Encoding.UTF8, "application/json");
            return await PostAsync(url, httpContent, headers);
        }

        public async Task<HttpResponseModel> PostAsync(string url, HttpContent content)
        {
            return await PostAsync(url, content, null);
        }

        public async Task<T> PostAsync<T>(string url, object obj)
        {
            return await PostAsync<T>(url, obj, null);
        }

        public async Task<T> PostAsync<T>(string url, object obj, IDictionary<string, string> headers)
        {
            T response = default;
            HttpResponseModel httpResponse = await PostAsync(url, obj);
            if (httpResponse.IsSuccess)
            {
                response = JsonUtility.DeserializeObject<T>(httpResponse.Response);
            }
            return response;
        }

        public async Task<HttpResponseModel> PostAsync(string url, HttpContent content, IDictionary<string, string> headers)
        {
            HttpRequestModel httpRequest = new HttpRequestModel
            {
                RequestUrl = url,
                Headers = headers,
                HttpMethod = HttpMethod.Post,
                HttpContent = content
            };

            return await SendAsync(httpRequest);
        }

        public async Task<HttpResponseModel> PutAsync<T>(string url, T obj)
        {
            return await PutAsync(url, obj, null);
        }

        public async Task<HttpResponseModel> PutAsync<T>(string url, T obj, IDictionary<string, string> headers)
        {
            string serializedString = JsonUtility.SerializeObject(obj);
            HttpContent httpContent = new StringContent(serializedString, Encoding.UTF8, "application/json");
            return await PutAsync(url, httpContent, headers);
        }

        public async Task<HttpResponseModel> PutAsync(string url, HttpContent content)
        {
            return await PutAsync(url, content, null);
        }

        public async Task<T> PutAsync<T>(string url, object obj)
        {
            return await PutAsync<T>(url, obj, null);
        }

        public async Task<T> PutAsync<T>(string url, object obj, IDictionary<string, string> headers)
        {
            T response = default;
            HttpResponseModel httpResponse = await PutAsync(url, obj);
            if (httpResponse.IsSuccess)
            {
                response = JsonUtility.DeserializeObject<T>(httpResponse.Response);
            }
            return response;
        }

        public async Task<HttpResponseModel> PutAsync(string url, HttpContent content, IDictionary<string, string> headers)
        {
            HttpRequestModel httpRequest = new HttpRequestModel
            {
                RequestUrl = url,
                Headers = headers,
                HttpMethod = HttpMethod.Put,
                HttpContent = content
            };

            return await SendAsync(httpRequest);
        }

        public async Task<T> DeleteAsync<T>(string url)
        {
            return await DeleteAsync<T>(url, null);
        }

        public async Task<T> DeleteAsync<T>(string url, IDictionary<string, string> headers)
        {
            T result = default;
            HttpResponseModel httpResponse = await DeleteAsync(url, headers);
            if (httpResponse.IsSuccess)
            {
                result = JsonUtility.DeserializeObject<T>(httpResponse.Response);
            }
            return result;
        }

        public async Task<HttpResponseModel> DeleteAsync(string url)
        {
            return await DeleteAsync(url, null);
        }

        public async Task<HttpResponseModel> DeleteAsync(string url, IDictionary<string, string> headers)
        {
            HttpRequestModel httpRequest = new HttpRequestModel
            {
                RequestUrl = url,
                Headers = headers,
                HttpMethod = HttpMethod.Delete,
            };

            return await SendAsync(httpRequest);
        }

    }

}
