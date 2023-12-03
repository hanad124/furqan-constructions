"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "@/public/assets/logo-light.svg";
import Image from "next/image";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import ItemForm from "@/components/ItemForm";
import { getItems } from "@/utils/db/Items";
import { Item } from "@/types/generalTypes";

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
  item: z.string().min(4, {
    message: "Item must be at least 4 characters.",
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
  const [items, setItems] = useState<Item[]>([]);

  // get items
  useEffect(() => {
    const getItemsData = async () => {
      const itemsData: any = await getItems();

      setItems(itemsData);
    };
    getItemsData();
  }, []);

  const filteredItems = items.filter((item) => item.description.toLowerCase());

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
      item: "",
    },
  });

  // handle item change
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("item", event.target.value);
    console.log("Item:", event.target.value);
  };

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Successfully submitted!");
  }

  return (
    <>
      <div className="mx-4 md:mx-16">
        {/* <h1 className="text-xl text-slate-600 font-bold mt-8">
          Create Invoice
        </h1> */}
        <div className="flex justify-between flex-wrap mt-10 gap-y-10">
          <div className="ml-1 flex items-center gap-4">
            <Image
              src={logo}
              alt="logo"
              className="w-7 md:w-10 h-7 md:h-10"
              width={100}
              height={100}
            />
            <h1 className="uppercase font-bold text-slate-600 dark:text-slate-200 mt-1 text-xl md:text-2xl">
              Furqan
            </h1>
          </div>
          <div className="flex flex-col gap-4 justify-end">
            <p className="text-2xl uppercase  text-start md:text-end font-bold text-slate-700 dark:text-slate-200 ">
              invoice
            </p>
            <p className="text-xl  text-start md:text-end justify-start uppercase font-bold text-slate-700 dark:text-slate-200">
              sales order{" "}
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-start md:text-end text-sm font-medium">
              sales@furqan.so | +252 61 448 81 01
            </p>
            <div className="flex  gap-8 mt-6">
              <div className="flex flex-col gap-6 uppercase text-slate-700 dark:text-slate-200 mt-2 text-sm">
                <p>bill to :</p>
                <p>invoice number :</p>
                <p>invoice date :</p>
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
                              <Input
                                placeholder="customer name"
                                className="shadow-none"
                                {...field}
                              />
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
                              <Input
                                placeholder="INV-0002 "
                                className="shadow-none"
                                {...field}
                              />
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
                                      "w-[240px] pl-3 text-left font-normal  shadow-none",
                                      !field.value &&
                                        " shadow-none text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 shadow-none" />
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
                className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-full flex lg:w-5/6 mt-5"
              >
                <div className="flex flex-wrap gap-5 w-full p-8 border-r-[1px] border-r-slate-200">
                  {/* item field */}
                  <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-[15rem]  ">
                        <FormControl>
                          <select
                            className="w-full md:w-[15rem] h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                            {...field}
                            onChange={handleItemChange}
                          >
                            <option value="">Select item</option>
                            {filteredItems.map((item) => (
                              <option key={item.name} value={item.description}>
                                {item.description}
                              </option>
                            ))}
                          </select>
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
                            className="p-5 shadow-none"
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
                            className="p-5 shadow-none"
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
                            className="p-5 shadow-none"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="relative flex justify-center items-center w-10 ">
                  {/* close icon */}
                  <button onClick={removeItem} className="relative">
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
              </form>
            </Form>
          ))}
        </div>
        <button
          onClick={addItem}
          className="bg-primary dark:bg-slate-200 text-white dark:text-slate-700 px-8 py-2 rounded-lg my-4"
        >
          Add Item
        </button>

        <div className="w-full border-b-[1px] border-b-slate-200 my-5"></div>
        <div className="flex justify-end w-full">
          <div
            className="
         border-[1px] w-56 mx-w-76 rounded-10 border-b-slate-200 p-5 rounded-lg bg-slate-200/10 "
          >
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 text-slate-500">
                <p>Subtotal : </p>
                <p>Discount : </p>
              </div>
              <div className="flex flex-col gap-2 text-slate-500">
                <p>$0.00</p>
                <p>$0.00</p>
              </div>
            </div>
            <div className="border-b-[1px] border-b-slate-200 w-full my-4"></div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2 text-slate-500">
                <p>Total : </p>
              </div>
              <div className="flex flex-col gap-2 text-slate-500">
                <p>$0.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border-b-[1px] border-b-slate-200 my-10"></div>
        <Button className="bg-primary w-full text-white mb-10 " size={"lg"}>
          Create Invoice
        </Button>
      </div>
    </>
  );
}
