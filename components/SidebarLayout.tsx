"use client";

import React from "react";
import Sidebar from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";

const SidebarLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  return <div>{pathname === "/login" ? null : <Sidebar />}</div>;
};

export default SidebarLayout;
