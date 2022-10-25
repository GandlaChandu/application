using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Constants;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Common.Enum;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.CodeAnalyzer.Reports.Services;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;

namespace Com.ACSCorp.Accelerator.CodeAnalyzer.Reports
{
    internal class StaticScanPdfReport : StaticScanReportBase, IStaticScanReport
    {
        private readonly IRenderTemplate _renderTemplate;

        public StaticScanPdfReport()
        {
            _renderTemplate = new RenderTemplate();
        }

        public Report Generate(StaticScanReportModel staticScanReportModel)
        {
            string templateFileName = Constants.StaticScanEmailConstants.StaticScanEmailAttachmentPDFTemplateName;
            string documentContent = _renderTemplate.RenderTemplateAsync(templateFileName, staticScanReportModel).Result;

            PdfService pdfService = new PdfService();

            return new Report
            {
                FileName = GetStaticScanReportName(ReportFormat.Pdf),
                Bytes = pdfService.GenerateFile(documentContent),
                MimeType = Constants.MimeTypes.PdfMimeType
            };
        }
    }
}
