using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.OWASPAdapter.Mapper
{
    public static class CommonMapper
    {
        internal static void MapBaseEntityDetails<TSource>(TSource source, dynamic destination) where TSource : BaseDTO
        {
            destination.CreatedById = source.CreatedById;
            destination.CreatedOn = source.CreatedOn;
            destination.ModifiedById = source.ModifiedById;
            destination.ModifiedOn = source.ModifiedOn;
        }

        internal static void MapBaseDTODetails<TDestination>(dynamic source, TDestination destination) where TDestination : BaseDTO
        {
            destination.CreatedById = source.CreatedById;
            destination.CreatedOn = source.CreatedOn;
            destination.ModifiedById = source.ModifiedById;
            destination.ModifiedOn = source.ModifiedOn;
        }
    }
}
