"use client";

import React from "react";
import Navbar from "./Navbar";
import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const NavbarLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  // check the pathname and if it's /login, don't render the navbar
  useLayoutEffect(() => {
    if (pathname === "/login") {
      return null;
    }
  }, [pathname]);

  return <div>{pathname === "/login" ? null : <Navbar />}</div>;
};

export default NavbarLayout;
