using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using System.Threading.Tasks;
using System.Net.Http;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter.Mapper;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Microsoft.Extensions.Logging;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter
{
    public class OWASPAdapter
    {
        private const string _zapApiKeyParameterName = "apikey";
        private readonly ILogger<OWASPAdapter> _logger;

        public IConfiguration Configuration { get; set; }

        public OWASPAdapter(IConfiguration configuration, ILogger<OWASPAdapter> logger)
        {
            Configuration = configuration;
            _logger = logger;
        }

        #region Run scan

        #region Public Methods

        public async Task<Tuple<List<Alert>,int>> RunDynamicScanAsync(DynamicScanRequestDTO request)
        {
            Task<int> getSpiderScanUrlCountTask = RunAndGetSpiderScanUrlCount(request);
            Task<List<Alert>> getActiveScanAlertsTask = RunAndGetActiveScanAlerts(request);

            //TODO: If we don't move dynamic scan to cloud, then uncomment the following. 
            //      Ajax spider needs a browser which is not supported in cloud.
            //StartAjaxSpidering(request);
            //PollTheAjaxSpiderTillCompletion();

            int urlCount = await getSpiderScanUrlCountTask;
            List<Alert> alerts = await getActiveScanAlertsTask;

            return new Tuple<List<Alert>, int>(alerts, urlCount);

            async Task<int> RunAndGetSpiderScanUrlCount(DynamicScanRequestDTO request)
            {
                int spiderScanId = await StartSpideringAsync(request);
                if (spiderScanId > -1)
                {
                    await PollTheSpiderTillCompletionAsync(spiderScanId);
                }
                int urlCount = await GetUrlCount(spiderScanId);
                return urlCount;
            }

            async Task<List<Alert>> RunAndGetActiveScanAlerts(DynamicScanRequestDTO request)
            {
                int activeScanId = await StartActiveScanningAsync(request);
                if (activeScanId > -1)
                {
                    await PollTheActiveScannerTillCompletionAsync(activeScanId);
                }
                List<Alert> alerts = await GetAlertsToSendAsync(request);
                return alerts;
            }
        }

        #endregion

        #region Private Methods

        private async Task<int> GetUrlCount(int spiderScanId)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "scanId", spiderScanId.ToString() }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UrlCountBySpiderScanId, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            return JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync())?.Results.Count ?? 0;
        }

        private async Task<List<Alert>> GetAlertsToSendAsync(DynamicScanRequestDTO request)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "baseurl", request.Target },
                { "start", "0" },
                { "count", "0" },
                { "riskId", string.Empty }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.GetAlertsUrl, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            AlertList alerts = JsonConvert.DeserializeObject<AlertList>(await response.Content.ReadAsStringAsync());
            return alerts?.Alerts;
        }

        private async Task PollTheActiveScannerTillCompletionAsync(int activeScanId)
        {
            int i = 0;
            int activeScannerprogress;
            while (true)
            {
                await SleepAsync(300000); // 5 min
                Dictionary<string, string> parameters = new Dictionary<string, string>
                {
                    { "activeScanId", activeScanId.ToString() }
                };

                string url = BuildZapApiUrl(OwaspZapApiConstants.ActiveStatusUrl, parameters);
                HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
                response.EnsureSuccessStatusCode();

                activeScannerprogress = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Status;
                if (activeScannerprogress >= 100)
                    break;

                _logger.LogInformation($"OWASP ZAP Active Scanner ScanID: {activeScanId} status check count: {i++}");
            }
        }

        private async Task<int> StartActiveScanningAsync(DynamicScanRequestDTO request)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "url", request.Target }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.ActiveScanUrl, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            int activeScanId = Convert.ToInt32(JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Scan);
            _logger.LogInformation($"OWASP ZAP Active Scan Started ScanID: {activeScanId}");
            return activeScanId;
        }

        private async Task PollTheSpiderTillCompletionAsync(int scanid)
        {
            int i = 0;
            int spiderProgress;
            while (true)
            {
                await SleepAsync(60000); // 1 min
                Dictionary<string, string> parameters = new Dictionary<string, string>
                {
                    { "scanId", scanid.ToString() }
                };

                string url = BuildZapApiUrl(OwaspZapApiConstants.SpiderStatusUrl, parameters);
                HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
                response.EnsureSuccessStatusCode();

                spiderProgress = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Status;
                if (spiderProgress >= 100)
                    break;

                _logger.LogInformation($"OWASP ZAP Spider ScanID: {scanid} status check count: {i++}");
            }
        }

        private async Task<int> StartSpideringAsync(DynamicScanRequestDTO request)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "url", request.Target }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.SpiderScanUrl, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            int scanid = Convert.ToInt32(JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Scan);
            _logger.LogInformation($"OWASP ZAP Spider Started ScanID: {scanid}");
            return scanid;
        }

        private static async Task SleepAsync(int milliseconds)
        {
            await Task.Delay(milliseconds);
        }

        private string BuildZapApiUrl(string url, Dictionary<string, string> parameters)
        {
            UriBuilder uriBuilder = new UriBuilder
            {
                Scheme = Convert.ToString(Configuration["ZAPAPISettings:ZAPScheme"]),
                Host = Convert.ToString(Configuration["ZAPAPISettings:ZAPUrl"]),
                Port = Convert.ToInt32(Configuration["ZAPAPISettings:ZAPPort"]),

                Path = new StringBuilder()
                                    .Append("/")
                                    .Append(Configuration["ZAPAPISettings:ZAPApplicationName"])
                                    .Append(url)
                                    .ToString()
            };

            StringBuilder query = new StringBuilder();
            if (parameters != null)
            {
                query.Append(BuildApiQuery(parameters));
            }

            if (!string.IsNullOrWhiteSpace(Configuration["ZAPAPISettings:ZAPAPIKey"]))
            {
                Dictionary<string, string> apikeys = new Dictionary<string, string>
                {
                    { _zapApiKeyParameterName, Configuration["ZAPAPISettings:ZAPAPIKey"] }
                };
                query.Append(BuildApiQuery(apikeys));
            }


            uriBuilder.Query = query.ToString();

            return uriBuilder.Uri.ToString();
        }

        private string BuildApiQuery(Dictionary<string, string> parameters)
        {
            StringBuilder query = new StringBuilder();
            foreach (var parameter in parameters)
            {
                query.Append(Uri.EscapeDataString(parameter.Key));
                query.Append("=");
                query.Append(parameter.Value);
                query.Append("&");
            }
            return query.ToString();
        }

        #endregion

        #endregion

        #region Rule config

        #region Public Methods

        public async Task<List<ZapScanPolicy>> GetScanPolicyNamesAsync()
        {
            string url = BuildZapApiUrl(OwaspZapApiConstants.GetScanPolicyNames, null);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            ScanPolicyList scanPolicyList = JsonConvert.DeserializeObject<ScanPolicyList>(await response.Content.ReadAsStringAsync());

            if (scanPolicyList != null && scanPolicyList.ScanPolicyNames != null)
            {
                return scanPolicyList.ScanPolicyNames;
            }

            return null;
        }

        public async Task<bool> CreateScanPolicyAsync(ScanPolicyDTO scanPolicy)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "scanPolicyName", scanPolicy.ScanPolicyCode.ToString() },
                { "alertThreshold", scanPolicy.AlertThreshold.ToString() },
                { "attackStrength", scanPolicy.AttackStrength.ToString() }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.AddScanPolicy, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<bool> UpdateScanPolicyAsync(ScanPolicyDTO scanPolicy)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "scanPolicyName", scanPolicy.ScanPolicyCode.ToString() },
                { "alertThreshold", scanPolicy.AlertThreshold.ToString() },
                { "attackStrength", scanPolicy.AttackStrength.ToString() }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UpdateScanPolicy, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<List<Policy>> GetScanPoliciesAsync(string scanPolicyCode = null)
        {
            Dictionary<string, string> parameters = null;
            if (scanPolicyCode != null)
            {
                parameters = new Dictionary<string, string>
                {
                    { "scanPolicyName", scanPolicyCode }
                };
            }

            string url = BuildZapApiUrl(OwaspZapApiConstants.GetPolicies, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            PolicyList policyList = JsonConvert.DeserializeObject<PolicyList>(response.Content.ReadAsStringAsync().Result);

            if (policyList != null && policyList.Policies?.Count > 0)
            {
                return policyList.Policies;
            }

            return null;
        }

        public async Task<List<CategoryDTO>> GetPoliciesByScanPolicyCodeAsync(string scanPolicyName = null)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            if (scanPolicyName != null)
            {
                parameters.Add("scanPolicyName", scanPolicyName);
            }
            string url = BuildZapApiUrl(OwaspZapApiConstants.GetPoliciesByScanPolicyName, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            PolicyList policyList = JsonConvert.DeserializeObject<PolicyList>(await response.Content.ReadAsStringAsync());

            if (policyList != null && policyList.Policies?.Count > 0)
            {
                return policyList.Policies.GetPolicyDTOs();
            }

            return null;
        }

        public async Task<bool> UpdatePolicyThresholdAsync(string scanPolicyName, int policyId, ThresholdType thresholdType)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "id", policyId.ToString() },
                { "alertThreshold", thresholdType.ToString() },
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UpdatePolicyThreshold, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<bool> UpdatePolicyStrengthAsync(string scanPolicyName, int policyId, StrengthType strengthType)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "id", policyId.ToString() },
                { "attackStrength", strengthType.ToString() },
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UpdatePolicyStrength, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<bool> EnablePoliciesAsync(string scanPolicyName, int[] policyIds)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "ids", string.Join(',', policyIds) },
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.EnablePolicies, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }


        public async Task<List<ScannerDTO>> GetScannersByPolicyIdAsync(string scanPolicyName, int policyId)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "scanPolicyName", scanPolicyName },
                { "policyId", policyId.ToString() }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.GetScannersByPolicyId, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            ScannerList scanners = JsonConvert.DeserializeObject<ScannerList>(await response.Content.ReadAsStringAsync());

            if (scanners != null && scanners.Scanners != null)
            {
                return scanners.Scanners.GetScannerDTOs();
            }

            return null;
        }

        public async Task<bool> UpdateScannerThresholdAsync(string scanPolicyName, int id, ThresholdType thresholdType)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "id", id.ToString() },
                { "alertThreshold", thresholdType.ToString() },
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UpdateScannerThreshold, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<bool> UpdateScannerStrengthAsync(string scanPolicyName, int id, StrengthType strengthType)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "id", id.ToString() },
                { "attackStrength", strengthType.ToString() },
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.UpdateScannerStrength, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteScanPolicyAsync(string scanPolicyName)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>
            {
                { "scanPolicyName", scanPolicyName }
            };

            string url = BuildZapApiUrl(OwaspZapApiConstants.DeleteScanPolicy, parameters);
            HttpResponseMessage response = await WebUtility.HttpGetResponseAsync(url, null, null);
            response.EnsureSuccessStatusCode();

            string stringresponse = JsonConvert.DeserializeObject<ApiResponse>(await response.Content.ReadAsStringAsync()).Result;

            if (stringresponse.ToLower().Contains("ok"))
            {
                return true;
            }

            return false;
        }

        #endregion

        #endregion
    }
}
