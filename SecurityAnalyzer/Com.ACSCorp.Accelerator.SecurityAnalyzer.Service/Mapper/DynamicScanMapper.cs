using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service.Mapper
{
    public static class DynamicScanMapper
    {
        ///TODO: Need to move this mapping to the calling method as there no point of creating a mapper
        public static DynamicScanDTO ToDynamicScanDTO(this DynamicScanRequestDTO request)
        {
            var dynamicScanDTO = new DynamicScanDTO
            {
                CreatedById = request.UserId,
                IsDeleted = false,
                ProjectId = request.ProjectId,
                Url = request.Target,
                RunById = request.UserId,
                StatusId = (byte)DynamicScanStatusEnum.Started
            };
            return dynamicScanDTO;
        }
    }
}
