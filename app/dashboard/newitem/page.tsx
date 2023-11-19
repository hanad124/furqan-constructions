"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { db } from "../../../firebaseConfig";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// Define a schema for your form values.
const formSchema = z.object({
  itemname: z.string().min(2, {
    message: "itemname must be at least 2 characters.",
  }),
  modal: z.string().min(1, {
    message: "modal must be at least 1 characters.",
  }),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemname: "",
      modal: "",
    },
  });

  // Define a submit handler that will receive the form values.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    try {
      await addDoc(collection(db, "items-list"), {
        itemname: values.itemname,
        modal: values.modal,
        time: dayDate + "/" + months[monthDate] + "/" + yearDate,
      });
      alert("Item has been successfully added!");
      // set form values to empty
      form.setValue("itemname", "");
      form.setValue("modal", "");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl text-slate-600 font-bold mt-8">New Item</h1>
        <div className="my-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                {/* itemname field */}
                <FormField
                  control={form.control}
                  name="itemname"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Item name</FormLabel>
                      <FormControl>
                        <Input placeholder="item name" {...field} />
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
          </Form>
        </div>
      </div>
    </>
  );
}
