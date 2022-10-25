using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class ScanPolicyConfigService : IScanPolicyConfigService
    {
        #region Variables

        private readonly OWASPAdapter.OWASPAdapter _adapter;

        #endregion Variables

        #region Constructors

        public ScanPolicyConfigService(IConfiguration configuration, ILoggerFactory loggerFactory)
        {
            _adapter = new OWASPAdapter.OWASPAdapter(configuration, loggerFactory.CreateLogger<OWASPAdapter.OWASPAdapter>());
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<List<CategoryDTO>>> GetPoliciesByScanPolicyCodeAsync(string scanPolicyCode = null)
        {
            List<CategoryDTO> policies = await _adapter.GetPoliciesByScanPolicyCodeAsync(scanPolicyCode);
            if (policies != null)
            {
                return Result.Ok(policies);
            }
            else
            {
                return Result.Fail<List<CategoryDTO>>(Messages.FailedGetPoliciesByScanPolicyCode);
            }
        }

        public async Task<Result<bool>> UpdatePolicyThresholdAsync(string scanPolicyCode, int policyId, ThresholdType thresholdType)
        {
            bool isUpdated = await _adapter.UpdatePolicyThresholdAsync(scanPolicyCode, policyId, thresholdType);
            if (isUpdated)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedUpdatePolicyThreshold);
            }
        }

        public async Task<Result<bool>> UpdatePolicyStrengthAsync(string scanPolicyCode, int policyId, StrengthType strengthType)
        {
            bool isUpdated = await _adapter.UpdatePolicyStrengthAsync(scanPolicyCode, policyId, strengthType);
            if (isUpdated)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedUpdatePolicyStrength);
            }
        }

        public async Task<Result<bool>> EnablePoliciesAsync(string scanPolicyCode, int[] policyIds)
        {
            bool isUpdated = await _adapter.EnablePoliciesAsync(scanPolicyCode, policyIds);
            if (isUpdated)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedEnablingPolicies);
            }
        }

        public async Task<Result<List<ScannerDTO>>> GetScannersByPolicyIdAsync(string scanPolicyCode, int policyId)
        {
            List<ScannerDTO> scanners = await _adapter.GetScannersByPolicyIdAsync(scanPolicyCode, policyId);
            if (scanners != null)
            {
                return Result.Ok(scanners);
            }
            else
            {
                return Result.Fail<List<ScannerDTO>>(Messages.NoScannersAvailableForPolicyId);
            }
        }

        public async Task<Result<bool>> UpdateScannerThresholdAsync(string scanPolicyCode, int id, ThresholdType thresholdType)
        {
            bool isUpdated = await _adapter.UpdateScannerThresholdAsync(scanPolicyCode, id, thresholdType);
            if (isUpdated)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedUpdateScannerThreshold);
            }
        }

        public async Task<Result<bool>> UpdateScannerStrengthAsync(string scanPolicyCode, int id, StrengthType strengthType)
        {
            bool isUpdated = await _adapter.UpdateScannerStrengthAsync(scanPolicyCode, id, strengthType);
            if (isUpdated)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedUpdateScannerStrenght);
            }
        }

        public async Task<Result<bool>> DeleteScanPolicyAsync(string scanPolicyCode)
        {
            bool isDeleted = await _adapter.DeleteScanPolicyAsync(scanPolicyCode);
            if (isDeleted)
            {
                return Result.Ok(true);
            }
            else
            {
                return Result.Fail<bool>(Messages.FailedDeleteScanPolicy);
            }
        }

        #endregion Public Methods
    }
}
