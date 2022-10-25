using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter.Mapper
{
    public static class ScannerMapper
    {
        public static ScannerDTO GetScannerDTO(this Scanner scanner)
        {
            ScannerDTO scannerDTO = new ScannerDTO
            {
                Id = scanner.Id,
                PolicyId = scanner.PolicyId,
                Name = scanner.Name,
                AlertThreshold = scanner.AlertThreshold,
                AttackStrength = scanner.AttackStrength,
                AlertThresholdValue = scanner.AlertThreshold.ToString(),
                AttackStrengthValue = scanner.AttackStrength.ToString(),
                Enabled = scanner.Enabled
            };

            return scannerDTO;
        }

        public static List<ScannerDTO> GetScannerDTOs(this List<Scanner> scanners)
        {
            List<ScannerDTO> scannerDTOs = new List<ScannerDTO>();
      
            foreach(Scanner scanner in scanners)
            {
                scannerDTOs.Add(scanner.GetScannerDTO());
            }

            return scannerDTOs;
        }
    }
}
