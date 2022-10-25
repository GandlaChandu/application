using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.IService
{
    public interface IScanPolicyConfigService
    {
        public Task<Result<List<CategoryDTO>>> GetPoliciesByScanPolicyCodeAsync(string scanPolicyCode = null);
        public Task<Result<bool>> UpdatePolicyThresholdAsync(string scanPolicyCode, int policyId, ThresholdType thresholdType);
        public Task<Result<bool>> UpdatePolicyStrengthAsync(string scanPolicyCode, int policyId, StrengthType strengthType);
        public Task<Result<bool>> EnablePoliciesAsync(string scanPolicyCode, int[] policyIds);
        public Task<Result<List<ScannerDTO>>> GetScannersByPolicyIdAsync(string scanPolicyCode, int policyId);
        public Task<Result<bool>> UpdateScannerThresholdAsync(string scanPolicyCode, int id, ThresholdType thresholdType);
        public Task<Result<bool>> UpdateScannerStrengthAsync(string scanPolicyCode, int id, StrengthType strengthType);
        public Task<Result<bool>> DeleteScanPolicyAsync(string scanPolicyName);
    }
}
