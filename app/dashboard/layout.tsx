import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className={"flex flex-col md:flex-row"}>
        <Sidebar />
        <div className={"flex-1 block"}>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
