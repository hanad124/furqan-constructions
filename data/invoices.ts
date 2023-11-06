import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "#No", width: 70 },
  { field: "client", headerName: "CLIENT", width: 210 },
  { field: "issueDate", headerName: "ISSUED DATE", width: 120 },
  {
    field: "total",
    headerName: "TOTAL ",
    type: "number",
    width: 190,
  },
  {
    field: "balance",
    headerName: "BALANCE",
    description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 220,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

export const rows = [
  { id: 1, client: "Snow", issueDate: "22 Mar 2021", total: 2869 },
  { id: 2, client: "Lannister", issueDate: "18 Mar 2021	", total: 3789 },
  { id: 3, client: "Lannister", issueDate: "06 Mar 2021	", total: 5565 },
  { id: 4, client: "Stark", issueDate: "02 Mar 2021	", total: 3325 },
  { id: 5, client: "Targaryen", issueDate: "11 Feb 2021	", total: 4749 },
  { id: 6, client: "Melisandre", issueDate: "10 Feb 2021	", total: 4309 },
  { id: 7, client: "Clifford", issueDate: "04 Feb 2021	", total: 2719 },
  { id: 8, client: "Frances", issueDate: "01 Feb 2021	", total: 4077 },
  { id: 9, client: "Roxie", issueDate: "01 Feb 2021	", total: 5200 },
];
