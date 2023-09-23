"use client";

import React from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FiHome } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiList } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { BiUserPin } from "react-icons/bi";
import { BiDollarCircle } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { BiSolidBank } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logo from "@/public/assets/logo.svg";
import Widgets from "@/components/Widgets";

const Dashboard = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    signOut(getAuth(firebaseApp));
    router.push("/login");
  };
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar className="hidden md:block">
          <div className="flex items-center gap-1 ml-5 mt-3">
            <Image src={logo} className="w-8 h-8" alt="logo" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              Furqan
            </span>
          </div>
          <Menu className="mt-3">
            <MenuItem>
              <div className="flex items-center gap-2">
                <FiHome className="mr-2" />
                <span>Dashboard</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <FiUsers className="mr-2" />
                <span>Employee</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <FiList className="mr-2" />
                <span> Item list</span>
              </div>
            </MenuItem>
            <SubMenu label="Purchcase">
              <MenuItem>Containers</MenuItem>
              <MenuItem> Market </MenuItem>
            </SubMenu>
            <MenuItem>
              <div className="flex items-center gap-2">
                <BiTransfer className="mr-2 text-lg" />
                <span>Transfer</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <BiUserPin className="mr-2 text-lg" />
                <span>Customers</span>
              </div>
            </MenuItem>
            <SubMenu label="Invoice">
              <MenuItem> Cash </MenuItem>
              <MenuItem> Credit </MenuItem>
            </SubMenu>
            <MenuItem>
              <div className="flex items-center gap-2">
                <FiDatabase className="mr-2" />
                <span>Stock</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <BiDollarCircle className="mr-2 text-lg" />
                <span>Expense</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <BiSolidBank className="mr-2 text-lg" />
                <span>Bank</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="mr-2 text-lg" />
                <span>Clearance</span>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2">
                <BiUserCircle className="mr-2 text-lg" />
                <span>Users</span>
              </div>
            </MenuItem>
            <SubMenu label="Report">
              <MenuItem> All report </MenuItem>
              <MenuItem> single reports </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>{" "}
        <div className=" md:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent side={"left"}>
              <SheetHeader>
                <SheetDescription>
                  <Sidebar className="w-full bg-white">
                    {/* <div className="flex items-center gap-1 ml-5 mt-3">
                      <Image src={logo} className="w-8 h-8" alt="logo" />
                      <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
                        Furqan
                      </span>
                    </div> */}
                    <Menu className="mt-3 bg-white">
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <FiHome className="mr-2" />
                          <span>Dashboard</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <FiUsers className="mr-2" />
                          <span>Employee</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <FiList className="mr-2" />
                          <span> Item list</span>
                        </div>
                      </MenuItem>
                      <SubMenu label="Purchcase">
                        <MenuItem>Containers</MenuItem>
                        <MenuItem> Market </MenuItem>
                      </SubMenu>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <BiTransfer className="mr-2 text-lg" />
                          <span>Transfer</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <BiUserPin className="mr-2 text-lg" />
                          <span>Customers</span>
                        </div>
                      </MenuItem>
                      <SubMenu label="Invoice">
                        <MenuItem> Cash </MenuItem>
                        <MenuItem> Credit </MenuItem>
                      </SubMenu>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <FiDatabase className="mr-2" />
                          <span>Stock</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <BiDollarCircle className="mr-2 text-lg" />
                          <span>Expense</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <BiSolidBank className="mr-2 text-lg" />
                          <span>Bank</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="mr-2 text-lg" />
                          <span>Clearance</span>
                        </div>
                      </MenuItem>
                      <MenuItem>
                        <div className="flex items-center gap-2">
                          <BiUserCircle className="mr-2 text-lg" />
                          <span>Users</span>
                        </div>
                      </MenuItem>
                      <SubMenu label="Report">
                        <MenuItem> All report </MenuItem>
                        <MenuItem> single reports </MenuItem>
                      </SubMenu>
                    </Menu>
                  </Sidebar>{" "}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="p-4 flex-1">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
              <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Dashboard;
