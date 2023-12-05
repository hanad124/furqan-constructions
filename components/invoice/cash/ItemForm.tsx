"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "@/public/assets/logo-light.svg";
import Image from "next/image";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
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

const ItemForm = ({ index, removeItem, form }: any) => {
  const [items, setItems] = useState<Item[]>([]);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    form.setValue(`item[${index}].item`, value);
  };

  // get items
  useEffect(() => {
    const getItemsData = async () => {
      const itemsData: any = await getItems();

      setItems(itemsData);
    };
    getItemsData();
  }, []);

  const filteredItems = items.filter((item) => item.description.toLowerCase());

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-full flex lg:w-5/6 mt-5"
      >
        <div className="flex flex-wrap gap-5 w-full p-8 border-r-[1px] border-r-slate-200">
          {/* item field */}
          <FormField
            control={form.control}
            name={`item[${index}].item`}
            render={({ field }) => (
              <FormItem className="w-full md:w-[15rem]">
                <FormControl>
                  <select
                    className="w-full md:w-[15rem] h-[38px] border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
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
            name={`item[${index}].quantity`}
            render={({ field }) => (
              <FormItem className="w-full md:w-[15rem]">
                <FormControl>
                  <Input
                    placeholder="quantity"
                    className="p-5 shadow-none"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* price field */}
          <FormField
            control={form.control}
            name={`item[${index}].price`}
            render={({ field }) => (
              <FormItem className="w-full md:w-[15rem]">
                <FormControl>
                  <Input
                    placeholder="price"
                    className="p-5 shadow-none"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* total field */}
          <FormField
            control={form.control}
            name={`item[${index}].total`}
            render={({ field }) => (
              <FormItem className="w-full md:w-[15rem]">
                <FormControl>
                  <Input
                    readOnly
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
        <div className="flex items-center justify-center w-full p-8">
          {/* remove item button */}
          <button onClick={() => removeItem(index)} className="relative">
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
  );
};

export default ItemForm;
