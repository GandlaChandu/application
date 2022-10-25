using Com.ACSCorp.Accelerator.Core.Models.DTO;
using System;

namespace Com.ACSCorp.Accelerator.Core.Repository.BaseRepository.Mapper
{
    public static class CommonMapper
    {
        public static void MapBaseEntityDetails<TSource>(TSource source, dynamic destination) where TSource : BaseDTO
        {
            destination.CreatedById = source.CreatedById;
            destination.CreatedOn = source.CreatedOn;
            destination.ModifiedById = source.ModifiedById;
            destination.ModifiedOn = source.ModifiedOn;
        }

        public static void MapBaseDTODetails<TDestination>(dynamic source, TDestination destination) where TDestination : BaseDTO
        {
            destination.CreatedById = source.CreatedById;
            destination.CreatedOn = source.CreatedOn;
            destination.ModifiedById = source.ModifiedById;
            destination.ModifiedOn = source.ModifiedOn;
        }

        public static void UpdateCreatedBy(this BaseDTO baseDTO)
        {
            if (baseDTO.Id > 0)
            {
                baseDTO.ModifiedById = 1;
                baseDTO.ModifiedOn = DateTime.UtcNow;
            }
            else
            {
                baseDTO.CreatedById = 1;
                baseDTO.CreatedOn = DateTime.UtcNow;
            }
        }
    }
}
