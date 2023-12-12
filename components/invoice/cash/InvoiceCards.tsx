"use client";

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
import { useState, useEffect } from "react";

import { getCustomers } from "@/utils/db/Customer";
import { getCashInvoices, getCashInvoiceItem } from "@/utils/db/CashInvoice";
import formatNumber from "@/providers/numberFormatProvider";

const InvoiceCards = () => {
  const [customers, setCustomers] = useState<number>(0);
  const [invoices, setInvoices] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // get customers by counting its length
  useEffect(() => {
    const getCustomersCount = async () => {
      const customers = await getCustomers();
      // setCustomers(customers);

      const customersCount = customers?.length;

      setCustomers(customersCount!);

      console.log(customers?.length);
    };
    getCustomersCount();

    return () => {};
  }, []);

  // get invoices by counting its length
  useEffect(() => {
    const getInvoicesCount = async () => {
      const invoices = await getCashInvoices();
      // setCustomers(customers);

      const invoicesCount = invoices?.length;

      setInvoices(invoicesCount!);

      const invoiceItems = await getCashInvoiceItem();

      // calculate total amount
      let total = 0;
      invoiceItems?.map((item) => {
        console.log(item.total);
        total += item.total;
      });
      console.log(total);
      setTotalAmount(total);
    };
    getInvoicesCount();

    return () => {};
  }, []);

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
                  {formatNumber(customers)}
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
                  {formatNumber(invoices)}
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
                  ${formatNumber(totalAmount)}
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
                  ${formatNumber(0)}
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
