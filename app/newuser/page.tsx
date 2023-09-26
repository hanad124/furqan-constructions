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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// Define a schema for your form values.
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number format. Please enter a 10-digit number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  role: z.string().optional(),
});

export default function NewUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    },
  });

  // Define a submit handler that will receive the form values.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl text-slate-600 font-bold">New User</h1>
        <div className="mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-8 w-full">
                {/* username field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
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
                {/* password field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* role field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder=" " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" size={"lg"} className="dark:text-white">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
