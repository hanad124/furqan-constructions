"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus, BiSearch } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { customerColumns } from "@/data/customerColumns";
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

const CustomerPage = () => {
  const [data, setData] = useState<readonly Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // filter customer
  const filterredCustomer = data.filter(
    (customer) =>
      (customer.name.toLocaleLowerCase().includes(searchTerm) ||
        customer.phone?.includes(searchTerm)) &&
      (customer.name || customer.phone)
  );

  // search customer
  const searchCustomer = (e: any) => {
    setSearchTerm(e.target.value.toLocaleLowerCase());
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
            <span className="">new Customer</span>
          </Button>
        </Link>
      </div>
      <div className=" mt-10 border rounded">
        <div className="flex justify-between items-center p-4 border-b w-full ">
          <div
            className="flex items-center gap-2 w-full border border-slate-200 rounded-md p-2 py-3 
          focus-within:border-blue-500
          focus-within:border-1 text-slate-600
          "
          >
            <BiSearch className="text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Search customer"
              className="flex-1 focus:none text-sm 
              // remove default input focus
              outline-none
              "
              onChange={searchCustomer}
            />
          </div>
        </div>
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={filterredCustomer}
          columns={customerColumns.concat(actionColumn)}
          sx={{
            border: "none",
            // borderColor: "red",
          }}
          // pageSize={9}
          // rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default CustomerPage;
