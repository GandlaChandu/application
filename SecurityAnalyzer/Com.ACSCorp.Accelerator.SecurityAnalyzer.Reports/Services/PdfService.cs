using Com.ACSCorp.Accelerator.SecurityAnalyzer.Common;

using DinkToPdf;
using DinkToPdf.Contracts;

using System.IO;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Services
{
    public class PdfService
    {
        #region Variables

        private readonly static IConverter _converter = new SynchronizedConverter(new PdfTools());

        #endregion Variables

        #region Public Methods

        public byte[] GenerateFile(string documentContent)
        {
            HtmlToPdfDocument pdf = PreparePDFContent(documentContent);

            return _converter.Convert(pdf);
        }

        #endregion Public Methods

        #region Private Methods

        private HtmlToPdfDocument PreparePDFContent(string documentContent, int fontSize = Constants.MinimumFontSize)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 20, Bottom = 10 }
            };

            var objectSettings = new ObjectSettings
            {
                HtmlContent = documentContent,
                HeaderSettings = GetHeaderSettings(),
                FooterSettings = GetFooterSettings(),
                WebSettings = GetWebSettings(fontSize)
            };

            var pdf = new HtmlToPdfDocument
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            return pdf;
        }

        private WebSettings GetWebSettings(int fontSize)
        {
            return new WebSettings
            {
                MinimumFontSize = fontSize,
                DefaultEncoding = "utf-8",
                UserStyleSheet = GetAssetsRelativePath(Constants.StyleFile)
            };
        }

        private FooterSettings GetFooterSettings()
        {
            return new FooterSettings
            {
                Spacing = 3,
                HtmUrl = GetAssetsRelativePath("footer.html"),
                Line = true
            };
        }

        private HeaderSettings GetHeaderSettings()
        {
            return new HeaderSettings
            {
                Spacing = 3,
                HtmUrl = GetAssetsRelativePath("header.html"),
                Line = true
            };
        }

        private string GetAssetsRelativePath(string fileName)
        {
            return Path.Combine(Directory.GetCurrentDirectory(), Constants.AssestsFolder, fileName);
        }

        #endregion
    }
}
