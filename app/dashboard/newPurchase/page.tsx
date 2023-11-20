"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPurchase } from "@/utils/db/Purchase";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  status: z.string().min(2, {
    message: "status must be at least 2 characters.",
  }),
  date: z.date(),
});

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  // and many more different frameworks
  {
    value: "angular",
    label: "Angular",
  },
  {
    value: "vue",
    label: "Vue",
  },
  {
    value: "react",
    label: "React",
  },
  {
    value: "svelte",
    label: "Svelte",
  },
  {
    value: "ember",
    label: "Ember",
  },
  {
    value: "aurelia",
    label: "Aurelia",
  },
  {
    value: "backbone",
    label: "Backbone",
  },
  {
    value: "preact",
    label: "Preact",
  },
  {
    value: "riot",
    label: "Riot",
  },
  {
    value: "vanilla",
    label: "Vanilla",
  },
  {
    value: "angularjs",
    label: "AngularJS",
  },
  {
    value: "inferno",
    label: "Inferno",
  },
  {
    value: "mithril",
    label: "Mithril",
  },
  {
    value: "marko",
    label: "Marko",
  },
  {
    value: "hyperapp",
    label: "Hyperapp",
  },
  {
    value: "stimulus",
    label: "Stimulus",
  },
  {
    value: "alpine",
    label: "Alpine",
  },
  {
    value: "moon",
    label: "Moon",
  },
  {
    value: "solid",
    label: "Solid",
  },
  {
    value: "marionette",
    label: "Marionette",
  },
  {
    value: "knockout",
    label: "Knockout",
  },
  {
    value: "dom",
    label: "DOM",
  },
  {
    value: "jquery",
    label: "jQuery",
  },
  {
    value: "zepto",
    label: "Zepto",
  },
  {
    value: "mootools",
    label: "MooTools",
  },
  {
    value: "webix",
    label: "Webix",
  },
  {
    value: "dojo",
    label: "Dojo",
  },
  {
    value: "extjs",
    label: "Ext JS",
  },
];

export default function NewUser() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(value.toLowerCase())
  );

  const displayedFrameworks = filteredFrameworks.slice(0, 10);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const router = useRouter();
  const pathname = usePathname();
  // create a form instance with useForm
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier: "",
      item: "",
    },
  });

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
              //   onSubmit={form.handleSubmit(onSubmit)}
              action={createPurchase}
              className="space-y-8"
            >
              <div className="flex flex-wrap gap-x-3 gap-y-4 w-full">
                {/* supplier field */}
                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Employee name</FormLabel>
                      <FormControl>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between"
                            >
                              {value
                                ? frameworks.find(
                                    (framework) => framework.value === value
                                  )?.label
                                : "Select framework..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search framework..."
                                {...field}
                                value={value}
                                onInput={handleInputChange}
                              />
                              {filteredFrameworks.length === 0 && (
                                <CommandEmpty>No framework found.</CommandEmpty>
                              )}
                              <CommandGroup>
                                {displayedFrameworks.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {framework.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
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
                    <FormItem className="w-full md:w-[19rem]">
                      <FormLabel>Item</FormLabel>
                      <FormControl>
                        <Input placeholder=" Item" {...field} />
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
