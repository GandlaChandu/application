using Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository.Models;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Repository
{
    public static class DynamicScanDetailsMapper
    {
        public static DynamicScanDetailsDTO ToDynamicScanDetailsDTO(this DynamicScanDetails entity)
        {
            if (entity == null)
            {
                return null;
            }

            var dynamicScanDetails = new DynamicScanDetailsDTO
            {
                Id = entity.Id,
                ProjectId = entity.ProjectId,
                ApplicationURL = entity.Url,
                UserName = entity.Username,
                Password = entity.Password,
                IsDeleted = entity.IsDeleted
            };

            CommonMapper.MapBaseDTODetails(entity, dynamicScanDetails);

            return dynamicScanDetails;
        }

        public static DynamicScanDetails ToDynamicScanDetailsEntity(this DynamicScanDetailsDTO scanDTO)
        {
            DynamicScanDetails dynamicScanDetails = new DynamicScanDetails
            {
                Id = scanDTO.Id,
                ProjectId = scanDTO.ProjectId,
                Url = scanDTO.ApplicationURL,
                Username = scanDTO.UserName,
                Password = scanDTO.Password,
                IsDeleted = scanDTO.IsDeleted
            };

            return dynamicScanDetails;
        }
    }
}
