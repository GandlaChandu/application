

using Com.ACSCorp.Accelerator.Core.Models.DTO;

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
    }
}
