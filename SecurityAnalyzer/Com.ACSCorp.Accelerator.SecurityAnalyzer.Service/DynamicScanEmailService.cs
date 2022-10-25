using Com.ACSCorp.Accelerator.Core.HttpService;
using Com.ACSCorp.Accelerator.Core.Models;
using Com.ACSCorp.Accelerator.Core.Models.Email;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.IService.ApiClients;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models.DTO;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Service
{
    public class DynamicScanEmailService : IDynamicScanEmailService
    {
        #region Variables

        private readonly ILogger _logger;
        private readonly IDynamicScanReportService _dynamicScanReportService;
        private readonly IApplicationAnalyzerClient _applicationAnalyzerClient;
        private readonly IRenderTemplate _templateRenderer;
        private readonly EmailSettings emailSettings = new EmailSettings();

        #endregion Variables

        #region Constructors

        public DynamicScanEmailService(
            ILogger<DynamicScanEmailService> logger,
            IDynamicScanReportService dynamicScanReportService,
            IApplicationAnalyzerClient applicationAnalyzerClient,
            IRenderTemplate templateRenderer,
            IConfiguration configuration)
        {
            _logger = logger;
            _dynamicScanReportService = dynamicScanReportService;
            _applicationAnalyzerClient = applicationAnalyzerClient;
            _templateRenderer = templateRenderer;
            configuration.Bind("SmtpDetail", emailSettings);
        }

        #endregion Constructors

        #region Public Methods

        public async Task<Result> SendEmail(DynamicScanDTO dynamicScanDTO, ProjectDTO projectDTO)
        {
            var dynamicScanEmailModelResult = await PrepareEmailBody(dynamicScanDTO, projectDTO);

            if (!dynamicScanEmailModelResult.IsSucceeded)
            {
                return Result.Fail(dynamicScanEmailModelResult.GetErrorString());
            }

            var attachmentsResult = await GetAttachments(dynamicScanDTO.Id);

            if (!attachmentsResult.IsSucceeded)
            {
                _logger.LogError(attachmentsResult.GetErrorString());
                return Result.Fail(attachmentsResult.GetErrorString());
            }
            List<AttachmentFile> attachments = attachmentsResult.Value;

            EmailConfigModel emailConfigModel = MapEmailConfiguration(projectDTO.Name, dynamicScanEmailModelResult.Value, attachments);
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

        private async Task<Result<EmailModel>> PrepareEmailBody(DynamicScanDTO dynamicScanDTO, ProjectDTO projectDTO)
        {
            try
            {
                if (dynamicScanDTO == null)
                {
                    return Result.Fail<EmailModel>(Messages.DynamicScanNotFound);
                }

                UserDTO userDTO = await _applicationAnalyzerClient.GetUserAsync(dynamicScanDTO.RunById);
                if (userDTO == null)
                {
                    return Result.Fail<EmailModel>(Messages.UserNotFound);
                }

                var bodyModel = new EmailBodyModel
                {
                    UserName = userDTO.FirstName + " " + userDTO.LastName,
                    ClientName = projectDTO.ClientName,
                    ProjectName = projectDTO.Name
                };
                string documentContent = await _templateRenderer.RenderTemplateAsync(Constants.DynamicScanEmailConstants.DynamicScanEmailTemplate, bodyModel);

                var emailModel = new EmailModel
                {
                    Body = documentContent,
                    ToEmails = userDTO.Email
                };

                return Result.Ok(emailModel);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.EmailBodyGetFail);
                return Result.Fail<EmailModel>(Messages.EmailBodyGetFail);
            }
        }

        private EmailConfigModel MapEmailConfiguration(string projectName, EmailModel dynamicScanEmailModel, List<AttachmentFile> attachments)
        {
            var emailConfigModel = new EmailConfigModel
            {
                Attachments = attachments,
                Body = dynamicScanEmailModel.Body,
                FromEmail = emailSettings.FromEmail,
                Host = emailSettings.Host,
                Password = emailSettings.Password,
                Port = emailSettings.Port,
                Subject = string.Format(Constants.DynamicScanEmailConstants.DynamicScanEmailSubjectName, projectName, DateTime.Now.ToString(Constants.DynamicScanEmailConstants.DynamicScanEmailSubjectDateFormat)),
                UserName = emailSettings.UserName,
                IsBodyHtml = true,
                EnableSsl = emailSettings.EnableSsl,
                ToEmails = dynamicScanEmailModel.ToEmails
            };

            return emailConfigModel;
        }

        private async Task<Result<AttachmentFile>> PrepareEmailAttachmentAsync(int dynamicScanId)
        {
            try
            {
                var reportResult = await _dynamicScanReportService.GenerateReportAsync(dynamicScanId, ReportFormat.Pdf, false);
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
            catch (Exception ex)
            {
                _logger.LogError(ex, Messages.AttachmentFail);
                return Result.Fail<AttachmentFile>(Messages.AttachmentFail);
            }
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

        #endregion Private Methods
    }
}
