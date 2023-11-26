import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/auth";
import { findUserByEmail } from "@/utils/dbOperations";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await auth();
  return (
    <div>
      <div className={"flex flex-col md:flex-row"}>
        <Sidebar user={user} />
        <div className={"flex-1 block"}>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
