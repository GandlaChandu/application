using Com.ACSCorp.Accelerator.Core.Models.Email;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace Com.ACSCorp.Accelerator.Core.HttpService
{
    public class EmailNotificationService
    {
        /// <summary>
        /// sends email as per the configuration recieved in the request
        /// Configuration object ->
        /// {
        ///     "UserName": "string", -- smtp server user name
        ///     "Password": "string", -- smtp server password
        ///     "FromEmail": "string", -- from email address
        ///     "ToEmails": "comma seperated email address", -- to email addresses
        ///     "Subject": "string", -- email subject
        ///     "Body": "string", -- email body -- in case of html body, pass html as string
        ///     "Port": 0, -- smtp server port number
        ///     "Host": "string",  -- smtp server host name
        ///     "IsBodyHtml": false, -- is email body is html
        ///     "EnableSsl": false, -- is ssl enable for encryption
        ///     "UseDefaultCredentials": false -- should use default credentials for smtp server
        ///     "Attachments": null -- list of attachment files in bytes with filename
        /// }
        /// </summary>
        public static void Email(EmailConfigModel config)
        {
            try
            {
                using (SmtpClient smtp = new SmtpClient())
                {
                    MailMessage message = new MailMessage
                    {
                        From = new MailAddress(config.FromEmail),
                        Subject = config.Subject,
                        IsBodyHtml = config.IsBodyHtml,
                        Body = config.Body
                    };

                    var toEmails = config.ToEmails.Split(',').ToList();
                    toEmails.ForEach(x => message.To.Add(new MailAddress(x)));

                    if (config.Attachments != null && config.Attachments.Any())
                    {
                        config.Attachments.ForEach(x =>
                            message.Attachments.Add(new Attachment(new MemoryStream(x.FileBytes), x.FileName))
                        );
                    }

                    smtp.Port = config.Port;
                    smtp.Host = config.Host;
                    smtp.EnableSsl = config.EnableSsl;
                    smtp.UseDefaultCredentials = config.UseDefaultCredentials;
                    smtp.Credentials = new NetworkCredential(config.UserName, config.Password);
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                    smtp.Send(message);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
