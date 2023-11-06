"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "../../../../public/assets/logo-light.svg";
import Image from "next/image";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { toast } from "@/components/ui/use-toast";
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
import { db } from "../../../../firebaseConfig";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

// Define a schema for your form values.
const formSchema = z.object({
  customername: z.string().min(4, {
    message: "customer nanme must be at least 4 characters.",
  }),
  invDate: z.date({
    required_error: "Invoice Date is required.",
  }),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  invoiceNumber: z
    .string()
    .min(1, {
      message: "invoiceNumber must be at least 1 characters.",
    })
    .optional(),
});

// get current date
const date = new Date();
const dayDate = date.getDate();
const monthDate = date.getMonth();
const yearDate = date.getFullYear();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function NewUser() {
  // create a form instance with useForm
  // dadte of birth
  const temDob = new Date();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invDate: temDob,
      dueDate: temDob,
      invoiceNumber: "",
      customername: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Successfully submitted!");
  }

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl text-slate-600 font-bold mt-8">
          Create Invoice
        </h1>
        <div className="flex  justify-between  flex-wrap md mt-10 gap-y-10">
          <div className="ml-3">
            <Image
              src={logo}
              alt="logo"
              className="w-24 h-24"
              width={100}
              height={100}
            />
            <h1 className="uppercase font-bold text-slate-700 dark:text-slate-200 mt-1 text-lg">
              Furqan <br /> Constructions
            </h1>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <p className="text-lg uppercase text-end font-bold text-slate-700 dark:text-slate-200">
              invoice
            </p>
            <p className="text-lg text-right justify-start uppercase font-bold text-slate-700 dark:text-slate-200">
              Furqan Constructions
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-end">
              finance@furqan.co | +252 61 448 81 01
            </p>
            <div className="flex  gap-8 mt-6">
              <div className="flex flex-col gap-5 uppercase text-slate-700 dark:text-slate-200">
                <p>bill to:</p>
                <p>invoice number:</p>
                <p>invoice date:</p>
                <p>due:</p>
              </div>
              <div className="flex flex-col gap-2 text-end uppercase text-slate-700 dark:text-slate-200">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="flex flex-col gap-2 w-full">
                      {/* customer name field */}
                      <FormField
                        control={form.control}
                        name="customername"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[15rem]">
                            <FormControl>
                              <Input placeholder="customer name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* invoice number field */}
                      <FormField
                        control={form.control}
                        disabled
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[15rem]">
                            <FormControl>
                              <Input placeholder="INV-0002 " {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* invoice date field */}
                      <FormField
                        control={form.control}
                        name="invDate"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[15rem]">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* due field */}
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-[15rem]">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* <Button
                      type="submit"
                      size={"lg"}
                      className="dark:text-white w-full md:w-[11.5rem] mb-10"
                    >
                      Submit
                    </Button> */}
                    <Toaster />
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          {/* <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                <FormField
                  control={form.control}
                  name="itemname"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[15rem]">
                      <FormLabel>Item name</FormLabel>
                      <FormControl>
                        <Input placeholder="item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="modal"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[15rem]">
                      <FormLabel>Modal</FormLabel>
                      <FormControl>
                        <Input placeholder="Modal " {...field} />
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
          </Form> */}
        </div>
      </div>
    </>
  );
}
