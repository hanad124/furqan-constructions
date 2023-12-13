"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const Page = () => {
  const Router = useRouter();

  // redirect to the dashboard
  useLayoutEffect(() => {
    Router.replace("/dashboard");
  }, []);
  return <div></div>;
};

export default Page;
