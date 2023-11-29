"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { createStock } from "@/utils/db/Stocks";
import { createEntity } from "@/utils/db/Entities";

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// Define a schema for your form values.
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  // quantity: z.number().min(1, {
  //   message: "quantity must be at least 1.",
  // }),
});

export default function NewEmployee() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      // quantity: 0,
    },
  });

  const onSubmit = async (data: any) => {
    const result = await createEntity(data);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      try {
        setLoading(true);
        toast.promise(
          createEntity(data),
          {
            loading: "Creating entity...",
            success: "Entity created successfully!",
            error: "Failed to create entity. Please try again.",
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
        toast.error("Failed to create entity. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="mx-4">
        {/* back button */}
        {/* <div className="flex items-center gap-x-2">
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
        </div> */}
        <h1 className="text-xl text-slate-600 font-bold mt-8">New Enetity</h1>
        <div className="my-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                {/* stock field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Entity name</FormLabel>
                      <FormControl>
                        <Input placeholder="entity name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* quantity field */}
                {/* <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="quantity"
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
                /> */}
              </div>

              <Button
                type="submit"
                size={"lg"}
                disabled={loading}
                className={`dark:text-white w-full md:w-[19rem] mb-10
                 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary"}`}
              >
                {/* {loading && <BiLoaderAlt className="animate-spin w-4 h-4" />} */}
                <span>Submit</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Toaster />{" "}
      {/* Add the Toaster component to display the toast notifications */}
    </>
  );
}
