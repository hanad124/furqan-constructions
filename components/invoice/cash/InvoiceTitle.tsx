"use client";

import React from "react";
import logo from "@/public/assets/logo-light.svg";
import Image from "next/image";

const InvoiceTitle = () => {
  return (
    <div>
      {" "}
      <div className="flex justify-between flex-wrap mt-0 gap-y-10">
        <div className="ml-1 flex flex-col items-center gap-1">
          <Image
            src={logo}
            alt="logo"
            className="w-14 md:w-24 h-14 md:h-24"
            width={100}
            height={100}
          />
          <h1 className="uppercase font-bold text-slate-600 dark:text-slate-200 mt-1 text-xl md:text-2xl">
            Furqan
          </h1>
        </div>
        <div className="flex flex-col gap-2 justify-start mx-4 ">
          <p className="text-2xl uppercase  text-start   text-slate-700 dark:text-slate-200 font-extrabold">
            invoice
          </p>
          <p className="text-xl  text-start justify-start uppercase font-extrabold text-slate-700 dark:text-slate-200">
            sales order{" "}
          </p>
          <p className="text-slate-700 dark:text-slate-200 text-start text-sm font-medium">
            sales@furqan.so | +252 61 488 00 00
          </p>
          <p className="text-slate-700 dark:text-slate-200 text-start text-sm font-medium">
            Bakaaro, 21ka NOV, DAARTA STN
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTitle;
