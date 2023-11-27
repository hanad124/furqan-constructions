"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Avator from "./Avator";

import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { BiCircle } from "react-icons/bi";
import Link from "next/link";
import logo from "@/public/assets/logo-light.svg";
import { menuItems } from "@/data/menuItems";

import { useTheme } from "next-themes";
import { signOut } from "@/auth";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "./ui/card";
import { BiSearch, BiLogOut } from "react-icons/bi";

const Sidebar = ({ user }: any) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [access, setAccess] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleMenuClick = (index: any) => {
    const clickedMenuItem = menuItems[index];

    if (activeMenuIndex === index && clickedMenuItem.url !== "/dashboard") {
      setActiveMenuIndex(null);
    } else {
      setActiveMenuIndex(index);
    }

    if (clickedMenuItem.url === "/dashboard") {
      setActiveTab(index);
    } else if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  const allowedMenuItemsForUser = new Set([
    "Dashboard",
    "Users",
    "Employees",
    "Reports",
    "Suppliers",
    "Item List",
    "Transfer",
    "Purchase",
    "Stock",
    "Expense",
    "Bank",
    "Clearance",
    // Add other allowed menu items for the "user" role
  ]);

  // sign out handler
  const handleSignOut = async () => {
    // "use server";
    await signOut();
    router.push("/login");
  };

  return (
    <div>
      {" "}
      <div className="sidebar hidden md:block sticky top-0 border-salte-300 dark:border-slate-600 border-r w-60 min-h-screen ">
        {/* logo */}
        <div className="flex items-center ml-8 py-4 gap-3 ">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-8"
          />
          <span className="text-2xl font-semibold"> Furqan</span>
        </div>
        <ul className="menu my-3 h-full overflow-y-scroll pb-28">
          {menuItems.map((item, index) => {
            const isActive =
              pathname === item.url ||
              (item.submenus.length > 0 &&
                item.submenus.some((submenu) => pathname === submenu.url));

            if (pathname === "/" && (item.url === "/dashboard" || isActive)) {
              return true;
            }

            if (
              user.user.role === "user" &&
              allowedMenuItemsForUser.has(item.text)
            ) {
              return null;
            }

            return (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`flex items-center py-1 px-4 `}
                  onClick={() => handleMenuClick(index)}
                >
                  <div
                    className={`${
                      isActive
                        ? "bg-primary text-white hover:bg-primary cursor-pointer"
                        : "text-slate-600 dark:text-[#949bbd] hover:bg-primary/10 cursor-pointer"
                    } flex items-center w-full py-[7px] px-4 rounded-md cursor-pointer`}
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
                  </div>
                </Link>
                {item.submenus.length > 0 && (
                  <ul
                    className={`submenu mx-4 cursor-pointer ${
                      activeMenuIndex === index
                        ? "block duration-300"
                        : "hidden"
                    }`}
                  >
                    {item.submenus.map((submenu, subIndex) => {
                      const isSubmenuActive = pathname === submenu.url;

                      return (
                        <li
                          key={subIndex}
                          className={`pl-7 rounded-md hover:bg-primary/5 ${
                            isSubmenuActive ? "bg-primary/10" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <BiCircle className="w-3" />
                            <Link href={submenu.url}>
                              <p className="block py-2 text-sm px-4">
                                {submenu.text}
                              </p>
                            </Link>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
          {/* sign out form  */}
          <form action={handleSignOut}>
            <button
              type="submit"
              className=" mx-4 text-slate-600 dark:text-[#949bbd hover:bg-primary/10 flex items-center  py-[7px] px-4 rounded-md cursor-pointer"
            >
              <BiLogOut className="mr-4 text-lg rotate-180" />
              Log out
            </button>
          </form>
        </ul>
      </div>
      <div className="flex justify-between items-center w-full  mt-2 md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
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
          <SheetContent side={"left"} className="= h-full overflow-y-scroll">
            <SheetHeader>
              <SheetDescription className="">
                <div className="flex items-center  py-4 gap-3">
                  <Image
                    src={logo}
                    alt="logo"
                    width={100}
                    height={100}
                    className="w-8"
                  />
                  <span className="text-2xl font-semibold"> Furqan</span>
                </div>
                <ul className="menu my-3 h-full overflow-y-scroll pb-28">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className={`flex items-center py-1  `}
                        onClick={() => handleMenuClick(index)}
                      >
                        <div
                          className={`${
                            activeTab === index
                              ? "bg-primary text-white hover:bg-primary"
                              : " text-slate-600 dark:text-[#949bbd] hover:bg-primary/10"
                          } flex items-center w-full py-[7px] px-4 rounded-md`}
                        >
                          <item.icon className="mr-4 text-lg" />
                          <span className="text-lg">{item.text}</span>
                          {item.submenus.length > 0 && (
                            <span className="ml-auto">
                              {activeMenuIndex === index ? (
                                <FiChevronDown className="ml-auto" />
                              ) : (
                                <FiChevronRight className="ml-auto" />
                              )}
                            </span>
                          )}
                        </div>
                      </Link>
                      {item.submenus.length > 0 && (
                        <ul
                          className={`submenu pl-3 ${
                            activeMenuIndex === index
                              ? "block duration-300"
                              : "hidden"
                          }`}
                        >
                          {item.submenus.map((submenu, subIndex) => (
                            <li
                              key={subIndex}
                              className="pl-2 hover:bg-primary/5 rounded-md "
                            >
                              <div className="flex items-center">
                                <BiCircle className="w-3" />
                                <Link href={submenu.url}>
                                  <p className="block py-2 text-sm px-4">
                                    {submenu.text}
                                  </p>
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                  <div className="mt-4 py-3 border-t border-t-slate-300 flex flex-col gap-y-4 ml-5">
                    <div className="flex  items-center gap-5">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <p>Hanad Mohamed</p>
                        <button className="text-red-500 hover:text-red-600 text-left">
                          Sign Out
                        </button>
                      </div>
                    </div>

                    <Card
                      className="flex items-center gap-2 px-2 py-2 min-w-[15rem] rounded-md cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <BiSearch className="h-5 w-5 text-gray-400" />
                      <p className="text-slate-400"> search</p>
                    </Card>
                  </div>
                  <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        {/* <div className="flex items-center flex-shrink-0  mr-6">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
