"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoiceCashPreview from "@/components/invoice/cash/InvoceCashPriview";
import { BiPrinter } from "react-icons/bi";

const InvoicePreview = (props: any) => {
  const id = props.params.id;
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row">
        <InvoiceCashPreview id={id} ref={componentRef} />
        {/* print button with icon */}
        <div className="flex flex-col gap-2 mt-10 bg-slate-200/10 border rounded px-5 py-5 ">
          <button
            onClick={handlePrint}
            className="
        flex justify-center items-center rounded-md shadow-md bg-slate-200/10 text-slate-600 p-3 mx-4 lg:mx-0"
          >
            <BiPrinter className="mr-2" />
            Print invoice
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoicePreview;
