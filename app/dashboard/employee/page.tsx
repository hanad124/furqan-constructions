"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiPlus, BiSearch } from "react-icons/bi";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { employeeColumns } from "@/data/employeeColumns";
import { getEmployees, deleteEmployee } from "../../../utils/dbOperations";

import toast, { Toaster } from "react-hot-toast";

// create a type for the data
interface Employee {
  id: string;
  name: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeePage = () => {
  const [data, setData] = useState<readonly Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [emID, setEmID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = async () => {
    try {
      const employees = await getEmployees();
      if (employees) {
        const mappedEmployee = (employee: Employee): Employee => {
          setEmID(employee.id);
          return {
            id: employee.id,
            name: employee.name,
            phone: employee.phone,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
          };
        };

        const transformedUsers = employees.map(mappedEmployee);
        setData(transformedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();

    // cleanup function
    return () => {};
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    // add id
    try {
      toast.promise(
        deleteEmployee(id),
        {
          loading: "Deleting employee...",
          success: "Employee deleted successfully!",
          error: "Failed to delete employee. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );
      fetchEmployees();
      setLoading(false);
    } catch (error) {
      // Handle any errors that occurred during employee creation
      toast.error("Failed to delete employee. Please try again.");
    }
  };

  // filter employee
  const filterredEmployee = data.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // search employee
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
              {/* <Link
              href={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton px-3 py-1 border border-green-500 text-green-500 rounded-md border-dotted">
                View
              </div>
            </Link> */}
              <Link href={`/dashboard/employee/edit-employee/${params.row.id}`}>
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
                    fetchEmployees();
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
        <h1 className="text-xl text-slate-600 font-bold">Employees</h1>
        <Link href="/dashboard/newEmployee">
          <Button className="text-white">
            <BiPlus className="text-lg mr-2" />
            <span className="">Add new Employee</span>
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
              placeholder="Search employee"
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
          rows={filterredEmployee}
          columns={employeeColumns.concat(actionColumn)}
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

export default EmployeePage;
