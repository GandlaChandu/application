using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IRepository;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class ScanPolicyService : IScanPolicyService
    {
        #region Variables

        private readonly OWASPAdapter.OWASPAdapter _adapter;
        private readonly IScanPolicyRepository _scanPolicyRepository;
        private readonly IScanPolicyMappingRepository _scanPolicyMappingRepository;
        private readonly ILogger<ScanPolicyService> _logger;

        #endregion Variables

        #region Constructors

        public ScanPolicyService(
            IConfiguration configuration,
            IScanPolicyRepository scanPolicyRepository,
            IScanPolicyMappingRepository scanPolicyMappingRepository,
            ILogger<ScanPolicyService> logger,
            ILoggerFactory loggerFactory)
        {
            _scanPolicyRepository = scanPolicyRepository;
            _scanPolicyMappingRepository = scanPolicyMappingRepository;
            _adapter = new OWASPAdapter.OWASPAdapter(configuration, loggerFactory.CreateLogger<OWASPAdapter.OWASPAdapter>());
            _logger = logger;
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result<int>> CreateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO)
        {
            scanPolicyDTO.ScanPolicyCode = Guid.NewGuid();

            bool isCreated = await _adapter.CreateScanPolicyAsync(scanPolicyDTO);

            if (isCreated)
            {
                int scanPolicyId = await _scanPolicyRepository.CreateScanPolicyAsync(scanPolicyDTO);
                return Result.Ok(scanPolicyId);
            }
            return Result.Fail<int>(Messages.CreateScanPolicyFailed);
        }

        public async Task<Result<int>> UpdateScanPolicyAsync(ScanPolicyDTO scanPolicyDTO)
        {
            ScanPolicyDTO scanPolicy = await _scanPolicyRepository.GetScanPolicyByIdAsync(scanPolicyDTO.Id);
            scanPolicyDTO.ScanPolicyCode = scanPolicy.ScanPolicyCode;

            bool isUpdated = await _adapter.UpdateScanPolicyAsync(scanPolicyDTO);

            if (isUpdated)
            {
                int scanPolicyId = await _scanPolicyRepository.UpdateScanPolicyAsync(scanPolicyDTO);
                return Result.Ok(scanPolicyId);
            }
            return Result.Fail<int>(Messages.UpdateScanPolicyFailed);
        }

        public async Task<Result<ListResult<ScanPolicyDTO>>> GetScanPoliciesAsync(ListParameter searchParameter = null)
        {
            ListResult<ScanPolicyDTO> scanPolicyNames = await _scanPolicyRepository.GetScanPoliciesAsync(searchParameter);

            if (scanPolicyNames.Items != null && scanPolicyNames.Items.Count > 0)
            {
                List<ZapScanPolicy> scanPolicies = await _adapter.GetScanPolicyNamesAsync();
                foreach (ScanPolicyDTO scanPolicyDTO in scanPolicyNames.Items)
                {
                    ZapScanPolicy scanPolicy = scanPolicies.FirstOrDefault(s => s.Name == scanPolicyDTO.ScanPolicyCode.ToString());
                    if (scanPolicy != null)
                    {
                        scanPolicyDTO.AttackStrength = scanPolicy.AttackStrength;
                        scanPolicyDTO.AlertThreshold = scanPolicy.AlertThreshold;
                        scanPolicyDTO.AttackStrengthValue = scanPolicy.AttackStrength.ToString();
                        scanPolicyDTO.AlertThresholdValue = scanPolicy.AlertThreshold.ToString();
                    }
                    else
                    {
                        scanPolicyDTO.AttackStrength = StrengthType.DEFAULT;
                        scanPolicyDTO.AlertThreshold = ThresholdType.DEFAULT;
                        scanPolicyDTO.AttackStrengthValue = StrengthType.DEFAULT.ToString();
                        scanPolicyDTO.AlertThresholdValue = ThresholdType.DEFAULT.ToString();
                    }
                }
            }
            return Result.Ok(scanPolicyNames);
        }

        public async Task<Result<ScanPolicyDTO>> GetScanPolicyByIdAsync(int scanPolicyId)
        {
            ScanPolicyDTO scanPolicy = await _scanPolicyRepository.GetScanPolicyByIdAsync(scanPolicyId);
            List<ZapScanPolicy> zapScanPolicies = await _adapter.GetScanPolicyNamesAsync();
            if (zapScanPolicies != null && scanPolicy != null)
            {
                ZapScanPolicy zapScanPolicy = zapScanPolicies.FirstOrDefault(s => s.Name == scanPolicy.ScanPolicyCode.ToString());
                if (zapScanPolicy != null)
                {
                    scanPolicy.AttackStrength = zapScanPolicy.AttackStrength;
                    scanPolicy.AttackStrengthValue = zapScanPolicy.AttackStrength.ToString();
                    scanPolicy.AlertThreshold = zapScanPolicy.AlertThreshold;
                    scanPolicy.AlertThresholdValue = zapScanPolicy.AlertThreshold.ToString();
                }
            }

            return Result.Ok(scanPolicy);
        }

        public Result<List<IdNamePair>> GetScanPolicyNames()
        {
            List<IdNamePair> scanPolicies = _scanPolicyRepository.GetScanPolicyNames();
            return Result.Ok(scanPolicies);
        }

        public Result<List<IdNamePair>> GetScanPoliciesByEntityId(short entityTypeId, int entityId)
        {
            List<IdNamePair> scanPolicies = _scanPolicyRepository.GetScanPoliciesByEntityId(entityTypeId, entityId);
            return Result.Ok(scanPolicies);
        }

        public Result<List<IdNamePair>> GetScanPolicyThresholdTypes()
        {
            List<IdNamePair> list = new List<IdNamePair>();
            List<ThresholdType> thresholdTypes = Enum.GetValues(typeof(ThresholdType)).Cast<ThresholdType>().ToList();
            foreach (var type in thresholdTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)type,
                    Name = type.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        public Result<List<IdNamePair>> GetScanPolicyStrengthTypes()
        {
            List<IdNamePair> list = new List<IdNamePair>();
            List<StrengthType> strengthTypes = Enum.GetValues(typeof(StrengthType)).Cast<StrengthType>().ToList();
            foreach (var type in strengthTypes)
            {
                list.Add(new IdNamePair
                {
                    Id = (int)type,
                    Name = type.GetEnumDescription()
                });
            }
            return Result.Ok(list);
        }

        public async Task<Result<int>> SaveScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMappingDTO scanPolicyMappingDTO = await _scanPolicyMappingRepository.GetScanPolicyMappingByEntityIdAsync(scanPolicyMapping.EntityTypeId, scanPolicyMapping.EntityId);

            if (scanPolicyMappingDTO != null)
            {
                return Result.Fail<int>(Messages.ScanPolicyMappingExistsForProject);
            }

            int mapId = await _scanPolicyMappingRepository.SaveScanPolicyMappingAsync(scanPolicyMapping);
            if (mapId > 0)
            {
                return Result.Ok(mapId);
            }
            else
            {
                return Result.Fail<int>(Messages.CreateScanPolicyMappingFailed);
            }
        }

        public async Task<Result<int>> UpdateScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMappingDTO scanPolicyMappingDTO = await _scanPolicyMappingRepository.GetScanPolicyMappingByEntityIdAsync(scanPolicyMapping.EntityTypeId, scanPolicyMapping.EntityId);

            if (scanPolicyMappingDTO == null)
            {
                return Result.Fail<int>(Messages.InvalidScanPolicyMappingDetails);
            }

            scanPolicyMappingDTO.ScanPolicyId = scanPolicyMapping.ScanPolicyId;

            int mapId = await _scanPolicyMappingRepository.UpdateScanPolicyMappingAsync(scanPolicyMappingDTO);

            if (mapId > 0)
            {
                return Result.Ok(mapId);
            }
            else
            {
                return Result.Fail<int>(Messages.UpdateScanPolicyMappingFailed);
            }
        }

        /// <summary>
        /// DeleteScanPolicyMappingByIdAsync
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Result<bool>> DeleteScanPolicyMappingByIdAsync(int id)
        {
            ScanPolicyMappingDTO scanPolicyMappingDTO = await _scanPolicyMappingRepository.GetScanPolicyMappingByIdAsync(id);
            try
            {
                if (scanPolicyMappingDTO == null)
                {
                    return Result.Fail<bool>(Messages.ScanPolicyMappingDetailsNotFound);
                }

                scanPolicyMappingDTO.IsDeleted = true;
                int result = await _scanPolicyMappingRepository.UpdateScanPolicyMappingAsync(scanPolicyMappingDTO);

                return Result.Ok(result > 0);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.ScanPolicyMappingUpdateFail);
                return Result.Fail<bool>(Messages.ScanPolicyMappingUpdateFail);
            }
        }

        /// <summary>
        /// Soft delete ScanPolicyMapping By EntityId ScanPolicyId
        /// </summary>
        /// <param name="scanPolicyMapping"></param>
        /// <returns></returns>
        public async Task<Result<bool>> DeleteScanPolicyMappingAsync(ScanPolicyMappingDTO scanPolicyMapping)
        {
            ScanPolicyMappingDTO scanPolicyMappingDTO = await _scanPolicyMappingRepository.GetScanPolicyMappingByEntityIdScanPolicyIdAsync(scanPolicyMapping);
            if (scanPolicyMappingDTO == null)
            {
                return Result.Fail<bool>(Messages.ScanPolicyMappingDetailsNotFound);
            }

            try
            {
                scanPolicyMappingDTO.IsDeleted = true;

                int result = await _scanPolicyMappingRepository.UpdateScanPolicyMappingAsync(scanPolicyMappingDTO);

                return Result.Ok(result > 0);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.ScanPolicyMappingDeleteFail);
                return Result.Fail<bool>(Messages.ScanPolicyMappingDeleteFail);
            }
        }

        #endregion Public Methods
    }
}
