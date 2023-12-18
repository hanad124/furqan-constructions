import React from "react";

const TotalBanner = ({ total }: { total: number }) => {
  return (
    <div>
      <div className="flex justify-end w-full mt-5">
        <div
          className="
border-[1px] w-56 mx-w-76 rounded-10 border-b-slate-200 p-5 rounded-lg bg-slate-200/10 "
        >
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>Subtotal : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>${total}</p>
            </div>
          </div>
          <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>Total : </p>
            </div>
            <div className="flex flex-col gap-2 text-slate-800 font-medium">
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalBanner;
