"use client";

import React from "react";
import { getCashInvoiceById, getCashInvoiceItem } from "@/utils/db/CashInvoice";
import { useState, useEffect } from "react";
import { Invoice, InvoiceItem } from "@/types/generalTypes";
import InvoiceTitle from "@/components/invoice/cash/InvoiceTitle";
import Image from "next/image";

import { cashInvoiceColumns } from "@/data/cashInvoiceColumns";
import { DataGrid } from "@mui/x-data-grid";

import qrCode from "@/public/assets/furqan-qrcode.svg";
import InvoiceFooter from "@/components/invoice/cash/InvoiceFooter";

const InvoicePreview = (props: any) => {
  const id = props.params.id;

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

  const NoPagination = () => null;

  return (
    <>
      <div className="mx-4 mt-10 lg:mx-36 rounded-md shadow p-5">
        <div className="">
          <InvoiceTitle />

          <div className="flex flex-col md:flex-row gap-y-4 justify-between mt-7">
            <Image
              src={qrCode}
              width={200}
              height={200}
              alt="qr code"
              className="w-28"
            />
            <div className="flex gap-5">
              <div className="flex flex-col gap-3 uppercase text-sm font-bold">
                <p className="text-start">CUSTOMER: </p>
                <p className="text-start">INVOICE NUMBER: </p>
                <p className="text-start">DATE: </p>
              </div>
              <div className="flex flex-col gap-3 uppercase text-sm font-bold">
                <p className="text-end">{invoice?.customer}</p>
                <p className="text-end">INV - {invoice?.invoice_number}</p>
                <p className="text-end">
                  {invoice?.invoice_date.toString().slice(4, 16)}
                </p>
              </div>
            </div>
          </div>
          {/* items table */}
          <DataGrid
            className="datagrid dark:text-slate-200  mt-10"
            rows={invoiceItems}
            columns={cashInvoiceColumns}
            components={{
              Pagination: NoPagination, // Hide the default pagination component
            }}
            sx={{
              // change the header background color to red
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#D54F33",
                color: "white",
                fontWeight: "bold",
              },
              //   change row hieght
              "& .MuiDataGrid-root .MuiDataGrid-row": {
                height: "20px" /* Adjust the height as needed */,
              },
            }}
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
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>Subtotal : </p>
                  <p>Discount : </p>
                </div>
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>${total}</p>
                  <p>$0.00</p>
                </div>
              </div>
              <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2 text-slate-500">
                  <p>Total : </p>
                </div>
                <div className="flex flex-col gap-2 text-slate-500">
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
};

export default InvoicePreview;
