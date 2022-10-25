using Com.ACSCorp.Accelerator.Core.Models.Enums;

using System.ComponentModel.DataAnnotations;

namespace Com.ACSCorp.Accelerator.QueueAPI.Models
{
    public class EnqueAPIModel
    {
        [Url]
        [Required(ErrorMessage = "Uri is required.")]
        public string Uri { get; set; }
        public string Headers { get; set; }
        [EnumDataType(typeof(HttpMethodType), ErrorMessage = "Invalid Http type")]
        public HttpMethodType HttpType { get; set; }
        public string Content { get; set; }
    }
}
