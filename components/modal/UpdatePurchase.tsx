"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getSuppliers } from "@/utils/db/Suppliers";
import { getItems } from "@/utils/db/Items";
import toast, { Toaster } from "react-hot-toast";

import { getPurchaseById, updatePurchase } from "@/utils/db/Purchase";

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
import { useForm } from "react-hook-form";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useState, useEffect } from "react";

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

export default function UpdatePurchases({ updateteID }: { updateteID: any }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
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

  const id = updateteID;

  console.log("ID:", id);
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

  // fetch purchase data by id
  useEffect(() => {
    const fetchPurchase = async () => {
      const purchase = await getPurchaseById(id);

      form.setValue("supplier", purchase?.supplier ?? "");
      form.setValue("item", purchase?.item ?? "");
      form.setValue("quantity", purchase?.quantity ?? 0);
      form.setValue("price", purchase?.price ?? 0);
      form.setValue("place", purchase?.place ?? "");
      form.setValue("total", purchase?.total ?? 0);
      // form.setValue("status", purchase?.status ?? "");
    };
    fetchPurchase();
  }, []);

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

  // submit handler
  const onSubmit = async (data: any) => {
    // add the id to the data object
    data.id = id;
    setLoading(true);
    try {
      toast.promise(
        updatePurchase(data),
        {
          loading: "Updating purchase...",
          success: "purchase updated successfully!",
          error: "Failed to update purchase. Please try again.",
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
      console.log(error);
    }
    router.replace("/dashboard/purchase");
  };

  return (
    <>
      <div className="">
        <div className="my-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // action={updatePurchase}
              className="space-y-8"
            >
              <input type="text" hidden name="id" value={id} />
              <div className="flex flex-wrap gap-x-3 gap-y-5 w-full ">
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-5 flex-1">
                    {/* supplier field */}
                    <FormField
                      control={form.control}
                      name="supplier"
                      render={({ field }) => (
                        <FormItem className="w-full  ">
                          <FormLabel className="text-sm text-slate-600 ml-2">
                            {" "}
                            Supplier
                          </FormLabel>
                          <FormControl>
                            <select
                              className="w-full  h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                              {...field}
                              onChange={handleSupplierChange}
                            >
                              <option value="">Select supplier</option>
                              {filteredSuppliers.map((supplier) => (
                                <option
                                  key={supplier.name}
                                  value={supplier.name}
                                >
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
                        <FormItem className="w-full  ">
                          <FormLabel> Item</FormLabel>
                          <FormControl>
                            <select
                              className="w-full h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                              {...field}
                              onChange={handleItemChange}
                            >
                              <option value="">Select item</option>
                              {filteredItems.map((item) => (
                                <option
                                  key={item.name}
                                  value={item.description}
                                >
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
                        <FormItem className="w-full  ">
                          <FormLabel className="text-sm text-slate-600 ml-2">
                            Quantity
                          </FormLabel>
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
                  </div>
                  <div className="flex flex-col gap-5 flex-1">
                    {/* price */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem className="w-full  ">
                          <FormLabel className="text-sm text-slate-600 ml-2">
                            Price
                          </FormLabel>
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
                        <FormItem className="w-full ">
                          <FormLabel className="text-sm text-slate-600 ml-2">
                            Place
                          </FormLabel>
                          <FormControl>
                            <select
                              id="place"
                              {...field}
                              onChange={handlePlaceChange}
                              className="w-full  h-[38px] border rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
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
                        <FormItem className="w-full  ">
                          <FormLabel className="text-sm text-slate-600 ml-2">
                            Total
                          </FormLabel>
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
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full">
                <Button
                  type="submit"
                  size={"lg"}
                  disabled={loading}
                  className={`dark:text-white w-24 px-24 mb-10
                 ${
                   loading ? "bg-primary/60 cursor-not-allowed" : "bg-primary"
                 }`}
                >
                  {/* {loading && <BiLoaderAlt className="animate-spin w-4 h-4" />} */}
                  <span>Submit</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* <Toaster /> */}
    </>
  );
}
