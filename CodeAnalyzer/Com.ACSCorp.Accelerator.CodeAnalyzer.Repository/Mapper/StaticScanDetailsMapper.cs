using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Repository.Mapper
{
    public static class StaticScanDetailsMapper
    {
        public static StaticScanDetailsDTO ToStaticScanDetailsDTO(this StaticScanDetails entity)
        {
            if (entity == null)
            {
                return null;
            }

            var staticScanDetails = new StaticScanDetailsDTO
            {
                Id = entity.Id,
                ProjectId = entity.ProjectId,
                CodeOrCodeURL = entity.Url,
                UserName = entity.Username,
                Password = entity.Password,
                IsTokenBased = string.IsNullOrWhiteSpace(entity.Password),
                SourceCodeType = (SourceCodeType)entity.SourceCodeType,
                SourceControlType = (SourceControlType)entity.SourceControlType,
                IsDeleted = entity.IsDeleted,
                ProjectPath = entity.ProjectPath,
            };

            CommonMapper.MapBaseDTODetails(entity, staticScanDetails);

            if (entity.StaticScanType != null && entity.StaticScanType.Count > 0)
            {
                staticScanDetails.StaticScanPreferences = entity.StaticScanType.ToStaticScanTypeDTOList();
            }

            return staticScanDetails;
        }

        public static StaticScanDetails ToStaticScanDetailsEntity(this StaticScanDetailsDTO scanDTO)
        {
            StaticScanDetails staticScanDetails = new StaticScanDetails
            {
                Id = scanDTO.Id,
                ProjectId = scanDTO.ProjectId,
                Url = scanDTO.CodeOrCodeURL,
                Username = scanDTO.UserName,
                Password = scanDTO.IsTokenBased ? string.Empty : scanDTO.Password,
                SourceCodeType = (short)scanDTO.SourceCodeType,
                SourceControlType = (short)scanDTO.SourceControlType,
                IsDeleted = scanDTO.IsDeleted,
                ProjectPath = scanDTO.ProjectPath,
            };

            return staticScanDetails;
        }

        #region Static Scan Type

        public static List<StaticScanType> ToStaticScanTypeEntityList(this List<StaticScanTypeDTO> staticScanTypeDTOs)
        {
            var staticScanTypes = new List<StaticScanType>();

            foreach (var staticScanType in staticScanTypeDTOs)
            {
                staticScanTypes.Add(staticScanType.ToStaticScanTypeEntity());
            }

            return staticScanTypes;
        }

        public static List<StaticScanTypeDTO> ToStaticScanTypeDTOList(this ICollection<StaticScanType> staticScanTypes)
        {
            var result = new List<StaticScanTypeDTO>();
            foreach (var staticScanType in staticScanTypes)
            {
                if (!staticScanType.IsDeleted)
                {
                    StaticScanTypeDTO staticScanTypeDTO = staticScanType.ToStaticScanTypeDTO();
                    result.Add(staticScanTypeDTO);
                }
            }

            return result;
        }

        public static StaticScanTypeDTO ToStaticScanTypeDTO(this StaticScanType entity)
        {
            var staticScanTypeDTO = new StaticScanTypeDTO
            {
                Id = entity.Id,
                StaticScanDetailsId = entity.StaticScanDetailsId,
                StaticScanTypeId = entity.StaticScanTypeId,
                IsDeleted = entity.IsDeleted
            };

            CommonMapper.MapBaseDTODetails(entity, staticScanTypeDTO);

            return staticScanTypeDTO;
        }

        public static StaticScanType ToStaticScanTypeEntity(this StaticScanTypeDTO staticScanTypeDTO)
        {
            StaticScanType staticScanType = new StaticScanType
            {
                Id = staticScanTypeDTO.Id,
                StaticScanDetailsId = staticScanTypeDTO.StaticScanDetailsId,
                StaticScanTypeId = staticScanTypeDTO.StaticScanTypeId,
                IsDeleted = staticScanTypeDTO.IsDeleted
            };

            return staticScanType;
        }

        #endregion Static Scan Type
    }
}
