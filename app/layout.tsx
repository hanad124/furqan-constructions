"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import Sidebar from "@/components/Sidebar";

import "./globals.css";
// import type { Metadata } from "react-helmet";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!user && pathname !== "/login") {
  //     router.push("/login");
  //   }
  // }, [user, router, pathname]);

  // if (!user && pathname !== "/login") {
  //   router.push("/login");
  //   return null;
  // }

  return (
    <html lang="en">
      <head>
        {/* <title>{metadata.title}</title> */}
        {/* <meta name="description" content={metadata.description} /> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* only display the sidebar & navigation if the path !== login */}
          <div
            className={`${
              pathname !== "/login" ? "flex flex-col md:flex-row" : ""
            }`}
          >
            {/* only display the sidebar if the path !== /login */}
            {pathname !== "/login" && <Sidebar />}
            <div className={`${pathname !== "/login" ? "flex-1" : ""}`}>
              {
                // only display the navbar if the path !== /login
                pathname !== "/login" && <Navbar />
              }
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
