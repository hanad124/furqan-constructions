import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
export const cashInvoiceColumns: GridColDef[] = [
  { field: "id", headerName: "NO", width: 30 },
  { field: "item", headerName: "DESCRIPTION", width: 250 },
  { field: "quantity", headerName: "QTY", width: 140 },
  { field: "price", headerName: "COST", width: 180 },
  { field: "total", headerName: "TOTAL", width: 150 },
];
