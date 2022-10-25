using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using System;
using System.Collections.Generic;

using CoreEnums = Com.ACSCorp.Accelerator.Core.Models.Enums;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper
{
    public static class ScanPolicyMapper
    {
        public static List<ScanPolicyDTO> ToScanPolicyDTOs(this List<ScanPolicy> scanPolicies)
        {
            List<ScanPolicyDTO> scanPoliciesDTOs = new List<ScanPolicyDTO>();
            foreach (ScanPolicy scanPolicy in scanPolicies)
            {
                scanPoliciesDTOs.Add(scanPolicy?.ToScanPolicyDTO());
            }
            return scanPoliciesDTOs;
        }

        public static ScanPolicyDTO ToScanPolicyDTO(this ScanPolicy scanPolicy)
        {
            ScanPolicyDTO scanPolicyDTO = new ScanPolicyDTO
            {
                Id = scanPolicy.Id,
                Name = scanPolicy.ScanPolicyName,
                ScanPolicyCode = scanPolicy.ScanPolicyCode ?? Guid.Empty,
                IsDeleted = scanPolicy.IsDeleted
            };
            CommonMapper.MapBaseDTODetails(scanPolicy, scanPolicyDTO);

            return scanPolicyDTO;
        }

        public static ScanPolicy ToScanPolicyEntity(this ScanPolicyDTO scanPolicyDTO)
        {
            ScanPolicy scanPolicy = new ScanPolicy
            {
                Id = scanPolicyDTO.Id,
                ScanPolicyName = scanPolicyDTO.Name,
                ScanPolicyCode = scanPolicyDTO.ScanPolicyCode,
                ClientId = scanPolicyDTO.ClientId,
                IsDeleted = scanPolicyDTO.IsDeleted
            };

            return scanPolicy;
        }

        public static ScanPolicyMapping ToScanPolicyMappingEntity(this ScanPolicyMappingDTO policyMappingDTO)
        {
            ScanPolicyMapping scanPolicyMapping = new ScanPolicyMapping
            {
                Id = policyMappingDTO.Id,
                ScanPolicyId = policyMappingDTO.ScanPolicyId,
                EntityTypeId = Convert.ToInt16(policyMappingDTO.EntityTypeId),
                EntityId = policyMappingDTO.EntityId,
                IsDeleted = policyMappingDTO.IsDeleted
            };

            return scanPolicyMapping;
        }

        public static ScanPolicyMappingDTO ToScanPolicyMappingDTO(this ScanPolicyMapping policyMapping)
        {
            ScanPolicyMappingDTO scanPolicyMappingDTO = new ScanPolicyMappingDTO
            {
                Id = policyMapping.Id,
                ScanPolicyId = policyMapping.ScanPolicyId,
                EntityTypeId = (CoreEnums.EntityType)policyMapping.EntityTypeId,
                EntityId = policyMapping.EntityId,
                IsDeleted = policyMapping.IsDeleted
            };
            CommonMapper.MapBaseDTODetails(policyMapping, scanPolicyMappingDTO);

            return scanPolicyMappingDTO;
        }
    }
}
