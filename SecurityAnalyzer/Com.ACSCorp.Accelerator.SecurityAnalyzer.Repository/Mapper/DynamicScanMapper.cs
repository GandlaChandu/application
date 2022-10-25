using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper
{
    public static class DynamicScanMapper
    {
        public static List<DynamicScanDTO> ToDynamicScanDTOList(this List<DynamicScan> scanList)
        {
            List<DynamicScanDTO> dtoList = new List<DynamicScanDTO>();
            foreach (var entity in scanList)
            {
                dtoList.Add(entity.ToDynamicScanDTO());
            }
            return dtoList;
        }

        public static DynamicScanDTO ToDynamicScanDTO(this DynamicScan scan)
        {
            DynamicScanDTO dto = new DynamicScanDTO();
            if (scan != null)
            {
                dto.Id = scan.Id;
                dto.IsDeleted = scan.IsDeleted;
                dto.ProjectId = scan.ProjectId;
                dto.RunById = scan.RunById;
                dto.Status = scan.Status?.Name;
                dto.StatusId = scan.StatusId;
                dto.Url = scan.Url;
                dto.UrlCount = scan.UrlCount ?? default;
                dto.ScanStartTime = scan.ScanStartTime;
                dto.ScanEndTime = scan.ScanEndTime;

                CommonMapper.MapBaseDTODetails(scan, dto);
            }

            return dto;
        }

        public static DynamicScan ToDynamicScan(this DynamicScanDTO dynamicScanDTO)
        {
            var scan = new DynamicScan
            {
                Id = dynamicScanDTO.Id,
                ProjectId = dynamicScanDTO.ProjectId,
                StatusId = dynamicScanDTO.StatusId,
                IsDeleted = dynamicScanDTO.IsDeleted,
                Url = dynamicScanDTO.Url,
                RunById = dynamicScanDTO.RunById,
                ScanStartTime = dynamicScanDTO.ScanStartTime,
                ScanEndTime = dynamicScanDTO.ScanEndTime,
                UrlCount = dynamicScanDTO.UrlCount
            };

            return scan;
        }
    }
}
