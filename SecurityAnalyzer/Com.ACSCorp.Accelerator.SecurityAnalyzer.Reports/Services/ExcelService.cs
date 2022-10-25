using Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Models.Excel;

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Com.ACSCorp.Accelerator.SecurityAnalyzer.Reports.Services
{
    public class ExcelService
    {
        public byte[] BuildSheet(params ExcelSheetData[] excelSheets)
        {
            byte[] fileBytes = null;

            using (var stream = new MemoryStream())
            {
                using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook))
                {
                    // Add a WorkbookPart to the document.
                    WorkbookPart workbookPart = spreadsheetDocument.AddWorkbookPart();
                    workbookPart.Workbook = new Workbook();

                    AddStyles(workbookPart);

                    foreach (var excelSheetData in excelSheets)
                    {
                        AddSheet(workbookPart, excelSheetData);
                    }

                    // Close the document.
                    spreadsheetDocument.Close();
                    fileBytes = stream.ToArray();
                }
            }

            return fileBytes;
        }

        private void AddStyles(WorkbookPart workbookPart)
        {
            // Adding styles
            WorkbookStylesPart stylePart = workbookPart.AddNewPart<WorkbookStylesPart>();
            stylePart.Stylesheet = GenerateStylesheet();
            stylePart.Stylesheet.Save();
        }

        private void AddSheet(WorkbookPart workbookPart, ExcelSheetData excelSheetData)
        {
            // Add a blank WorksheetPart.
            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
            worksheetPart.Worksheet = new Worksheet();

            FormatColumns(excelSheetData, worksheetPart);

            Sheets sheets = GetSheets(workbookPart);

            string relationshipId = workbookPart.GetIdOfPart(worksheetPart);
            var sheetId = GetSheetId(sheets);

            // Append the new worksheet and associate it with the workbook.
            Sheet sheet = new Sheet() { Id = relationshipId, SheetId = sheetId, Name = excelSheetData.Name };
            sheets.Append(sheet);
            workbookPart.Workbook.Save();

            SheetData sheetData = worksheetPart.Worksheet.AppendChild(new SheetData());
            AddHeaders(excelSheetData, sheetData);
            AddData(excelSheetData, sheetData);

            worksheetPart.Worksheet.Save();
        }

        private void AddData(ExcelSheetData excelSheetData, SheetData sheetData)
        {
            //Inserting Data Row
            excelSheetData.Data.ForEach(values =>
            {
                var rowCells = new List<Cell>();
                excelSheetData.Headers.ForEach(item => rowCells.Add(ConstructCell(values[item.Property], CellValues.String, 1)));
                sheetData.AppendChild(new Row(rowCells));
            });
        }

        private void AddHeaders(ExcelSheetData excelSheetData, SheetData sheetData)
        {
            //Inserting Header row
            var headerCells = new List<Cell>();
            excelSheetData.Headers.ForEach(header =>
            {
                headerCells.Add(ConstructCell(header.DisplayName, CellValues.String, 2));
            });
            sheetData.AppendChild(new Row(headerCells));
        }

        private uint GetSheetId(Sheets sheets)
        {
            // Get a unique ID for the new worksheet.
            uint sheetId = 1;
            if (sheets.Elements<Sheet>().Count() > 0)
            {
                sheetId = sheets.Elements<Sheet>().Select(s => s.SheetId.Value).Max() + 1;
            }

            return sheetId;
        }

        private Sheets GetSheets(WorkbookPart workbookPart)
        {
            // Add Sheets to the Workbook.
            Sheets sheets = workbookPart.Workbook.GetFirstChild<Sheets>();
            if (sheets == null)
            {
                sheets = workbookPart.Workbook.AppendChild(new Sheets());
            }

            return sheets;
        }

        private void FormatColumns(ExcelSheetData excelSheetData, WorksheetPart worksheetPart)
        {
            Columns columns = new Columns();

            //Formatting Columns
            uint headerCounter = 1;
            excelSheetData.Headers.ForEach(header =>
            {
                columns.AppendChild(new Column
                {
                    Min = headerCounter,
                    Max = headerCounter,
                    CustomWidth = true,
                    Width = header.Width
                });

                headerCounter++;
            });
            worksheetPart.Worksheet.AppendChild(columns);
        }

        private Stylesheet GenerateStylesheet()
        {
            Fonts fonts = new Fonts(
                new Font( // Index 0 - default
                    new FontSize() { Val = 10 }
                ),
                new Font( // Index 1 - header
                    new FontSize() { Val = 10 },
                    new Bold()
                ));

            Fills fills = new Fills(
                    new Fill(new PatternFill() { PatternType = PatternValues.None }), // Index 0 - default
                    new Fill(new PatternFill() { PatternType = PatternValues.Gray125 }), // Index 1 - default
                    new Fill(new PatternFill(new ForegroundColor { Rgb = new HexBinaryValue() { Value = "66666666" } })
                    { PatternType = PatternValues.Solid }) // Index 2 - header
                );

            Borders borders = new Borders(
                    new Border(), // index 0 default
                    new Border( // index 1 black border
                        new LeftBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new RightBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new TopBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new BottomBorder(new Color() { Auto = true }) { Style = BorderStyleValues.Thin },
                        new DiagonalBorder())
                );

            CellFormats cellFormats = new CellFormats(
                    new CellFormat(), // default
                    new CellFormat { FontId = 0, FillId = 0, BorderId = 1, ApplyBorder = true }, // body
                    new CellFormat { FontId = 1, FillId = 0, BorderId = 1, ApplyBorder = true } // header
                );

            Stylesheet styleSheet = new Stylesheet(fonts, fills, borders, cellFormats);
            return styleSheet;
        }

        private Cell ConstructCell(string value, CellValues dataType, uint styleIndex = 0)
        {
            return new Cell
            {
                CellValue = new CellValue(value),
                DataType = new EnumValue<CellValues>(dataType),
                StyleIndex = styleIndex
            };
        }
    }
}
