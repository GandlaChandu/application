using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Com.ACSCorp.Accelerator.QueueAPI.Repository.Models
{
    [Table("QueueAPI")]
    public partial class QueueAPIEntity
    {
        public long Id { get; set; }
        public short Status { get; set; }
        public string Uri { get; set; }
        public string Headers { get; set; }
        public short HttpType { get; set; }
        public string Content { get; set; }
        public int ResponseStatusCode { get; set; }
        public string Message { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int? ModifiedById { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
