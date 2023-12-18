"use client";

import Table from "@mui/material/Table";
import { columns } from "../../../data/invoices";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  FiEye,
  FiMoreVertical,
  FiPlusCircle,
  FiSearch,
  FiPrinter,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FiDownload, FiTrash2 } from "react-icons/fi";

import toast, { Toaster } from "react-hot-toast";

const ExcelJS = require("exceljs");

import { Invoice } from "@/types/generalTypes";
import { deleteCashInvoice } from "@/utils/db/CashInvoice";

import React, { useState, useEffect, useRef } from "react";

import { getCashInvoiceItem, getCashInvoices } from "@/utils/db/CashInvoice";
import InvoiceCashReport from "@/components/report/invoice/InvoiceCashReport";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const getInvoices = async () => {
      const invoices = await getCashInvoices();
      // setInvoices(invoices);

      // merge invoice items & invoices
      const invoiceItems = await getCashInvoiceItem();

      const merged = invoices?.map((invoice) => {
        const invoiceItem = invoiceItems?.filter(
          (item) => item.invoice_id === invoice.id
        );
        return { ...invoice, invoiceItem };
      });

      setInvoices(merged || []);
    };

    getInvoices();
  }, []);

  const rows = invoices.flatMap((invoice) => {
    const invoiceItems = invoice.invoiceItem || [];

    // Calculate the total of all items
    const total = invoiceItems.reduce((acc, item) => acc + item.total, 0);

    // Create a new row with the desired properties
    const newRow = {
      id: invoice.id,
      invoice_number: `INV - ${
        // make 3 digits if its 1 or 2 digits
        invoice.invoice_number.toString().length > 2
          ? invoice.invoice_number
          : invoice.invoice_number.toString().length === 1
          ? `00${invoice.invoice_number}`
          : `0${invoice.invoice_number}`
      }`,
      customer: invoice.customer,
      invoice_date: invoice.invoice_date.toString().slice(4, 16),
      total: `$ ${total.toString().length > 3 ? total : total}`,
    };

    return [newRow];
  });

  // filtered rows
  const filteredRows = rows
    .map((row) => {
      const invoiceDate = new Date(row.invoice_date);

      const isSearchMatch =
        row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.invoice_number.toLowerCase().includes(searchTerm.toLowerCase());

      const isDateMatch =
        (!startDate || invoiceDate >= startDate) &&
        (!endDate || invoiceDate <= (endDate || new Date()));

      return {
        ...row,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        isSearchMatch,
        isDateMatch,
      };
    })
    .filter((row) => row.isSearchMatch && row.isDateMatch);

  // handle search
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // delete invoice
  const handleDelete = async (id: string) => {
    console.log(id);

    setLoading(true);

    try {
      await toast.promise(
        deleteCashInvoice(id),
        {
          loading: "Deleting invoice...",
          success: "Invoice deleted successfully!",
          error: "Failed to delete invoice. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      // Fetch invoices if needed
      // fetchinvoices();

      // Update the state when the promise is resolved
      const newInvoices = invoices.filter((invoice) => invoice.id !== id);
      setInvoices(newInvoices);
    } catch (error) {
      toast.error("Failed to delete invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params: any) => {
        return (
          <>
            <div className="cellAction flex gap-3">
              <Link href={`/dashboard/invoices/cash/preview/${params.row.id}`}>
                <div className="editButton" onClick={() => {}}>
                  <FiEye className="text-lg text-slate-500" />{" "}
                </div>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <FiMoreVertical className="text-lg text-slate-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">
                      Download
                    </DropdownMenuItem>
                    <Link
                      href={`/dashboard/invoices/cash/update/${params.row.id}`}
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Edit</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    <span className="text-red-500">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        );
      },
    },
  ];

  // export to excel
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Cash Invoices");

    // Header styles
    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFF" } }, // White text
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "3490DC" } }, // Blue background
      alignment: { vertical: "middle", horizontal: "center" },
      height: 40, // Increase header height
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

    // Row styles
    const evenRowStyle = {
      font: { color: { argb: "000000" } }, // Black text
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "EDF2F7" } }, // Light gray background
      alignment: { vertical: "middle", horizontal: "center" },
      height: 30, // Increase row height
    };

    const oddRowStyle = {
      font: { color: { argb: "000000" } }, // Black text
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } }, // White background
      alignment: { vertical: "middle", horizontal: "center" },
      height: 30, // Increase row height
    };

    // Add rows data
    filteredRows.forEach((invoice, index) => {
      const rowStyle = index % 2 === 0 ? evenRowStyle : oddRowStyle;

      worksheet
        .addRow({
          invoice_number: invoice.invoice_number,
          customer: invoice.customer,
          invoice_date: invoice.invoice_date,
          total: invoice.total,
        })
        .eachCell((cell: any) => {
          cell.style = rowStyle;
        });
    });

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Cash_Invoices.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <>
      <div className="my-10 mx-4">
        {/* create invoice button with icon */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
          <Link href="/dashboard/invoices/cash/create-invoice">
            <Button
              className="flex items-center gap-2 p-6"
              variant="default"
              color="primary"
              size={"lg"}
            >
              <FiPlusCircle className="text-lg" />
              <span>Create Invoice</span>
            </Button>
          </Link>
        </div>
        <div
          style={{ height: 400, width: "100%" }}
          className="border rounded mt-7"
        >
          <div className="flex justify-between items-center gap-10 p-4 border-b w-full ">
            <div className="flex flex-wrap items-center gap-5 w-full md:flex-nowrap">
              {/* Date pickers */}
              <div className="flex flex-col md:flex-row gap-2">
                <div className="mb-2 md:mb-0">
                  <label className="text-slate-600 block mb-1 text-sm ml-1">
                    From
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="border border-slate-200 rounded-md p-2 text-slate-600"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 text-sm ml-1">
                    To
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: any) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="border border-slate-200 rounded-md p-2 text-slate-600"
                  />
                </div>
              </div>

              {/* Search input */}
              <div className="flex-shrink-0 mt-auto w-full md:w-auto flex-1">
                <div className="flex items-center gap-2 w-full border border-slate-200 rounded-md p-2 py-3 focus-within:border-blue-500 focus-within:border-1 text-slate-600">
                  <FiSearch className="text-slate-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search invoice"
                    className="flex-1 focus:none text-sm outline-none w-full"
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="cursor-pointer -mb-5">
              {/* filtering and export section */}{" "}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <FiMoreVertical className="text-lg text-slate-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-3"
                      onClick={handlePrint}
                    >
                      <FiDownload className="text-lg text-slate-700" />
                      <span>Export as PDF</span>
                    </DropdownMenuItem>
                    {/* download it as excel */}
                    <DropdownMenuItem
                      className="cursor-pointer flex items-center gap-3"
                      onClick={exportExcelFile}
                    >
                      <FiDownload className="text-lg text-slate-700" />
                      <span>Export as Excel</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* table */}
          <DataGrid
            className="datagrid"
            rows={filteredRows}
            columns={columns.concat(actionColumn)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: "none",
              // borderColor: "red",
            }}
            //   checkboxSelection
          />
          <div
            style={{
              visibility: isVisible ? "visible" : "hidden",
              height: isVisible ? "auto" : 0,
              overflow: isVisible ? "visible" : "hidden",
            }}
          >
            <InvoiceCashReport ref={componentRef} filteredRow={filteredRows} />
          </div>

          {/* <button
            className="btn btn-sm btn-primary"
            onClick={printButtonClicked}
          >
            Print
          </button> */}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Invoices;
