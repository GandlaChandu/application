using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service.StaticScanners
{
    public class BaseStaticScanner : IDisposable
    {
        protected ICMDService cMDService;
        private readonly ILogger<IStaticScan> _logger;
        public BaseStaticScanner(ICMDService _cMDService, ILogger<IStaticScan> logger)
        {
            cMDService = _cMDService;
            _logger = logger;
        }

        /// <summary>
        /// Run Command
        /// </summary>
        /// <param name="cmd"></param>
        public string RunCommand(string cmd)
        {
            CMDResult cMDResult = cMDService.ExecuteCommand(cmd);
            _logger.LogInformation($"Command: {cmd}");
            if (!string.IsNullOrWhiteSpace(cMDResult.ErrorResult))
            {
                throw new Exception(cMDResult.ErrorResult);
            }
            _logger.LogInformation($"Output: {cMDResult.OutputResult}");
            return cMDResult.OutputResult;
        }

        public string FindTaskId(string content)
        {
            string taskId = string.Empty;

            if (!string.IsNullOrWhiteSpace(content))
            {
                Regex linkParser = new Regex(@"\b(?:http?://|www\.)\S+\b", RegexOptions.Compiled | RegexOptions.IgnoreCase);
                Match matchedLink = linkParser.Matches(content).FirstOrDefault(linkMatch => linkMatch.Value.Contains("task?id"));
                if (matchedLink != null)
                {

                    taskId = HttpUtility.ParseQueryString(new Uri(matchedLink.Value).Query).Get("id");
                }
            }
            return taskId;
        }

        public void Dispose()
        {
            cMDService.Dispose();
        }
    }
}
