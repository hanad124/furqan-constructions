import ExcelJS from "exceljs";

interface Invoice {
  startDate: string | null;
  endDate: string | null;
  isSearchMatch: boolean;
  isDateMatch: boolean;
  id: string;
  invoice_number: string;
  customer: string;
  invoice_date: string;
  total: string;
}

const exportExcelFile = (
  data: Invoice[],
  startDate: string,
  endDate: string
) => {
  const fileName = `Cash Invoices | ${startDate} - ${endDate}.xlsx`;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Cash Invoices");

  // Header styles
  const headerStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, color: { argb: "FFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "3490DC" } },
    alignment: { vertical: "middle", horizontal: "center" },
  };

  worksheet.columns = [
    {
      header: "Invoice Number",
      key: "invoice_number",
      width: 20,
      style: headerStyle,
    },
    { header: "Customer", key: "customer", width: 20, style: headerStyle },
    {
      header: "Invoice Date",
      key: "invoice_date",
      width: 20,
      style: headerStyle,
    },
    { header: "Total", key: "total", width: 20, style: headerStyle },
  ];

  // Row styles for data rows
  const evenRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "EDF2F7" } },
    alignment: { vertical: "middle", horizontal: "center" },
    height: 30,
  };

  const oddRowStyle = {
    font: { color: { argb: "000000" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } },
    alignment: { vertical: "middle", horizontal: "center" },
    height: 30,
  };

  // Add data rows
  data.forEach((invoice, index) => {
    const rowStyle = index % 2 === 0 ? evenRowStyle : oddRowStyle;

    const row = worksheet.addRow({
      invoice_number: invoice.invoice_number,
      customer: invoice.customer,
      invoice_date: invoice.invoice_date,
      total: invoice.total,
    });

    row.eachCell((cell: any) => {
      if (cell.value) {
        // Apply row style to non-empty cells
        cell.style = rowStyle;
      }
    });
  });

  // Generate Excel File with given name
  workbook.xlsx.writeBuffer().then((buffer: any) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  });
};

export default exportExcelFile;
