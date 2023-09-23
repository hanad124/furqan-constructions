"use client";

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChevronCircleRight,
  FaChevronUp,
} from "react-icons/fa";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";
import { menuItems } from "@/data/menuItems";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar = () => {
  const { setTheme } = useTheme();
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const handleMenuClick = (index: any) => {
    setActiveMenuIndex(index === activeMenuIndex ? null : index);
  };

  const router = useRouter();
  const handleSignOut = async () => {
    signOut(getAuth(firebaseApp));
    router.push("/login");
  };
  return (
    <div>
      {" "}
      <div className="sidebar hidden md:block h-screen sticky top-0 border-r w-64 ">
        {/* logo */}
        <div className="flex items-center ml-5 mt-5 gap-3">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-8"
          />
          <span className="text-2xl font-semibold"> Furqan</span>
        </div>
        <ul className="menu py-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`  ${activeMenuIndex === index ? "" : ""}`}
            >
              <Link
                href="#"
                className="flex items-center py-3 px-4  "
                onClick={() => handleMenuClick(index)}
              >
                <item.icon className="mr-4 text-lg" />
                <span>{item.text}</span>
                {item.submenus.length > 0 && (
                  <span className="ml-auto">
                    {activeMenuIndex === index ? (
                      <FiChevronDown className="ml-auto" />
                    ) : (
                      <FiChevronRight className="ml-auto" />
                    )}
                  </span>
                )}
              </Link>
              {item.submenus.length > 0 && (
                <ul
                  className={`submenu ml-6 ${
                    activeMenuIndex === index ? "block" : "hidden"
                  }`}
                >
                  {item.submenus.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link href={submenu.url}>
                        <p className="block py-2 px-4 ">{submenu.text}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center w-full md:hidden mt-2">
        <Sheet>
          <SheetTrigger>
            <div className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </div>
          </SheetTrigger>
          <SheetContent side={"left"} className="overflow-y-scroll">
            <SheetHeader>
              <SheetDescription className="overflow-y-scroll">
                <div className="flex items-center ml-5 mt-5 gap-3">
                  <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-8"
                  />
                  <span className="text-2xl font-semibold"> Furqan</span>
                </div>
                <ul className="menu py-4">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className={`  ${activeMenuIndex === index ? "" : ""}`}
                    >
                      <Link
                        href="#"
                        className="flex items-center py-3 px-4  "
                        onClick={() => handleMenuClick(index)}
                      >
                        <item.icon className="mr-4 text-lg" />
                        <span>{item.text}</span>
                        {item.submenus.length > 0 && (
                          <span className="ml-auto">
                            {activeMenuIndex === index ? (
                              <FiChevronDown className="ml-auto" />
                            ) : (
                              <FiChevronRight className="ml-auto" />
                            )}
                          </span>
                        )}
                      </Link>
                      {item.submenus.length > 0 && (
                        <ul
                          className={`submenu ml-6 ${
                            activeMenuIndex === index ? "block" : "hidden"
                          }`}
                        >
                          {item.submenus.map((submenu, subIndex) => (
                            <li key={subIndex}>
                              <Link href={submenu.url}>
                                <p className="block py-2 px-4 ">
                                  {submenu.text}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
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
      </div>
    </div>
  );
};

export default Sidebar;
