"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPurchase } from "@/utils/db/Purchase";
import { getSuppliers } from "@/utils/db/Suppliers";
import { getItems } from "@/utils/db/Items";

import toast, { Toaster } from "react-hot-toast";

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

import { Input } from "@/components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import React from "react";

// Define a schema for your form values.
const formSchema = z.object({
  supplier: z.string().min(2, {
    message: "supplier must be at least 2 characters.",
  }),
  item: z.string().min(2, {
    message: "item must be at least 2 characters.",
  }),
  // [qauntity:number, , price:float, place:string, total:float, status:string, date:date]
  quantity: z.number().min(1, {
    message: "quantity must be at least 1 characters.",
  }),
  price: z.number().min(1, {
    message: "price must be at least 1 characters.",
  }),
  place: z.string().min(2, {
    message: "place must be at least 2 characters.",
  }),
  total: z.number().min(1, {
    message: "total must be at least 1 characters.",
  }),
  // status: z.string().min(2, {
  //   message: "status must be at least 2 characters.",
  // }),
});

type Suppliers = {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Item {
  id: string;
  name: string;
  modal: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NewPurchase() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  // get suppliers
  useEffect(() => {
    const getSuppliersData = async () => {
      const suppliersData: any = await getSuppliers();

      setSuppliers(suppliersData);
    };
    getSuppliersData();
  }, []);

  // get items
  useEffect(() => {
    const getItemsData = async () => {
      const itemsData: any = await getItems();

      setItems(itemsData);
    };
    getItemsData();
  }, []);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(value.toLowerCase())
  );

  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(value2.toLowerCase())
  );

  // handle supplier change
  const handleSupplierChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    form.setValue("supplier", event.target.value);
    console.log("Supplier:", event.target.value);
  };

  // handle item change
  const handleItemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("item", event.target.value);
    console.log("Item:", event.target.value);
  };

  const router = useRouter();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      item: "",
      quantity: 0,
      price: 0,
      place: "",
      total: 0,
      // status: "",
      // date: new Date() || "",
    },
  });

  // const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   form.setValue("status", event.target.value);
  //   console.log("Status:", event.target.value);
  // };

  // handle place change
  const handlePlaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("place", event.target.value);
    console.log("Place:", event.target.value);
  };

  // calculate total automatically when quantity and price changes
  const calculateTotal = () => {
    const quantity = form.getValues("quantity");
    const price = form.getValues("price");
    const total = Number(quantity) * Number(price);
    form.setValue("total", total);
  };
  useEffect(() => {
    calculateTotal();
  }, [form.watch("quantity"), form.watch("price")]);
  // handle form submit
  const onSubmit = async (data: any) => {
    // const result = await createPurchase(data);
    // if (result?.error) {
    //   toast.error(result?.error);
    // } else {
    setLoading(true);
    try {
      toast.promise(
        createPurchase(data),
        {
          loading: "Creating purchase...",
          success: "purchase created successfully!",
          error: "Failed to create purchase. Please try again.",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      setLoading(false);
      // reset the form
      form.reset();
    } catch (error) {
      // Handle any errors that occurred during purchase creation
      toast.error("Failed to create purchase. Please try again.");
    }
    // }
  };

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
        <h1 className="text-xl text-slate-600 font-bold mt-8">New Purchase</h1>
        <div className="my-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // action={createPurchase}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-x-3 gap-y-5 w-full ">
                {/* supplier field */}
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[13rem] ">
                      <FormLabel> Supplier</FormLabel>
                      <FormControl>
                        <select
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                          {...field}
                          onChange={handleSupplierChange}
                        >
                          <option value="">Select supplier</option>
                          {filteredSuppliers.map((supplier) => (
                            <option key={supplier.name} value={supplier.name}>
                              {supplier.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* item field */}
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[13rem]  ">
                      <FormLabel> Item</FormLabel>
                      <FormControl>
                        <select
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
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

                {/* quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[14rem] ">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quantity"
                          {...field}
                          type="number"
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
                {/* price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[14rem] ">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price"
                          {...field}
                          type="number"
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
                {/* place */}
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[14rem]">
                      <FormLabel>Place</FormLabel>
                      <FormControl>
                        <select
                          id="place"
                          {...field}
                          onChange={handlePlaceChange}
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                        >
                          <option value="container">container</option>
                          <option value="market">market</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* total */}
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[14rem] ">
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Total"
                          type="number"
                          readOnly
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* status */}
                {/* <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel className="">Status</FormLabel> <br />
                      <FormControl>
                        <select
                          id="status"
                          {...field}
                          onChange={handleStatusChange}
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-4  py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                        >
                          <option value="pending">pending</option>
                          <option value="approved">approved</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              <Button
                type="submit"
                size={"lg"}
                disabled={loading}
                className={`dark:text-white w-full mb-10
                 ${
                   loading ? "bg-primary/60 cursor-not-allowed" : "bg-primary"
                 }`}
              >
                {/* {loading && <BiLoaderAlt className="animate-spin w-4 h-4" />} */}
                <span>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Toaster />{" "}
    </>
  );
}
