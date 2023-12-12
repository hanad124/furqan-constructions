"use client";

import Table from "@mui/material/Table";
import { columns } from "../../../data/invoices";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { FiEye, FiMoreVertical, FiPlusCircle, FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import toast, { Toaster } from "react-hot-toast";

import { Invoice } from "@/types/generalTypes";
import { deleteCashInvoice } from "@/utils/db/CashInvoice";
import formatNumber from "@/providers/numberFormatProvider";

import { useState, useEffect } from "react";

import { getCashInvoiceItem, getCashInvoices } from "@/utils/db/CashInvoice";

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
      invoice_number: `INV - ${invoice.invoice_number}`,
      customer: invoice.customer,
      invoice_date: invoice.invoice_date.toString().slice(4, 16),
      total: `$ ${total.toString().length > 3 ? formatNumber(total) : total}`,
    };

    return [newRow];
  });

  // filtered rows
  const filteredRows = rows.filter(
    (row) =>
      row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // handle search
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  // delete invoice
  const handleDelete = async (id: string) => {
    console.log(id);
    // const result = await deleteSupplier(id);

    // if (result?.error) {
    //   toast.error(result?.error);
    // } else {
    setLoading(true);
    try {
      toast.promise(
        deleteCashInvoice(id),
        {
          loading: "Deleting invoice...",
          success: "invoice deleted successfully!",
          error: "Failed to delete invoice. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
      // fetchinvoices();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete invoice. Please try again.");
    }
    // }
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
                <div
                  className="editButton"
                  onClick={() => {
                    console.log(params.row.id);
                  }}
                  // onClick={() => editUserBtn(params.row.id)}
                >
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
                    <DropdownMenuItem className="cursor-pointer">
                      Edit
                    </DropdownMenuItem>
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
            <Toaster />
          </>
        );
      },
    },
  ];
  return (
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
        <div className="flex justify-between items-center p-4 border-b w-full ">
          <div
            className="flex items-center gap-2 w-full border border-slate-200 rounded-md p-2 py-3 
          focus-within:border-blue-500
          focus-within:border-1 text-slate-600
          "
          >
            <FiSearch className="text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search invoice"
              className="flex-1 focus:none text-sm 
              outline-none"
              onChange={handleSearch}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Invoices;
