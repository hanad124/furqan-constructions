"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "../../../../public/assets/logo-light.svg";
import Image from "next/image";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import ItemForm from "@/components/ItemForm";

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

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";

// Define a schema for your form values.
const formSchema = z.object({
  itemname: z.string().min(4, {
    message: "Item name must be at least 4 characters.",
  }),
  modal: z.string().min(4, {
    message: "Modal must be at least 4 characters.",
  }),
  quantity: z.number().positive({
    message: "Quantity must be a positive number.",
  }),
  price: z.number().positive({
    message: "Price must be a positive number.",
  }),
  total: z
    .number()
    .positive({
      message: "Total must be a positive number.",
    })
    .optional(),
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

export default function CreateInvoice() {
  const [itemCount, setItemCount] = useState(1);

  const addItem = () => {
    setItemCount(itemCount + 1);
  };

  const removeItem = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

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
        <div className="mt-10">
          {/* Render the form items based on the itemCount */}
          {Array.from({ length: itemCount }).map((_, index) => (
            // <ItemForm key={index} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-8 border border-slate-200 dark:border-slate-700 p-8 rounded-lg w-full flex lg:w-5/6"
              >
                <div className="flex flex-wrap gap-5 w-full flex-1">
                  {/* item name field */}
                  <FormField
                    control={form.control}
                    name="itemname"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]">
                        <FormControl>
                          <Input
                            placeholder="item name"
                            className="p-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* modal field */}
                  <FormField
                    control={form.control}
                    name="modal"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]">
                        <FormControl>
                          <Input
                            placeholder="modal "
                            className="p-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* quantity field */}
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]">
                        <FormControl>
                          <Input
                            placeholder="quantity"
                            className="p-5"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* price field */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]">
                        <FormControl>
                          <Input
                            placeholder="price"
                            className="p-5"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* total field */}
                  <FormField
                    control={form.control}
                    name="total"
                    disabled
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]">
                        <FormControl>
                          <Input
                            placeholder="total"
                            className="p-5"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="h-full">
                  {/* close icon */}
                  <button
                    onClick={removeItem}
                    className="absolute right-5 top-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-slate-700 dark:text-slate-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* <Button
                  type="submit"
                  size={"lg"}
                  className="dark:text-white w-full md:w-[11.5rem] mb-10"
                >
                  Submit
                </Button>
                <Toaster /> */}
              </form>
            </Form>
          ))}
        </div>
      </div>

      <button
        onClick={addItem}
        className="bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-700 px-8 py-2 rounded-lg"
      >
        Add Item
      </button>
    </>
  );
}
