"use client";

import Table from "@mui/material/Table";
import { columns } from "../../../data/invoices";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { FiEye, FiMoreVertical, FiPlusCircle } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import { Invoice } from "@/types/generalTypes";

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
      total: `$ ${total}`,
    };

    return [newRow];
  });

  // console.log(invoices);
  const actionColumn = [
    {
      field: "action",
      headerName: "ACTIONS",
      width: 180,
      renderCell: (params: any) => {
        return (
          <div className="flex items-center gap-5">
            <Link href="/customers/edit-customer">
              <div
                className="editButton"
                // onClick={() => editUserBtn(params.row.id)}
              >
                <FiEye className="text-lg text-slate-500" />
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="cursor-pointer"
                  //   onClick={() => handleDelete(params.row.id)}
                >
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
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-red-500">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={columns.concat(actionColumn)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          //   checkboxSelection
        />
      </div>
    </div>
  );
};

export default Invoices;
