namespace Com.ACSCorp.Accelerator.Core.Models.Authorization
{
    public class LoginSettings
    {
        public long ClientUId { get; set; }
        public string TokenValidationUrl { get; set; }
        public string TokenClaimsUrl { get; set; }
    }
}
