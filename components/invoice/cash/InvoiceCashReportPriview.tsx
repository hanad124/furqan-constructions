import React from "react";

import { cashInvoiceReportColumns } from "@/data/report/IncoiceCashReportColumns";

import { DataGrid } from "@mui/x-data-grid";
import logo from "@/public/assets/logo-light.svg";
import Image from "next/image";
import TotalBanner from "./TotalBanner";

interface InvoiceCashReportPriview {
  id: string;
  invoice_number: string;
  customer: string;
  invoice_date: string;
  total: string;
}

const InvoiceCashReportPriview = React.forwardRef(
  ({
    filteredRow,
    ref,
  }: {
    filteredRow: InvoiceCashReportPriview[];
    ref: any;
  }) => {
    // make summary banner for the report that will show the total of the report
    const total = filteredRow.reduce((acc, item) => {
      // Remove non-numeric characters from the total string using a regular expression

      const numericTotal = item.total.replace(/[^\d.]/g, "");

      // Add the numeric total to the accumulator
      return acc + Number(numericTotal);
    }, 0);

    console.log(total);

    // get the oldest date and the newst data to show in the report title
    const oldestDate = filteredRow[0]?.invoice_date;
    const newestDate = filteredRow[filteredRow.length - 1]?.invoice_date;

    const NoPagination = () => null;

    return (
      <div className="w-full" ref={ref}>
        {/* report title */}
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col justify-center gap-y-5  w-full ">
              <div className="flex justify-center items-end gap-5 ">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="md:w-16"
                />
                <h1 className="text-4xl font-bold text-slate-800 tracking-widest">
                  FURQAN
                </h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-2xl font-bold text-slate-800">
                  Cash Invoice Report
                </h1>
              </div>
            </div>

            <div className="w-full bg-slate-800 h-[2px]"></div>
            {/* date start & end  */}
            <div className="flex justify-between w-full gap-2 ml-auto px-10 mb-6">
              <div className="flex gap-2">
                <p className="text-slate-800 font-bold">From:</p>
                <p className="text-slate-800 font-medium">{oldestDate}</p>
              </div>
              <div className="flex gap-2">
                <p className="text-slate-800 font-bold">To:</p>
                <p className="text-slate-800 font-medium">{newestDate}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-800 font-bold">Print Date:</p>
                <p className="text-slate-800 font-medium">
                  {new Date().toDateString()}
                </p>
              </div>
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
        {/* <TotalBanner total={total} /> */}
      </div>
    );
  }
);

export default InvoiceCashReportPriview;
