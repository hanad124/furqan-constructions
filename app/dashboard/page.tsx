"use client";

import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Widgets from "@/components/Widgets";
import Charts from "@/components/Charts";
import DataTable from "@/components/DataTable";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="p-4 flex-1">
          <Navbar />
          <Widgets />
          <Charts />
          <DataTable />
        </div>{" "}
      </div>
    </>
  );
};

export default Dashboard;
