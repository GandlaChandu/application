using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper
{
    public static class StaticScanMapper
    {
        public static StaticScan ToStaticScanEntity(this StaticScanDTO staticScanDTO)
        {
            if (staticScanDTO == null)
            {
                return null;
            }

            StaticScan staticScan = new StaticScan
            {
                Id = staticScanDTO.Id,
                ProjectId = staticScanDTO.ProjectId,
                ProjectStaticScanDetailsId = staticScanDTO.ProjectStaticScanDetailsId,
                SonarQubeAnalysisTaskId = staticScanDTO.SonarQubeAnalysisTaskId,
                Url = staticScanDTO.Url,
                Username = staticScanDTO.Username,
                Password = staticScanDTO.Password,
                RunById = staticScanDTO.RunById,
                StatusId = staticScanDTO.StatusId,
                StartTime = staticScanDTO.StartTime,
                EndTime = staticScanDTO.EndTime,
                IsDeleted = staticScanDTO.IsDeleted
            };

            return staticScan;
        }

        public static StaticScanDTO ToStaticScanDTO(this StaticScan staticScan)
        {
            if (staticScan == null)
            {
                return null;
            }

            StaticScanDTO staticScanDTO = new StaticScanDTO
            {
                Id = staticScan.Id,
                ProjectId = staticScan.ProjectId,
                ProjectStaticScanDetailsId = staticScan.ProjectStaticScanDetailsId,
                SonarQubeAnalysisTaskId = staticScan.SonarQubeAnalysisTaskId,
                Url = staticScan.Url,
                Username = staticScan.Username,
                Password = staticScan.Password,
                RunById = staticScan.RunById,
                StatusId = staticScan.StatusId,
                Status = staticScan.Status?.Name,
                StartTime = staticScan.StartTime,
                EndTime = staticScan.EndTime,
                CreatedById = staticScan.CreatedById,
                CreatedOn = staticScan.CreatedOn,
                ModifiedOn = staticScan.ModifiedOn,
                ModifiedById = staticScan.ModifiedById,
                IsDeleted = staticScan.IsDeleted
            };

            return staticScanDTO;
        }

        public static List<StaticScanDTO> ToStaticScanDTOList(this List<StaticScan> staticScans)
        {
            if (staticScans == null)
            {
                return null;
            }

            List<StaticScanDTO> staticScanDTOs = new List<StaticScanDTO>();

            foreach (StaticScan staticScan in staticScans)
            {
                staticScanDTOs.Add(staticScan.ToStaticScanDTO());
            }

            return staticScanDTOs;
        }
    }
}
