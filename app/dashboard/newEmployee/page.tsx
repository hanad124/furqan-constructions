"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createEmployee } from "../../../utils/dbOperations";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Define a schema for your form values.
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number format. Please enter a 10-digit number.",
  }),
});

export default function NewUser() {
  const router = useRouter();
  const pathname = usePathname();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // Define a submit handler that will receive the form values.
  //   const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //     // ✅ This will be type-safe and validated.

  //     // set form values to empty
  //     form.setValue("name", "");
  //     form.setValue("phone", "");
  //   };

  return (
    <>
      <div className="mx-4">
        {/* back button */}
        <div className="flex items-center gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-slate-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => router.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <p
            className="text-slate-600 font-bold text-md cursor-pointer"
            onClick={() => router.back()}
          >
            Back
          </p>
        </div>
        <h1 className="text-xl text-slate-600 font-bold mt-8">New Employee</h1>
        <div className="my-10">
          <Form {...form}>
            <form
              //   onSubmit={form.handleSubmit(onSubmit)}
              action={createEmployee}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                {/* name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Employee name</FormLabel>
                      <FormControl>
                        <Input placeholder="employee name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* phone field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                size={"lg"}
                className="dark:text-white w-full md:w-[11.5rem] mb-10"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}