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
import { db } from "../../firebaseConfig";

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
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [roll, setRoll] = useState("");
  // const [phone, setPhone] = useState("");

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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // ✅ This will be type-safe and validated.
    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        roll: values.role,
        phone: values.phone,
        username: values.username,
        email: values.email,
        password: values.password,
        time: dayDate + "/" + months[monthDate] + "/" + yearDate,
      });
      alert("User has been successfully added!");
      // set form values to empty
      form.setValue("username", "");
      form.setValue("email", "");
      form.setValue("password", "");
      form.setValue("role", "");
      form.setValue("phone", "");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // handle role change
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("role", event.target.value);
    console.log("ROLE:", event.target.value);
  };

  return (
    <>
      <div className="mx-4">
        <h1 className="text-xl text-slate-600 font-bold mt-8">New User</h1>
        <div className="my-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
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
                      <FormLabel className="">Role</FormLabel> <br />
                      <FormControl>
                        <select
                          id="roll"
                          {...field}
                          onChange={handleRoleChange}
                          className="w-[180px] h-[35px] border rounded-md px-4  py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                        >
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                        </select>
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
