"use client";

import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";

const page = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-slate-600 font-bold">Employees`</h1>
        <Button className="text-white">
          <BiPlus className="text-lg mr-2" />
          <span className="">Add new employee</span>
        </Button>
      </div>
    </div>
  );
};

export default page;
