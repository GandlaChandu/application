using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.Core.Models
{
    public class ListResult<TEntity> where TEntity : class
    {
        public List<TEntity> Items { get; set; }
        public int Total { get; set; }
    }
}
