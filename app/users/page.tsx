"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useContext } from "react";
import { userColumns } from "@/data/userColumns";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

// create a type for the data
interface Person {
  id: string;
  username: string;
  roll: string;
  email: string;
  phone: string;
  time: string;
}

const page = () => {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        let list: Person[] = [];
        snapShot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            username: doc.data().username,
            roll: doc.data().roll,
            email: doc.data().email,
            phone: doc.data().phone,
            time: doc.data().time,
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

  const clickUser = (id: string) => {
    sessionStorage.setItem("userID", JSON.stringify(id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params: any) => {
        return (
          <div className="cellAction flex gap-3">
            <Link href="/users/single-user" style={{ textDecoration: "none" }}>
              <div
                className="viewButton px-3 py-1 border border-green-500 text-green-500 rounded-md border-dotted"
                onClick={() => clickUser(params.row.id)}
              >
                View
              </div>
            </Link>
            <Link href="/users/edit-user">
              <div
                className="editButton px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md border-dotted"
                // onClick={() => editUserBtn(params.row.id)}
              >
                Edit
              </div>
            </Link>
            <div
              className="deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer"
              // onClick={() => handleDelete(params.row.id)}
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
        <h1 className="text-xl text-slate-600 font-bold">Users</h1>
        <Link href="/newuser">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new user</span>
          </Button>
        </Link>
      </div>
      <div className="datatable mt-10">
        <DataGrid
          className="datagrid dark:text-slate-200"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          // pageSize={9}
          // rowsPerPageOptions={[9]}
          // checkboxSelection
        />
      </div>
    </div>
  );
};

export default page;
