using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.CweInfo;
using Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Models;

using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Repository.Mapper
{
    public static class CweInfoMapper
    {
        public static CweInfoDTO ToCweInfoDTO(this Cweinfo entity)
        {
            var cweInfoDTO = new CweInfoDTO
            {
                Category = entity.Category,
                CweId = entity.Cweid,
                Name = entity.Name,
                Description = entity.Description,
                Recommendation = entity.Recommendation
            };

            return cweInfoDTO;
        }

        public static List<CweInfoDTO> ToCweInfoDTOList(this List<Cweinfo> cweInfos)
        {
            var list = new List<CweInfoDTO>();

            foreach (var item in cweInfos)
            {
                list.Add(item.ToCweInfoDTO());
            }

            return list;
        }
    }
}
