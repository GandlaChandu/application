using Com.ACSCorp.Accelerator.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.Core.QueryUtility
{
    public static class QueryUtility<T> where T : class
    {
        public static async Task<ListResult<T>> GetQueryResultAsync(IQueryable<T> query, ListParameter listParameter)
        {
            ListResult<T> searchResult = new ListResult<T>();
            if (listParameter != null)
            {
                query = FilterUtility<T>.GetFilterResult(query, listParameter.Filter);

                query = SortUtility<T>.GetSortResult(query, listParameter.SortField);
            }

            searchResult.Total = await query.CountAsync();

            if (listParameter != null)
            {
                query = PaginatorUtility<T>.GetPageResult(query, listParameter.Pagination);
            }

            searchResult.Items = await query.ToListAsync();

            return searchResult;
        }

    }
}
