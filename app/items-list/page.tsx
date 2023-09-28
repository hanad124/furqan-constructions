"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { itemColumns } from "@/data/itemsColumns";
// import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";

// create a type for the data
interface Item {
  id: string;
  itemname: string;
  modal: string;
}

const page = () => {
  const [data, setData] = useState<Item[]>([]);

  // get all items
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "items-list"),
      (snapShot) => {
        let list: Item[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            itemname: doc.data().itemname,
            modal: doc.data().modal,
          });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // delete user
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, "items-list", id));
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error);
      }
    } else {
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
            <Link href={`/users/edit-user/${params.row.id}`}>
              <div className="editButton px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md border-dotted">
                Edit
              </div>
            </Link>
            <div
              className="deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-slate-600 font-bold">Items List</h1>
        <Link href="/newitem">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new item</span>
          </Button>
        </Link>
      </div>
      <div className="datatable mt-10">
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={data}
          columns={itemColumns.concat(actionColumn)}
          // rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default page;
