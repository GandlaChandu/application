using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.IService
{
    public interface IDataService
    {
        /// <summary>
        /// Get all severities
        /// </summary>
        /// <returns></returns>
        public Result<List<KeyValuePair<string, string>>> GetAllSeverities();

        /// <summary>
        /// Get all vulnerabilities
        /// </summary>
        /// <returns></returns>
        public Result<List<KeyValuePair<string, string>>> GetAllVulnerabilities();

        /// <summary>
        /// Get all rules
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public Task<Result<ListResult<SonarRuleDTO>>> GetAllRulesAsync(RuleListRequestModel request);
    }
}
