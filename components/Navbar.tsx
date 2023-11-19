import * as React from "react";

import ModeSwitcher from "./ModeSwitcher";
import Search from "./Search";
import Avator from "./Avator";

import { Card } from "./ui/card";

export default function Navbar() {
  return (
    <>
      {/* navbar */}
      <Card className="hidden md:flex items-center justify-between flex-wrap p-4 py-3 rounded-none rounded-b-lg bg-white/80 dark:bg-background/80  backdrop-blur-lg  m-4 sticky left-0 top-0 z-50">
        <Search />
        <div className="flex items-center gap-4 cursor-pointer flex-shrink-0 ">
          {/* <ModeSwitcher /> */}
          <Avator />
        </div>
      </Card>
    </>
  );
}
