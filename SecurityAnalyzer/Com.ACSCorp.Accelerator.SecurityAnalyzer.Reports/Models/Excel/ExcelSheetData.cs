using System.Collections.Generic;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models.Excel
{
    public class ExcelSheetData
    {
        public string Name { get; set; }
        public List<ColumnConfiguration> Headers { get; set; }
        public List<Dictionary<string, string>> Data { get; set; }
    }
}
