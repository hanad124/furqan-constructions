"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { customerColumns } from "@/data/customerColumns";
import { getEmployees, deleteEmployee } from "../../../utils/dbOperations";
import { getCustomers, deleteCustomer } from "@/utils/db/Customer";

import toast, { Toaster } from "react-hot-toast";

// create a type for the data
interface Customer {
  id: string;
  name: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const page = () => {
  const [data, setData] = useState<readonly Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomers = async () => {
    try {
      const customers = await getCustomers();
      if (customers) {
        const mappedCustomer = (cusomer: Customer): Customer => {
          return {
            id: cusomer.id,
            name: cusomer.name,
            phone: cusomer.phone,
            createdAt: cusomer.createdAt,
            updatedAt: cusomer.updatedAt,
          };
        };

        const transformedCustomer = customers.map(mappedCustomer);
        setData(transformedCustomer);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  useEffect(() => {
    fetchCustomers();

    // cleanup function
    return () => {};
  }, []);

  // handle form submit
  const handleDelete = async (id: string) => {
    setLoading(true);
    // add id
    try {
      toast.promise(
        deleteCustomer(id),
        {
          loading: "Deleting customer...",
          success: "customer deleted successfully!",
          error: "Failed to delete customer. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
      fetchCustomers();
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during customer creation
      toast.error("Failed to delete curtomer. Please try again.");
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
              <Link
                href={`/dashboard/customers/edit-customer/${params.row.id}`}
              >
                <div className="editButton px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md border-dotted">
                  Edit
                </div>
              </Link>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDelete(params.row.id);
                }}
              >
                <input type="hidden" name="id" value={params.row.id} />
                <button
                  type="submit"
                  className="deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer"
                  onClick={() => {
                    fetchCustomers();
                  }}
                >
                  Delete
                </button>
              </form>
            </div>
            <Toaster />
          </>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-slate-600 font-bold">Customers</h1>
        <Link href="/dashboard/newCustomer">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new Customer</span>
          </Button>
        </Link>
      </div>
      <div className="datatable mt-10">
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={data}
          columns={customerColumns.concat(actionColumn)}
          // pageSize={9}
          // rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default page;
