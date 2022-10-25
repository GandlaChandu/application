using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;
using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class DivisionMapper
    {
        public static DivisionDTO ToDivisionDTO(this Division division)
        {
            if (division == null)
            {
                return null;
            }

            var divisionDTO = new DivisionDTO
            {
                Id = division.Id,
                ClientId = division.ClientId,
                Name = division.Name,
                IsActive = division.IsActive,
                IsDeleted = division.IsDeleted
            };

            CommonMapper.MapBaseDTODetails(division, divisionDTO);

            return divisionDTO;
        }

        public static Division ToDivisionEntity(this DivisionDTO divisionDTO)
        {
            Division division = new Division
            {
                Id = divisionDTO.Id,
                ClientId = divisionDTO.ClientId,
                Name = divisionDTO.Name,
                IsActive = divisionDTO.IsActive,
                IsDeleted = divisionDTO.IsDeleted
            };

            return division;
        }

        public static List<DivisionDTO> ToDivisionDTOList(this List<Division> divisions)
        {
            List<DivisionDTO> divisionDTOs = new List<DivisionDTO>();
            foreach (Division item in divisions)
            {
                divisionDTOs.Add(item.ToDivisionDTO());
            }
            return divisionDTOs;
        }
    }
}
