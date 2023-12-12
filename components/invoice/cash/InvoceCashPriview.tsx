"use client";

import React from "react";
import { getCashInvoiceById, getCashInvoiceItem } from "@/utils/db/CashInvoice";
import { useState, useEffect } from "react";
import { Invoice, InvoiceItem } from "@/types/generalTypes";
import InvoiceTitle from "@/components/invoice/cash/InvoiceTitle";
import Image from "next/image";

import { cashInvoiceColumns } from "@/data/cashInvoiceColumns";
import { DataGrid } from "@mui/x-data-grid";
import { BiPrinter } from "react-icons/bi";

import qrCode from "@/public/assets/furqan-qrcode.svg";
import InvoiceFooter from "@/components/invoice/cash/InvoiceFooter";
import formatNumber from "@/providers/numberFormatProvider";

const InvoiceCashPreview = React.forwardRef((props: any, ref: any) => {
  const id = props.id;

  const [invoice, setInvoice] = useState({
    id: "",
    customer: "",
    invoice_date: new Date(),
    invoice_number: "",
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    const getInvoices = async () => {
      const singleInvoice: any = await getCashInvoiceById(id);

      //   get single invoice items
      const invoiceItems = await getCashInvoiceItem();
      const invoiceItem = invoiceItems?.filter(
        (item) => item.invoice_id === id
      );

      console.log(singleInvoice.customer);

      setInvoice(singleInvoice);
      setInvoiceItems(invoiceItem!);
    };

    getInvoices();
  }, []);

  console.log(invoiceItems);

  //   calcalute total
  const total = invoiceItems.reduce((acc, item) => acc + item.total, 0);

  //   made the rows data custom and specific columns
  const rows = invoiceItems.map((item) => {
    return {
      id: item.id,
      item: item.item,
      quantity: item.quantity,
      price: `$ ${
        item.price.toString().length > 3 ? formatNumber(item.price) : item.price
      }`,
      total: `$ ${
        item.total.toString().length > 3 ? formatNumber(item.total) : item.total
      }`,
    };
  });

  const NoPagination = () => null;

  return (
    <>
      <div className="mx-4 mt-10 rounded-md p-5 flex-2" ref={ref}>
        <div className="">
          <InvoiceTitle />

          <div className="flex flex-wrap gap-y-4 justify-between mt-7">
            <Image
              src={qrCode}
              width={200}
              height={200}
              alt="qr code"
              className="w-28"
            />
            <div className="flex gap-2">
              <div className="flex flex-col gap-3 uppercase text-sm font-bold ml-4">
                <p className="text-start">CUSTOMER: </p>
                <p className="text-start">INVOICE NUMBER: </p>
                <p className="text-start">DATE: </p>
              </div>
              <div className="flex flex-col gap-3 uppercase text-sm font-medium">
                <p className="text-start">{invoice?.customer}</p>
                <p className="text-start">
                  INV -{" "}
                  {invoice?.invoice_number.toString().length > 2
                    ? invoice?.invoice_number
                    : invoice?.invoice_number.toString().length === 1
                    ? `00${invoice?.invoice_number}`
                    : `0${invoice?.invoice_number}`}
                </p>
                <p className="text-start">
                  {invoice?.invoice_date.toString().slice(4, 16)}
                </p>
              </div>
            </div>
          </div>
          {/* items table */}
          <DataGrid
            className="datagrid dark:text-slate-200  mt-10"
            rows={rows}
            rowHeight={35}
            columnHeaderHeight={40}
            columns={cashInvoiceColumns}
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
              },
            }}
            hideFooter
            hideFooterPagination={true}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
          />

          {/* summary card */}
          <div className="flex justify-end w-full mt-5">
            <div
              className="
        border-[1px] w-56 mx-w-76 rounded-10 border-b-slate-200 p-5 rounded-lg bg-slate-200/10 "
            >
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 text-slate-600">
                  <p>Subtotal : </p>
                  <p>Discount : </p>
                </div>
                <div className="flex flex-col gap-2 text-slate-600">
                  <p>${total}</p>
                  <p>$0.00</p>
                </div>
              </div>
              <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 text-slate-600">
                  <p>Total : </p>
                </div>
                <div className="flex flex-col gap-2 text-slate-600">
                  <p>${total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* invoice footer */}
        <InvoiceFooter />
      </div>
    </>
  );
});

export default InvoiceCashPreview;
