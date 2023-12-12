"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";

import { getPurchases } from "@/utils/db/Purchase";
import { getStocks } from "@/utils/db/Stocks";
import { createTransfer } from "@/utils/db/Transfer";

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
  to: z.string().min(2, {
    message: "to must be at least 2 characters.",
  }),
  item: z.string().min(2, {
    message: "item must be at least 2 characters.",
  }),
  quantity: z.number().min(1, {
    message: "quantity must be at least 1 characters.",
  }),
  price: z.number().min(1, {
    message: "price must be at least 1 characters.",
  }),
  total: z.number().min(1, {
    message: "total must be at least 1 characters.",
  }),
  date: z.date().optional(),
});

type Purchase = {
  id: string;
  item: string;
  supplier: string;
  quantity: number;
  price: number;
  total: number;
  place: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Stock {
  id: string;
  stock: string;
  item: string;
  supplier: string;
  quantity: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function Newtransfer() {
  const [value, setValue] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [purchID, setPurchID] = useState("");

  // get purchases
  useEffect(() => {
    const getPurchasesData = async () => {
      const purchasesData: any = await getPurchases();

      setPurchases(purchasesData);
    };
    getPurchasesData();
  }, []);

  // get stocks
  useEffect(() => {
    const getStocksData = async () => {
      const stocksData: any = await getStocks();

      // remove duplicate stocks
      const stocksDataMap = new Map<string, number>();

      stocksData.forEach((stock: Stock) => {
        if (!stocksDataMap.has(stock.stock)) {
          stocksDataMap.set(stock.stock, stock.quantity);
        }
      });

      // convert the map to an array
      const stocksDataArray: Stock[] = [];
      stocksDataMap.forEach((value: number, key: string) => {
        // add unique id to each stock
        const id = Math.floor(Math.random() * 1000000).toString();
        stocksDataArray.push({
          id,
          stock: key,
          item: "",
          supplier: "",
          quantity: value,
          price: 0,
          total: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });

      setStocks(stocksDataArray);
    };
    getStocksData();
  }, []);

  const filteredStocks = stocks?.filter((stock) =>
    stock.stock.toLowerCase().includes(value.toLowerCase())
  );

  const filteredPurchases = purchases?.filter((purchase) => {
    // just fetch purchases that are not transfered yet
    if (purchase.status.toLocaleLowerCase() === "transferred") {
      return false;
    }
    return (purchase.item + " - " + purchase.quantity)
      .toLowerCase()
      .includes(value2.toLowerCase());
  });

  // handle stock change
  const handleStockChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("to", event.target.value);
    console.log("shop to:", event.target.value);
  };

  // handle purchase change
  const handlePurchaseChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    form.setValue("item", event.target.value);
    console.log("Item:", event.target.value);
  };

  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "",
      item: "",
      quantity: 0,
      price: 0,
      total: 0,
      date: new Date(),
    },
  });

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

  // handle submit
  const onSubmit = async (data: any) => {
    // add purchase id to the data
    data.id = purchID;
    console.log("dataID:", data.id);
    setLoading(true);
    try {
      toast.promise(
        createTransfer(data),
        {
          loading: "Transferring transection...",
          success: "Transection transferred successfully!",
          error: "Failed to transfer. Please try again.",
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
      // Handle any errors that occurred during employee creation
      toast.error("Failed to transfer. Please try again.");
    }
  };

  return (
    <>
      <div className="mx-4">
        <div className="mt-20">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-5 w-full ">
                <input type="text" hidden name="id" value={purchID} />
                {/* stock field */}
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[13rem] ">
                      <FormLabel> Shop to</FormLabel>
                      <FormControl>
                        <select
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                          {...field}
                          onChange={handleStockChange}
                        >
                          <option value="">Shop to</option>
                          {filteredStocks?.map((stock) => (
                            <option key={stock.id} value={stock.stock}>
                              {stock.stock}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* item to stranfer field */}
                <FormField
                  control={form.control}
                  name="item"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[13rem]  ">
                      <FormLabel> Item 2 transfer</FormLabel>
                      <FormControl>
                        <select
                          className="w-full md:w-[13rem] h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                          {...field}
                          onChange={handlePurchaseChange}
                        >
                          <option value="">Select item 2 transfer</option>
                          {filteredPurchases.map((purchase) => {
                            console.log(purchase);
                            setPurchID(purchase.id);
                            console.log("purchID:", purchID);
                            return (
                              <option
                                key={purchase.id}
                                value={
                                  purchase.item + " - " + purchase.quantity
                                }
                              >
                                {purchase.item + " - " + purchase.quantity}
                              </option>
                            );
                          })}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[14rem]">
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Date"
                          type="date"
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split("T")[0]
                              : field.value
                          }
                          onChange={(e) => {
                            const value = new Date(e.target.value);
                            field.onChange(value);
                          }}
                        />
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
