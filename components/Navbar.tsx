"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { setTheme } = useTheme();

  return (
    <>
      {/* navbar */}
      <nav className="flex items-center justify-between flex-wrap  p-6 shadow-md">
        <div className="flex items-center flex-shrink-0  mr-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-black dark:text-white border-black dark:border-white hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <rect fill="none" height="20" width="20" />
              <path
                d="M0,3.5C0,2.6715729,0.6715729,2,1.5,2h17c0.8284271,0,1.5,0.6715729,1.5,1.5S19.3284271,5,18.5,5h-17C0.6715729,5,0,4.3284271,0,3.5z
                    M0,10.5C0,9.6715729,0.6715729,9,1.5,9h17c0.8284271,0,1.5,0.6715729,1.5,1.5S19.3284271,12,18.5,12h-17C0.6715729,12,0,11.3284271,0,10.5z
                    M0,17.5C0,16.6715736,0.6715729,16,1.5,16h17c0.8284271,0,1.5,0.6715729,1.5,1.5S19.3284271,19,18.5,19h-17C0.6715729,19,0,18.3284264,0,17.5z"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
