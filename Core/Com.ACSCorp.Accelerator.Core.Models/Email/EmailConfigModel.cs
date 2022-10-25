using System.Collections.Generic;
using System.ComponentModel;

namespace Com.ACSCorp.Accelerator.Core.Models.Email
{
    public class EmailConfigModel
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string FromEmail { get; set; }

        public string ToEmails { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }

        public int Port { get; set; }

        public string Host { get; set; }

        [DefaultValue(false)]
        public bool IsBodyHtml { get; set; }

        [DefaultValue(false)]
        public bool EnableSsl { get; set; }

        [DefaultValue(false)]
        public bool UseDefaultCredentials { get; set; }

        public List<AttachmentFile> Attachments { get; set; }
    }
}
