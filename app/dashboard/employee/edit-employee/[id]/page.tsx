"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import {
  findEmployeeById,
  updateEmployee,
} from "../../../../../utils/dbOperations";

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

  phone: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number format. Please enter a 10-digit number.",
  }),
});

export default function UpdateEmployee({ params }: any) {
  const [loading, setLoading] = useState(false);

  const { id } = params;
  const router = useRouter();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  // fetch user data by id
  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await findEmployeeById(id);

      form.setValue("name", employee?.name ?? "");
      form.setValue("phone", employee?.phone ?? "");
    };
    fetchEmployee();
  }, []);

  // submit handler
  const onSubmit = async (data: any) => {
    // add the id to the data object
    data.id = id;
    setLoading(true);
    try {
      toast.promise(
        updateEmployee(data),
        {
          loading: "Updating employee...",
          success: "Employee updated successfully!",
          error: "Failed to update employee. Please try again.",
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
      router.replace("/dashboard/employee");
    } catch (error) {
      console.log(error);
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
              router.replace("/dashboard/employee");
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
              router.replace("/dashboard/employee");
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <Input placeholder="name" {...field} />
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
          <Toaster />{" "}
        </div>
      </div>
    </>
  );
}
