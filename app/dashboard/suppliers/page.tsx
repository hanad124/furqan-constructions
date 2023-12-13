"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus, BiSearch } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { supplierColumns } from "@/data/supplierColumns";
import { getSuppliers, deleteSupplier } from "@/utils/db/Suppliers";

import toast, { Toaster } from "react-hot-toast";

// create a type for the data
interface Supplier {
  id: string;
  name: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const SuppliersPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<readonly Supplier[]>([]);
  const [searchTearm, setSearchTerm] = useState<string>("");

  const fetchSuppliers = async () => {
    try {
      const suppliers = await getSuppliers();
      if (suppliers) {
        const mappedSuppliers = (supplier: Supplier): Supplier => {
          return {
            id: supplier.id,
            name: supplier.name,
            phone: supplier.phone,
            createdAt: supplier.createdAt,
            updatedAt: supplier.updatedAt,
          };
        };

        const transformedSuppliers = suppliers.map(mappedSuppliers);
        setData(transformedSuppliers);
      }
    } catch (error) {
      console.error("Error fetching Suppliers:", error);
    }
  };
  useEffect(() => {
    fetchSuppliers();

    // cleanup function
    return () => {};
  }, []);

  // handle delete
  const handleDelete = async (id: string) => {
    // const result = await deleteSupplier(id);

    // if (result?.error) {
    //   toast.error(result?.error);
    // } else {
    setLoading(true);
    try {
      toast.promise(
        deleteSupplier(id),
        {
          loading: "Deleting supplier...",
          success: "supplier deleted successfully!",
          error: "Failed to delete supplier. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
      fetchSuppliers();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to delete supplier. Please try again.");
    }
    // }
  };

  // filter suppliers
  const filteredSuppliers = data.filter((supplier: Supplier) => {
    return supplier.name.toLowerCase().includes(searchTearm.toLowerCase());
  });

  // handle search
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
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
                href={`/dashboard/suppliers/edit-supplier/${params.row.id}`}
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
                  disabled={loading}
                  className={`deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => {
                    fetchSuppliers();
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
        <h1 className="text-xl text-slate-600 font-bold">Suppliers</h1>
        <Link href="/dashboard/newSupplier">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new Supplier</span>
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
              placeholder="Search supplier"
              className="flex-1 focus:none text-sm 
              // remove default input focus
              outline-none
              "
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={filteredSuppliers}
          columns={supplierColumns.concat(actionColumn)}
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

export default SuppliersPage;
