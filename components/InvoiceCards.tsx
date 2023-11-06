import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BiSolidCart,
  BiSolidWallet,
  BiCheckDouble,
  BiUser,
  BiFile,
} from "react-icons/bi";
import { FiXCircle } from "react-icons/fi";

const InvoiceCards = () => {
  return (
    <div className="my-10 mx-4">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-4 w-full">
        <Card className="flex-1 w-full md:min-w-[12rem] shadow-none ">
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>
                <p className="text-md text-slate-500 font-normal">Clients</p>
              </CardTitle>
              <CardDescription className="">
                <p className="text-2xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                  45
                </p>
                {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
              </CardDescription>
            </CardHeader>
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
              <BiUser className="text-blue-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card className="flex-1 w-full md:min-w-[12rem] shadow-none">
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>
                <p className="text-md text-slate-500 font-normal">Invoices</p>
              </CardTitle>
              <CardDescription>
                <p className="text-2xl text-slate-600 mt-2 dark:text-slate-200 font-semibold">
                  170
                </p>
                {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
              </CardDescription>
            </CardHeader>
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
              <BiFile className="text-blue-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card className="flex-1 w-full md:min-w-[12rem] shadow-none">
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>
                <p className="text-md text-slate-500 font-normal">Paid</p>
              </CardTitle>
              <CardDescription>
                <p className="text-2xl mt-2 text-slate-600 dark:text-slate-200 font-semibold">
                  $4805
                </p>
                {/* <p className="text-green-500 mt-1 font-semibold">+2.5%</p> */}
              </CardDescription>
            </CardHeader>
            <div className="w-12 h-12 bg-blue-400/20  rounded-lg mr-6 flex justify-center items-center">
              <BiCheckDouble className="text-blue-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card className="flex-1 w-full md:min-w-[12rem]  shadow-none">
          <div className="flex items-center justify-between">
            <CardHeader>
              <CardTitle>
                <p className="text-md text-slate-500 font-normal">Unpaid</p>
              </CardTitle>
              <CardDescription>
                <p className="text-2xl text-slate-600 mt-2 dark:text-slate-200 font-semibold">
                  $1205
                </p>
                {/* <p className="text-red-500 mt-1 font-semibold">+2.5%</p> */}
              </CardDescription>
            </CardHeader>
            <div className="w-12 h-12 bg-blue-400/20 rounded-lg mr-6 flex justify-center items-center">
              <FiXCircle className="text-blue-500 text-2xl" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceCards;
