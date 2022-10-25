using Com.ACSCorp.Accelerator.Core.Models.DTO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO
{
    public class UserDTO : BaseDTO
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
