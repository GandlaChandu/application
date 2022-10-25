using Com.ACSCorp.Accelerator.CodeAnalyzer.Common;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService;
using Com.ACSCorp.Accelerator.CodeAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.Core.HttpService;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Authorization;
using Com.ACSCorp.Accelerator.Core.Models.Email;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Service
{
    public class StaticScanEmailService : IStaticScanEmailService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IStaticScanReportService _staticScanReportService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IRenderTemplate _renderTemplate;
        private readonly EmailSettings emailSettings = new EmailSettings();

        #endregion Variables

        #region Constructors

        public StaticScanEmailService(
            ILogger<StaticScanEmailService> logger,
            IStaticScanReportService staticScanReportService,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IRenderTemplate renderTemplate,
            IConfiguration configuration)
        {
            _logger = logger;
            _staticScanReportService = staticScanReportService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _renderTemplate = renderTemplate;
            configuration.Bind("SmtpDetail", emailSettings);
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result> SendEmail(StaticScanDTO staticScanDTO, ProjectDTO project)
        {
            var staticScanEmailModelResult = await PrepareEmailBody(staticScanDTO.RunById, project);

            if (!staticScanEmailModelResult.IsSucceeded)
            {
                _logger.LogError(staticScanEmailModelResult.GetErrorString());
                return Result.Fail(staticScanEmailModelResult.GetErrorString());
            }

            var attachmentsResult = await GetAttachments(staticScanDTO.Id);

            if (!attachmentsResult.IsSucceeded)
            {
                _logger.LogError(attachmentsResult.GetErrorString());
                return Result.Fail(attachmentsResult.GetErrorString());
            }
            List<AttachmentFile> attachments = attachmentsResult.Value;

            EmailConfigModel emailConfigModel = MapEmailConfiguration(project.Name, staticScanEmailModelResult.Value, attachments);
            try
            {
                EmailNotificationService.Email(emailConfigModel);
                return Result.Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.EmailSendFail);
                return Result.Fail(Messages.EmailSendFail);
            }
        }

        #endregion Public Methods

        #region Private Methods

        private async Task<Result<EmailModel>> PrepareEmailBody(int runById, ProjectDTO projectDTO)
        {
            EmailModel emailModel = new EmailModel();
            try
            {
                CurrentUserDTO userDTO = await _applicationAnalyzerClient.GetUserAsync(runById);

                if (userDTO == null)
                {
                    return Result.Fail<EmailModel>(Messages.UserNotFound);
                }

                EmailBodyModel bodyModel = new EmailBodyModel
                {
                    UserName = userDTO.FirstName + " " + userDTO.LastName,
                    ClientName = projectDTO.ClientName,
                    ProjectName = projectDTO.Name
                };
                string documentContent = await _renderTemplate.RenderTemplateAsync(Constants.StaticScanEmailConstants.StaticScanEmailBodyTemplate, bodyModel);
                emailModel.Body = documentContent;
                emailModel.ToEmails = userDTO.Email;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.EmailBodyFail);
                return Result.Fail<EmailModel>(Messages.EmailBodyFail);
            }

            return Result.Ok(emailModel);
        }

        private async Task<Result<List<AttachmentFile>>> GetAttachments(int id)
        {
            var attachmentResult = await PrepareEmailAttachmentAsync(id);

            if (!attachmentResult.IsSucceeded)
            {
                _logger.LogError(attachmentResult.GetErrorString());
                return Result.Fail<List<AttachmentFile>>(attachmentResult.GetErrorString());
            }

            List<AttachmentFile> attachments = null;
            if (attachmentResult.Value.FileBytes.Length > 0)
            {
                attachments = new List<AttachmentFile>
                {
                    attachmentResult.Value
                };
            }

            return Result.Ok(attachments);
        }

        private EmailConfigModel MapEmailConfiguration(string projectName, EmailModel staticScanEmailModelResult, List<AttachmentFile> attachments)
        {
            var emailConfigModel = new EmailConfigModel
            {
                Attachments = attachments,
                Body = staticScanEmailModelResult.Body,
                FromEmail = emailSettings.FromEmail,
                Host = emailSettings.Host,
                Password = emailSettings.Password,
                Port = emailSettings.Port,
                Subject = string.Format(Constants.StaticScanEmailConstants.StaticScanEmailSubjectName, projectName, DateTime.Now.ToString(Constants.StaticScanEmailConstants.StaticScanEmailSubjectDateFormat)),
                UserName = emailSettings.UserName,
                IsBodyHtml = true,
                EnableSsl = emailSettings.EnableSsl,
                ToEmails = staticScanEmailModelResult.ToEmails
            };

            return emailConfigModel;
        }

        private async Task<Result<AttachmentFile>> PrepareEmailAttachmentAsync(int id)
        {
            var reportResult = await _staticScanReportService.GenerateReportAsync(id, ReportFormat.Pdf, false);
            if (!reportResult.IsSucceeded)
            {
                return Result.Fail<AttachmentFile>(reportResult.GetErrorString());
            }

            var attachmentFile = new AttachmentFile
            {
                FileBytes = reportResult.Value.Bytes,
                FileName = reportResult.Value.FileName
            };

            return Result.Ok(attachmentFile);
        }

        #endregion Private Methods
    }
}