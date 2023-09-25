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
      <div className="p-4 flex-1 w-full">
        <Widgets />
        <Charts />
        <DataTable />
      </div>{" "}
    </>
  );
};

export default Dashboard;
