using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter;
using Com.ACSCorp.Accelerator.Core.TemplateRenderAdapter.Interface;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common.Enums;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Interfaces;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models;
using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Services;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports
{
    internal class DynamicScanPdfReport : DynamicScanReportBase, IDynamicScanReport
    {
        private readonly IRenderTemplate _renderTemplate;

        public DynamicScanPdfReport()
        {
            _renderTemplate = new RenderTemplate();
        }

        public Report Export(DynamicScanReportModel dynamicScanReportModel)
        {
            string templateFileName = Constants.DynamicScanEmailConstants.DynamicScanEmailPDFTemplateName;
            string documentContent = _renderTemplate.RenderTemplateAsync(templateFileName, dynamicScanReportModel).Result;

            var pdfService = new PdfService();

            return new Report
            {
                FileName = GetDynamicScanReportName(ReportFormat.Pdf),
                Bytes = pdfService.GenerateFile(documentContent),
                MimeType = Constants.MimeTypes.PdfMimeType
            };
        }
    }
}
