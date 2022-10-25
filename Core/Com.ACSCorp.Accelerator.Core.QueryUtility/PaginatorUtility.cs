using Com.ACSCorp.Accelerator.Core.Models;
using System.Linq;

namespace Com.ACSCorp.Accelerator.Core.QueryUtility
{
    public static class PaginatorUtility<T> where T : class
    {
        public static IQueryable<T> GetPageResult(IQueryable<T> query, Pagination pagination)
        {
            if (pagination == null || pagination.PageNumber < 0 || pagination.PageSize <= 0)
            {
                return query;
            }

            query = query
                    .Skip((pagination.PageNumber - 1) * pagination.PageSize)
                    .Take(pagination.PageSize);

            return query;
        }
    }
}
