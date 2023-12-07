import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
export const columns: GridColDef[] = [
  { field: "invoice_number", headerName: "Invoice Number", width: 150 },
  { field: "customer", headerName: "Customer Name", width: 240 },
  { field: "invoice_date", headerName: "Invoice Date", width: 180 },
  { field: "total", headerName: "Total", width: 150 },
];
