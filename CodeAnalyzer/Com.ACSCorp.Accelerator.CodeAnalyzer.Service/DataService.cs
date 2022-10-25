using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.SonarAdapter.Interfaces;
using Com.ACSCorp.Accelerator.Core.Models;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class DataService : IDataService
    {
        #region Variables

        private readonly ISonarQubeClient _sonarQubeClient;
        private readonly ILanguageService _languageService;
        
        #endregion Variables

        #region Constructor

        public DataService(ISonarQubeClient sonarQubeClient, ILanguageService languageService)
        {
            _sonarQubeClient = sonarQubeClient;
            _languageService = languageService;
        }

        #endregion Constructor

        #region Public methods

        public async Task<Result<ListResult<SonarRuleDTO>>> GetAllRulesAsync(RuleListRequestModel request)
        {
            Result<LanguageDTO> languageResult = await _languageService.GetLanguageByIdAsync(request.LanguageId);

            if (!languageResult.IsSucceeded)
            {
                return Result.Fail<ListResult<SonarRuleDTO>>(languageResult.GetErrorString());
            }

            RuleListRequestDTO ruleListRequestDTO = new RuleListRequestDTO
            {
                LanguageCode = languageResult.Value.Code,
                Severities = request.Severities,
                SonarSourceSecurities = request.SonarSourceSecurities,
                Pagination = request.Pagination
            };

            return await _sonarQubeClient.GetRulesAsync(ruleListRequestDTO);
        }

        public Result<List<KeyValuePair<string, string>>> GetAllSeverities()
        {
            List<KeyValuePair<string, string>> severities = new List<KeyValuePair<string, string>>
            {
                GetKeyValuePair("INFO", "INFO"),
                GetKeyValuePair("MINOR", "MINOR"),
                GetKeyValuePair("MAJOR", "MAJOR"),
                GetKeyValuePair("CRITICAL", "CRITICAL"),
                GetKeyValuePair("BLOCKER", "BLOCKER")
            };

            return Result.Ok(severities);
        }

        public Result<List<KeyValuePair<string, string>>> GetAllVulnerabilities()
        {
            List<KeyValuePair<string, string>> vulnerabilities = new List<KeyValuePair<string, string>>
            {
                GetKeyValuePair("sql-injection", "Sql Injection"),
                GetKeyValuePair("command-injection", "Command Injection"),
                GetKeyValuePair("path-traversal-injection", "Path Traversal Injection"),
                GetKeyValuePair("ldap-injection", "LDAP Injection"),
                GetKeyValuePair("xpath-injection", "XPath Injection"),
                GetKeyValuePair("rce", "RCE"),
                GetKeyValuePair("dos", "DOS"),
                GetKeyValuePair("ssrf", "SSRF"),
                GetKeyValuePair("csrf", "CSRF"),
                GetKeyValuePair("xss", "XSS"),
                GetKeyValuePair("log-injection", "Log Injection"),
                GetKeyValuePair("http-response-splitting", "Http Response Splitting"),
                GetKeyValuePair("open-redirect", "Open Redirect"),
                GetKeyValuePair("xxe", "XXE"),
                GetKeyValuePair("object-injection", "Object Injection"),
                GetKeyValuePair("weak-cryptography", "Weak Cryptography"),
                GetKeyValuePair("auth", "Auth"),
                GetKeyValuePair("insecure-conf", "insecure conf"),
                GetKeyValuePair("file-manipulation", "File Manipulation"),
                GetKeyValuePair("others", "Others")
            };

            return Result.Ok(vulnerabilities);
        }

        #endregion Public methods

        #region Private Methods

        private KeyValuePair<string, string> GetKeyValuePair(string key, string value)
        {
            return new KeyValuePair<string, string>(key, value);
        }

        #endregion Private Methods
    }
}
