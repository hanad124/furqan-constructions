import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BiSolidWallet, BiSolidCart } from "react-icons/bi";

const Widgets = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-4 w-full">
        <div className="flex-1 w-full md:min-w-[12rem] ">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <p className="text-sm text-slate-500 font-normal">Revenue</p>
              </div>
              <div>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-semibold">
                  $4805
                </p>
                <p className="text-green-500 mt-1 font-semibold">+2.5%</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-400/40 rounded-lg mr-6 flex justify-center items-center">
              <BiSolidWallet className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>
        <Card className="flex-1 w-full md:min-w-[12rem] ">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <p className="text-sm text-slate-500 font-normal">Expense</p>
              </div>
              <div>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-semibold">
                  $4805
                </p>
                <p className="text-green-500 mt-1 font-semibold">+2.5%</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-400/40 rounded-lg mr-6 flex justify-center items-center">
              <BiSolidWallet className="text-yellow-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card className="flex-1 w-full md:min-w-[12rem] ">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <p className="text-sm text-slate-500 font-normal">Sales</p>
              </div>
              <div>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-semibold">
                  $4805
                </p>
                <p className="text-green-500 mt-1 font-semibold">+2.5%</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-violet-400/40 rounded-lg mr-6 flex justify-center items-center">
              <BiSolidCart className="text-violet-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card className="flex-1 w-full md:min-w-[12rem] ">
          <div className="flex items-center justify-between">
            <div>
              <div>
                <p className="text-sm text-slate-500 font-normal">Purchase</p>
              </div>
              <div>
                <p className="text-2xl text-slate-700 dark:text-slate-200 font-semibold">
                  $4805
                </p>
                <p className="text-red-500 mt-1 font-semibold">+2.5%</p>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-400/40 rounded-lg mr-6 flex justify-center items-center">
              <BiSolidCart className="text-red-500 text-2xl" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Widgets;
