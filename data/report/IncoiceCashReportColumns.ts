import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
export const cashInvoiceReportColumns: GridColDef[] = [
  { field: "id", headerName: "NO", width: 30 },
  { field: "invoice_number", headerName: "INVOICE", width: 100 },
  { field: "customer", headerName: "CUSTOMER", width: 250 },
  { field: "total", headerName: "TOTAL", width: 150 },
  { field: "invoice_date", headerName: "DATE", width: 180 },
];
