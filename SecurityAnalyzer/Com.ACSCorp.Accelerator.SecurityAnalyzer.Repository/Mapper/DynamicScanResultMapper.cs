using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.Core.Utility;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Mapper
{
    public static class DynamicScanResultMapper
    {
        public static List<DynamicScanResultDTO> ToDynamicScanResultDTOList(this List<DynamicScanResult> dynamicScanResultList)
        {
            List<DynamicScanResultDTO> dynamicScanResultDTOs = new List<DynamicScanResultDTO>();

            foreach (var entity in dynamicScanResultList)
            {

                dynamicScanResultDTOs.Add(entity.ToDynamicScanResultDTO());
            }

            return dynamicScanResultDTOs;
        }

        public static DynamicScanResultDTO ToDynamicScanResultDTO(this DynamicScanResult dynamicScanResult)
        {
            DynamicScanResultDTO dto = new DynamicScanResultDTO
            {
                Id = dynamicScanResult.Id,
                DynamicScanId = dynamicScanResult.DynamicScanId,
                AlertMessage = dynamicScanResult.AlertMessage,
                Attack = dynamicScanResult.Attack,
                Confidence = (ConfidenceLevel)dynamicScanResult.Confidence,
                CWEId = dynamicScanResult.Cweid ?? default,
                Description = dynamicScanResult.Description,
                Evidence = dynamicScanResult.Evidence,
                Other = dynamicScanResult.Other,
                Parameter = dynamicScanResult.Parameter,
                Reference = dynamicScanResult.Reference,
                Risk = (RiskLevel)dynamicScanResult.Risk,
                Solution = dynamicScanResult.Solution,
                Url = dynamicScanResult.Url,
                WASCId = dynamicScanResult.Wascid ?? default
            };

            CommonMapper.MapBaseDTODetails(dynamicScanResult, dto);
            dto.RiskLevel = dto.Risk.GetEnumDescription();
            dto.ConfidenceLevel = dto.Confidence.GetEnumDescription();

            return dto;
        }

        public static List<DynamicScanResult> ToDynamicScanResultList(this List<DynamicScanResultDTO> dynamicScanResultDTOs)
        {
            List<DynamicScanResult> dynamicScanResultList = new List<DynamicScanResult>();

            foreach (var entity in dynamicScanResultDTOs)
            {

                dynamicScanResultList.Add(entity.ToDynamicScanResult());
            }

            return dynamicScanResultList;
        }

        public static DynamicScanResult ToDynamicScanResult(this DynamicScanResultDTO dynamicScanResultDTO)
        {
            DynamicScanResult scanResult = new DynamicScanResult
            {
                Id = dynamicScanResultDTO.Id,
                DynamicScanId = dynamicScanResultDTO.DynamicScanId,
                AlertMessage = dynamicScanResultDTO.AlertMessage,
                Risk = (byte)dynamicScanResultDTO.Risk,
                Confidence = (byte)dynamicScanResultDTO.Confidence,
                Url = dynamicScanResultDTO.Url,
                Other = dynamicScanResultDTO.Other,
                Parameter = dynamicScanResultDTO.Parameter,
                Attack = dynamicScanResultDTO.Attack,
                Evidence = dynamicScanResultDTO.Evidence,
                Description = dynamicScanResultDTO.Description,
                Reference = dynamicScanResultDTO.Reference,
                Solution = dynamicScanResultDTO.Solution,
                Cweid = dynamicScanResultDTO.CWEId,
                Wascid = dynamicScanResultDTO.WASCId
            };

            return scanResult;
        }
    }
}
