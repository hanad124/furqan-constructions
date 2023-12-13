"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import AllStocks from "@/components/report/stock/AllStocks";
import Link from "next/link";
import { BiPrinter } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const StockReportPage = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });
  return (
    <div className="p-4">
      <div className="flex justify-between items-center px-4">
        <h1 className="text-xl text-slate-600 font-bold">All Stocks Report</h1>
        <Button className="text-white bg-primary" onClick={handlePrint}>
          <BiPrinter className="text-lg mr-2" />
          <span className="">Print report</span>
        </Button>
      </div>{" "}
      <AllStocks ref={componentRef} />
    </div>
  );
};

export default StockReportPage;
