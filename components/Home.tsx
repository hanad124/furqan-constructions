"use client";

import Widgets from "@/components/Widgets";
import Charts from "@/components/Charts";
import DataTable from "@/components/DataTable";

const Home = () => {
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

export default Home;
