"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { stockColumns } from "@/data/stockColumns";
import { getStocks, deleteStock } from "@/utils/db/Stocks";

import { revalidatePath } from "next/cache";
import toast, { Toaster } from "react-hot-toast";

// create a type for the data
interface Stock {
  id: string;
  stock: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const page = () => {
  const [data, setData] = useState<readonly Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [emID, setEmID] = useState("");
  const fetchStocks = async () => {
    try {
      const stocks = await getStocks();
      if (stocks) {
        const mappedStocks = (stock: Stock): Stock => {
          setEmID(stock.id);
          return {
            id: stock.id,
            stock: stock.stock,
            quantity: stock.quantity,
            createdAt: stock.createdAt,
            updatedAt: stock.updatedAt,
          };
        };

        const transformedStocks = stocks.map(mappedStocks);
        setData(transformedStocks);
      }
    } catch (error) {
      console.error("Error fetching Stocks:", error);
    }
  };
  useEffect(() => {
    fetchStocks();

    // cleanup function
    return () => {};
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    // add id
    try {
      toast.promise(
        deleteStock(id),
        {
          loading: "Deleting stock...",
          success: "Stock deleted successfully!",
          error: "Failed to delete stock. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
      fetchStocks();
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during stock creation
      toast.error("Failed to delete Stock. Please try again.");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params: any) => {
        return (
          <div className="cellAction flex gap-3">
            <Link
              href={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton px-3 py-1 border border-green-500 text-green-500 rounded-md border-dotted">
                View
              </div>
            </Link>
            <Link href={`/dashboard/stocks/edit-st/${params.row.id}`}>
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
                  fetchStocks();
                }}
              >
                Delete
              </button>
            </form>
            <Toaster />
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-slate-600 font-bold">Stocks</h1>
        <Link href="/dashboard/newStock">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new Stock</span>
          </Button>
        </Link>
      </div>
      <div className="datatable mt-10">
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={data}
          columns={stockColumns.concat(actionColumn)}
        />
      </div>
    </div>
  );
};

export default page;
