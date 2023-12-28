"use client";

import { columns } from "../../../data/invoices";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import {
  FiEye,
  FiMoreVertical,
  FiPlusCircle,
  FiSearch,
  FiFileText,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";

import toast, { Toaster } from "react-hot-toast";

import { Invoice } from "@/types/generalTypes";
import { deleteCashInvoice } from "@/utils/db/CashInvoice";

import React, { useState, useEffect, useRef } from "react";

import { getCashInvoiceItem, getCashInvoices } from "@/utils/db/CashInvoice";
import InvoiceCashReport from "@/components/report/invoice/InvoiceCashReport";
import exportExcelFile from "@/providers/exportExcelFile";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useReactToPrint } from "react-to-print";
import { useQueryState } from "next-usequerystate";

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
  const [searchTerm, setSearchTerm] = useQueryState("search");
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
        row.customer.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
        row.invoice_number
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "");

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
    setSearchTerm(e.target.value.toLowerCase());

    // if search term is empty, reset the search
    if (e.target.value === "") {
      setSearchTerm(null);
    }
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

  const oldestDate = filteredRows[0]?.invoice_date;
  const newestDate = filteredRows[filteredRows.length - 1]?.invoice_date;

  // export to excel
  const handleExportExcel = () => {
    exportExcelFile(filteredRows, oldestDate, newestDate);
  };

  return (
    <>
      <div className="my-10 mx-4">
        {/* create invoice button with icon */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-slate-900">Invoices</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 p-6"
                variant="default"
                color="primary"
                size={"lg"}
              >
                <FiPlusCircle className="text-lg" />
                <span>Create Invoice</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                {/* Cash invoice button */}
                <Link href="/dashboard/invoices/cash/create-invoice">
                  <DropdownMenuItem className="cursor-pointer text-slate-600  flex items-center gap-3">
                    <FiFileText className="" />
                    <span>Cash Invoice</span>
                  </DropdownMenuItem>
                </Link>

                {/* Credit Invoice button */}
                <DropdownMenuSeparator />
                <Link href="/dashboard/invoices/cash/create-invoice">
                  {" "}
                  <DropdownMenuItem className="cursor-pointer text-slate-600 flex items-center gap-3">
                    <FiFileText className="" />
                    <span>Credit Invoice</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
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
                    value={searchTerm || ""}
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
                    {/* pdf button */}
                    <DropdownMenuItem
                      className="cursor-pointer text-slate-600  flex items-center gap-3"
                      onClick={handlePrint}
                    >
                      <FiDownload className="" />
                      <span>Export as PDF</span>
                    </DropdownMenuItem>
                    {/* download it as excel */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-slate-600 flex items-center gap-3"
                      onClick={handleExportExcel}
                    >
                      <FiDownload className="" />
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
            }}
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
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Invoices;
