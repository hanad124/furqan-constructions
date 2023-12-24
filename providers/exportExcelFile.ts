import ExcelJS, { Workbook, Worksheet, Column } from "exceljs";

interface ExportExcelOptions {
  workbook: Workbook;
  worksheetName: string;
  columns: {
    header: string;
    key: string;
    width: number;
  }[];
  data: any[]; // Adjust the type based on the actual data structure
}

const ExportExcelFile = (options: ExportExcelOptions) => {
  const { workbook, worksheetName, columns, data } = options;

  const worksheet: Worksheet = workbook.addWorksheet(worksheetName);

  // Header styles
  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "3490DC" } },
    alignment: { vertical: "middle", horizontal: "center" as const },
    height: 40, 
  };

  worksheet.columns = columns.map((column) => ({
    header: column.header,
    key: column.key,
    width: column.width,
    style: { ...headerStyle }, // Copy the headerStyle object
  }));

  // Row styles for data rows
  const evenRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "EDF2F7" } },
    alignment: { vertical: "middle", horizontal: "center" as const },
    height: 30,
  };

  const oddRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } },
    alignment: { vertical: "middle", horizontal: "center" as const },
    height: 30,
  };

  // Add data rows
  data.forEach((row, index) => {
    const rowStyle = index % 2 === 0 ? evenRowStyle : oddRowStyle;

    const newRow = worksheet.addRow(row);

    newRow.eachCell((cell: any) => {
      if (cell.value) {
        // Apply row style to non-empty cells
        cell.style = { ...rowStyle }; // Copy the rowStyle object
      }
    });
  });

  // Make the file name dynamic as date range from and to
  const oldestDate = data[0]?.invoice_date;
  const newestDate = data[data.length - 1]?.invoice_date;

  // Generate Excel File with given name
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${worksheetName} Report ${oldestDate} - ${newestDate}.xlsx`
    );
    document.body.appendChild(link);
    link.click();
  });
};

export default ExportExcelFile;
