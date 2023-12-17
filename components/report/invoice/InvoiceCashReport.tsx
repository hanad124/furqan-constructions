import React from "react";

import { cashInvoiceReportColumns } from "@/data/report/IncoiceCashReportColumns";

import { DataGrid } from "@mui/x-data-grid";
import logo from "@/public/assets/logo-light.svg";
import Image from "next/image";

interface InvoiceCashReportProps {
  id: string;
  invoice_number: string;
  customer: string;
  invoice_date: string;
  total: string;
}
const InvoiceCashReport = ({
  filteredRow,
}: {
  filteredRow: InvoiceCashReportProps[];
}) => {
  // make summary banner for the report that will show the total of the report
  const total = filteredRow.reduce((acc, item) => {
    // Remove non-numeric characters from the total string using a regular expression

    const numericTotal = item.total.replace(/[^\d.]/g, "");

    // Add the numeric total to the accumulator
    return acc + Number(numericTotal);
  }, 0);

  const NoPagination = () => null;

  return (
    <div className="w-full">
      {/* report title */}
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <Image src={logo} alt="logo" width={100} height={100} />
          </div>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-slate-800">
              Cash Invoice Report
            </h1>
          </div>
        </div>
      </div>
      {/* report table */}
      <DataGrid
        className="dark:text-slate-200 w-full"
        rows={
          //  use the id as counter to show the row number
          filteredRow.map((item, id) => {
            return {
              id: id + 1,
              invoice_number: item.invoice_number,
              customer: item.customer,
              invoice_date: item.invoice_date,
              total: item.total,
            };
          })
        }
        rowHeight={35}
        columnHeaderHeight={40}
        columns={cashInvoiceReportColumns as any}
        components={{
          Pagination: NoPagination, // Hide the default pagination component
        }}
        sx={{
          // change the header background color to red
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#D54F33",
            color: "white",
            height: "15px",
            fontWeight: "700",
          },
          //   change row hieght
          "& .MuiDataGrid-root .MuiDataGrid-row": {
            height: "20px" /* Adjust the height as needed */,
            fontSize: "35px",

            // changt font size
            "& .MuiDataGrid-cell": {
              fontSize: "145px",
              fontWeight: "700",
            },
          },
        }}
        hideFooter
        hideFooterPagination={true}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
      />
      {/* total banner */}
      <div className="flex justify-end w-full mt-5">
        <div
          className="
border-[1px] w-56 mx-w-76 rounded-10 border-b-slate-200 p-5 rounded-lg bg-slate-200/10 "
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>Subtotal : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>${total}</p>
            </div>
          </div>
          <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>Total : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCashReport;
