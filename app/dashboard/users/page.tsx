"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { userColumns } from "@/data/userColumns";
import { getUsers, deleteUser } from "../../../utils/dbOperations";

// create a type for the data
interface User {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  date?: string;
}

const page = () => {
  const [data, setData] = useState<readonly User[]>([]);
  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      if (users) {
        const mapUser = (user: User): User => {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            date: user.createdAt.toString().slice(4, 16),
          };
        };

        const transformedUsers = users.map(mapUser);
        setData(transformedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();

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
            <Link href={`/users/edit-user/${params.row.id}`}>
              <div className="editButton px-3 py-1 border border-yellow-500 text-yellow-500 rounded-md border-dotted">
                Edit
              </div>
            </Link>

            <form action={deleteUser}>
              <input type="hidden" name="id" value={params.row.id} />
              <button
                type="submit"
                className="deleteButton px-3 py-1 border border-red-500 text-red-500 rounded-md border-dotted cursor-pointer"
                onClick={() => {
                  fetchUsers();
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
        <h1 className="text-xl text-slate-600 font-bold">Users</h1>
        <Link href="/dashboard/newuser">
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
        />
      </div>
    </div>
  );
};

export default page;
