"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { findItem, updateItem } from "@/utils/db/Items";

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
import { useForm } from "react-hook-form";
import { useRouter, usePathname, redirect } from "next/navigation";
import { useState, useEffect } from "react";

// Define a schema for your form values.
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  modal: z.string().min(1, {
    message: "modal must be at least 1 characters.",
  }),

  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  id: z.string().optional(), // Add the id property
});

export default function UpdateUser({ params }: any) {
  const [loading, setLoading] = useState(false);

  const { id } = params;
  const router = useRouter();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      modal: "",
      description: "",
    },
  });

  // fetch user data by id
  useEffect(() => {
    const fetchItems = async () => {
      const item = await findItem(id);

      form.setValue("name", item?.name ?? "");
      form.setValue("modal", item?.modal ?? "");
      form.setValue("description", item?.description ?? "");
    };
    fetchItems();
  }, []);

  // handle submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // add the id to the data object
    values.id = id;
    //
    const result = await updateItem(values);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      try {
        setLoading(true);
        toast.promise(
          updateItem(values),
          {
            loading: "Updating item...",
            success: "Item updated successfully!",
            error: "Failed to update item. Please try again.",
          },
          {
            style: {
              minWidth: "250px",
            },
          }
        );
        form.reset();
      } catch (error) {
        toast.error("Failed to update item. Please try again.");
      } finally {
        setLoading(false);
      }
    }
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
            onClick={() => {
              router.replace("/dashboard/items-list");
            }}
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
            onClick={() => {
              router.replace("/dashboard/items-list");
            }}
          >
            Back
          </p>
        </div>
        <h1 className="text-xl text-slate-600 font-bold mt-8">
          Update Employee
        </h1>
        <div className="my-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // action={updateItem}
              className="space-y-8"
            >
              <input type="hidden" name="id" value={id} />
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                {/* name field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
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
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>modal</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* description field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>description</FormLabel>
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
                disabled={loading}
                className={`dark:text-white w-full md:w-[11.5rem] mb-10
                c
                 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
              >
                {/* {loading && <BiLoaderAlt className="animate-spin w-4 h-4" />} */}
                <span>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
