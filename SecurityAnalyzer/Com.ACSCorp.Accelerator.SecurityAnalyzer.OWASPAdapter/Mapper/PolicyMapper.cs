using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using System;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter.Mapper
{
    public static class PolicyMapper
    {
        public static CategoryDTO GetPolicyDTO(this Policy policy)
        {
            Enum.TryParse(policy.AlertThreshold, out ThresholdType thresholdType);
            Enum.TryParse(policy.AttackStrength, out StrengthType strengthType);

            CategoryDTO categoryDTO = new CategoryDTO
            {
                Id = policy.Id,
                Name = policy.Name,
                AlertThreshold = thresholdType,
                AttackStrength = strengthType,
                AlertThresholdValue = policy.AlertThreshold,
                AttackStrengthValue = policy.AttackStrength,
                Enabled = policy.Enabled
            };

            return categoryDTO;
        }

        public static List<CategoryDTO> GetPolicyDTOs(this List<Policy> policies)
        {
            List<CategoryDTO> policyDTOs = new List<CategoryDTO>();
            foreach (Policy policy in policies)
            {
                policyDTOs.Add(policy.GetPolicyDTO());
            }
            return policyDTOs;
        }
    }
}
