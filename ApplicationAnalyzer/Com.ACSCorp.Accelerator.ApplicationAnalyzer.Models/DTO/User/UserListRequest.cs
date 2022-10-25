using Com.ACSCorp.Accelerator.Core.Models;

namespace Com.ACSCorp.Accelerator.ApplicationAnalyzer.Models.DTO.User
{
    public class UserListRequest
    {
        public bool ExcludeInactive { get; set; }
        public ListParameter ListParameter { get; set; }
    }
}
