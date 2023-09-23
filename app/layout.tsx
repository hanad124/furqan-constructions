"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

import "./globals.css";
// import type { Metadata } from "react-helmet";
import { Inter } from "next/font/google";
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
