"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

const page = () => {
  const Router = useRouter();

  // redirect to the dashboard
  useLayoutEffect(() => {
    Router.replace("/dashboard");
  }, []);
  return <div></div>;
};

export default page;
