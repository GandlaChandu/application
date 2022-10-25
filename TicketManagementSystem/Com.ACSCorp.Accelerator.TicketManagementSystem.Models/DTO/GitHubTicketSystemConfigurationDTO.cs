namespace Com.ACSCorp.Accelerator.TicketManagementSystem.Models.DTO
{
    public class GitHubTicketSystemConfigurationDTO : BaseTicketSystemModel
    {
        public bool IsTokenBased { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Owner { get; set; }
        public string Name { get; set; }
        public bool IsEnterpriseAccount { get; set; }
        public string EnterpriseUrl { get; set; }
    }
}
