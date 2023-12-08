"use client";

import { BiPhone, BiMailSend, BiGlobe } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";

const InvoiceFooter = () => {
  return (
    <div className="bg-slate-200/30 w-full p-4 mt-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <BiPhone className="text-gray-700" />
            <p className="text-sm text-gray-700">+252 61 488 00 00</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <BiMailSend className="text-gray-700" />
            <p className="text-sm text-gray-700">sales@furqan.so</p>
          </div>
        </div>

        <div className="h-full w-10 boder-l-2 bg-red-500 border-l-slate-200"></div>

        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <BiGlobe className="text-gray-700" />
            <p className="text-sm text-gray-700">www.furqan.com</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <CiLocationOn className="text-gray-700" />
            <p className="text-sm text-gray-700">
              bakaaro, 21ka NOV, DAARTA STN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFooter;
