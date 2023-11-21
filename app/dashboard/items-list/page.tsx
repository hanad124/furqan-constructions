"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { itemColumns } from "@/data/itemsColumns";
import { deleteItem } from "@/utils/db/Items";
import { getItems } from "@/utils/db/Items";

import { revalidatePath } from "next/cache";

// create a type for the data
interface Item {
  id: string;
  name: string;
  modal: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const page = () => {
  const [data, setData] = useState<readonly Item[]>([]);
  const fetchItems = async () => {
    try {
      const items = await getItems();
      if (items) {
        const mappedItems = (employee: Item): Item => {
          return {
            id: employee.id,
            name: employee.name,
            modal: employee.modal,
            description: employee.description,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
          };
        };

        const transformedUsers = items.map(mappedItems);
        setData(transformedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchItems();

    // cleanup function
    return () => {};
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params: any) => {
        return (
          <div className="cellAction flex gap-3">
            <Link href={`/dashboard/items-list/edit-item/${params.row.id}`}>
              <div className="editButton px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md border-dotted">
                Edit
              </div>
            </Link>

            <form action={deleteItem}>
              <input type="hidden" name="id" value={params.row.id} />
              <button
                type="submit"
                className="deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer"
                onClick={() => {
                  fetchItems();
                }}
              >
                Delete
              </button>
            </form>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-slate-600 font-bold">Items</h1>
        <Link href="/dashboard/newItem">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new Item</span>
          </Button>
        </Link>
      </div>
      <div className="datatable mt-10">
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={data}
          columns={itemColumns.concat(actionColumn)}
          // pageSize={9}
          // rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default page;
