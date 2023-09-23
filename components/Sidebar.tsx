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
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri";
import Link from "next/link";
import logo from "@/public/assets/logo.svg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Sidebar = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const menuItems = [
    { icon: FaHome, text: "Home", submenus: [] },
    {
      icon: RiDashboardLine,
      text: "Dashboard",
      submenus: [
        { text: "Overview", url: "/dashboard/overview" },
        { text: "Stats", url: "/dashboard/stats" },
      ],
    },
    { icon: FaUsers, text: "Users", submenus: [] },
    { icon: FaCog, text: "Settings", submenus: [] },
  ];

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
      <div className="hidden md:block sidebar h-screen sticky top-0 overflow-y-scroll w-64 bg-gray-800 text-white">
        <ul className="menu py-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={` ${activeMenuIndex === index ? "" : ""}`}
            >
              <Link
                href="#"
                className="flex items-center py-2 px-4 text-gray-400 hover:text-white  "
                onClick={() => handleMenuClick(index)}
              >
                <item.icon className="mr-3" />
                <span>{item.text}</span>
                {item.submenus.length > 0 && (
                  <span className="ml-auto">
                    {activeMenuIndex === index ? (
                      <FaChevronUp className="ml-auto" />
                    ) : (
                      <FaChevronDown className="ml-auto" />
                    )}
                  </span>
                )}
              </Link>
              {item.submenus.length > 0 && (
                <ul
                  className={`submenu ${
                    activeMenuIndex === index ? "block" : "hidden"
                  }`}
                >
                  {item.submenus.map((submenu, subIndex) => (
                    <li key={subIndex}>
                      <Link href={submenu.url}>
                        <p className="block py-2 px-4 text-gray-400 hover:text-white">
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
      </div>
    </div>
  );
};

export default Sidebar;
