using Com.ACSCorp.Accelerator.Core.HttpService.Abstraction.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.HttpService.Abstraction
{
    public interface IHttpService
    {
        /// <summary>
        /// Form Url
        /// </summary>
        /// <param name="baseUrl"> base url</param>
        /// <param name="controllerName"> controller name </param>
        /// <param name="methodName"> method name </param>
        /// <returns></returns>
        public string FormUrl(string baseUrl, string controllerName, string methodName);
        /// <summary>
        /// Form Url
        /// </summary>
        /// <param name="controllerName"></param>
        /// <param name="methodName"></param>
        /// <returns></returns>
        public string FormUrl(string controllerName, string methodName);

        /// <summary>
        /// Get async
        /// </summary>
        /// <typeparam name="T"> type to return </typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="headers">headers to append</param>
        /// <returns></returns>
        public Task<T> GetAsync<T>(string url, IDictionary<string, string> headers = null);

        /// <summary>
        /// Get async
        /// </summary>
        /// <typeparam name="T">type T to return</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="queryParameters"></param>
        /// <param name="headers">headers to append</param>
        /// <returns>T</returns>
        public Task<T> GetWithQueryParamsAsync<T>(string url, IDictionary<string, string> queryParameters, IDictionary<string, string> headers = null);

        /// <summary>
        /// Get async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="headers">headers to append</param>
        /// <returns> HttpResponseModel </returns>
        public Task<HttpResponseModel> GetAsync(string url, IDictionary<string, string> headers = null);

        /// <summary>
        /// Get async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="queryParameters"></param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> GetWithQueryParamsAsync(string url, IDictionary<string, string> queryParameters, IDictionary<string, string> headers = null);

        /// <summary>
        /// Post async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="obj"></param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PostAsync(string url, object obj);

        /// <summary>
        /// Post async
        /// </summary>
        /// <typeparam name="T">type T to return</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to post</param>
        /// <returns>returns T</returns>
        public Task<T> PostAsync<T>(string url, object obj);

        /// <summary>
        /// Post async
        /// </summary>
        /// <typeparam name="T">type T to return</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to post</param>
        /// <param name="headers">headers to append</param>
        /// <returns></returns>
        public Task<T> PostAsync<T>(string url, object obj, IDictionary<string, string> headers);

        /// <summary>
        /// Post async
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to post</param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PostAsync(string url, object obj, IDictionary<string, string> headers);

        /// <summary>
        /// Post async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="content">http content to post</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PostAsync(string url, HttpContent content);

        /// <summary>
        /// Post async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="content">HttpContent</param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PostAsync(string url, HttpContent content, IDictionary<string, string> headers);

        /// <summary>
        /// Put async
        /// </summary>
        /// <typeparam name="T">type T to return</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to put</param>
        /// <returns>T</returns>
        public Task<T> PutAsync<T>(string url, object obj);

        /// <summary>
        /// Put async
        /// </summary>
        /// <typeparam name="T">type T to return</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to put</param>
        /// <param name="headers">headers to append</param>
        /// <returns>T</returns>
        public Task<T> PutAsync<T>(string url, object obj, IDictionary<string, string> headers);

        /// <summary>
        /// Put async
        /// </summary>
        /// <typeparam name="T">type T</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to put</param>
        /// <returns>T</returns>
        public Task<HttpResponseModel> PutAsync<T>(string url, T obj);

        /// <summary>
        /// Put async
        /// </summary>
        /// <typeparam name="T">type T</typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="obj">object to put</param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PutAsync<T>(string url, T obj, IDictionary<string, string> headers);

        /// <summary>
        /// Put async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="content">HttpContent</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PutAsync(string url, HttpContent content);

        /// <summary>
        /// Put async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="content">HttpContent</param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> PutAsync(string url, HttpContent content, IDictionary<string, string> headers);

        /// <summary>
        /// Delete async
        /// </summary>
        /// <typeparam name="T">type of T</typeparam>
        /// <param name="url">http/https url</param>
        /// <returns>T</returns>
        public Task<T> DeleteAsync<T>(string url);

        /// <summary>
        /// Delete async
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="url">http/https url</param>
        /// <param name="headers">headers to append</param>
        /// <returns>T</returns>
        public Task<T> DeleteAsync<T>(string url, IDictionary<string, string> headers);

        /// <summary>
        /// Delete async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> DeleteAsync(string url);

        /// <summary>
        /// Delete async
        /// </summary>
        /// <param name="url">http/https url</param>
        /// <param name="headers">headers to append</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> DeleteAsync(string url, IDictionary<string, string> headers);

        /// <summary>
        /// Send async
        /// </summary>
        /// <param name="httpRequest">HttpRequestModel</param>
        /// <returns>HttpResponseModel</returns>
        public Task<HttpResponseModel> SendAsync(HttpRequestModel httpRequest);
    }
}
