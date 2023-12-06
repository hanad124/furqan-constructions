"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getItems } from "@/utils/db/Items";
import { getCustomers } from "@/utils/db/Customer";
import { Item, Customer } from "@/types/generalTypes";
import { Button } from "@/components/ui/button";
import InvoiceTitle from "@/components/invoice/cash/InvoiceTitle";
import SummaryBanner from "@/components/invoice/cash/SummaryBanner";

import { createCashInvoice, getCashInvoices } from "@/utils/db/CashInvoice";

interface FormField {
  // invoice_number: number;
  customer: string;
  invoice_date: Date;
  item: string;
  quantity: number;
  price: number;
  total: number;
}

export default function CreateInvoice() {
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      quantity: 0,
      price: 0,
      item: "",
      total: 0,
      customer: "",
      // invoice_number: 0,
      invoice_date: new Date(),
    },
  ]);
  const [itemsData, setItemsData] = useState<Item[]>([]);
  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [cumulativeTotal, setCumulativeTotal] = useState<number>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [invoiceData, setInvoiceDate] = useState<Date>(new Date());

  // get items
  useEffect(() => {
    const getItemsData = async () => {
      const itemsData: any = await getItems();

      setItemsData(itemsData);
    };
    getItemsData();
  }, []);

  const filteredItems = itemsData?.filter((item) =>
    item.description.toLowerCase()
  );

  // get Customers
  useEffect(() => {
    const getCustomersData = async () => {
      const customersData: any = await getCustomers();

      setCustomersData(customersData);
    };
    getCustomersData();
  }, []);

  const filteredCustomers = customersData?.filter((customer) =>
    customer.name.toLocaleLowerCase()
  );

  // handle customer change
  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const customer = event.target.value;

    // Update selected customer
    setSelectedCustomer(customer);

    // Update customer name for all form fields
    setFormFields((prevFields) => {
      const updatedFields = prevFields.map((field) => ({
        ...field,
        customer: customer,
      }));
      return updatedFields;
    });
  };

  // get last invoice number and increment it by 1
  useEffect(() => {
    const getInvoiceNumber = async () => {
      try {
        const invoiceData: any = await getCashInvoices();

        const invoiceNumber =
          invoiceData[invoiceData.length - 1].invoice_number;

        const exectInvNum = `INV-${invoiceNumber + 1}`;
        setInvoiceNumber(exectInvNum);
      } catch (error) {
        console.error("Error retrieving invoice number:", error);
      }
    };
    getInvoiceNumber();
  }, []);

  // handle invoice date change
  const handleInvoiceDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const invoiceDate = new Date(event.target.value);

    setInvoiceDate(invoiceDate);

    // Update invoice date for all form fields
    setFormFields((prevFields) => {
      const updatedFields = prevFields.map((field) => ({
        ...field,
        invoice_date: invoiceDate,
      }));
      return updatedFields;
    });
  };

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = {
        ...updatedFields[index],
        [event.target.name]: event.target.value,
      };

      // Calculate the total automatically when quantity or price changes
      const quantity = Number(updatedFields[index].quantity);
      const price = Number(updatedFields[index].price);
      const total = quantity * price;
      updatedFields[index].total = total;

      // Calculate the sum of all the totals
      const summaryTotal = updatedFields.reduce(
        (sum, form) => sum + form.total,
        0
      );
      setCumulativeTotal(summaryTotal);

      //  validate the form
      if (formFields[index].item === "") {
        alert("Please select an item");
      }
      if (formFields[index].quantity === 0) {
        alert("Please enter quantity");
      }
      if (formFields[index].price === 0) {
        alert("Please enter price");
      }

      return updatedFields;
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create the invoice
    await createCashInvoice(formFields);
    console.log(formFields);
  };

  const addFields = () => {
    setFormFields((prevFields) => [
      ...prevFields,
      {
        quantity: 0,
        price: 0,
        item: "",
        total: 0,
        customer: selectedCustomer,
        invoice_date: invoiceData,
      },
    ]);
  };

  const removeFields = (index: number) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1); // Remove the field at the specified index

      // Calculate the sum of all the totals
      const summaryTotal = updatedFields.reduce(
        (sum, form) => sum + form.total,
        0
      );
      setCumulativeTotal(summaryTotal);

      return updatedFields;
    });
  };

  return (
    <div className="mx-4 md:mx-16">
      <InvoiceTitle />

      <form onSubmit={submit}>
        <div className="flex  gap-3 mt-5 w-4/5 md:w-3/5 lg:w-2/5">
          <div
            className="
            flex flex-col gap-6 mt-1
            "
          >
            <p className="font-normal text-slate-600 text-sm text-left flex-shrink-0">
              Invoice Number
            </p>
            <p className="font-normal text-slate-600 text-sm text-left flex-shrink-0">
              Customer Name
            </p>
            <p className="font-normal text-slate-600 text-sm text-left flex-shrink-0">
              Invoice Date
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {" "}
            {/* invoice number field */}
            <div className="">
              <Input
                readOnly
                name="invoice_number"
                type="text"
                placeholder="INV-000"
                value={invoiceNumber}
                className="text-slate-400 w-full lg:w-[10rem] shadow-none justify-end relative right-0"
                // onChange={handleInvoiceNumberChane}
              />
            </div>
            {/* item field */}
            <div className="">
              <select
                className="w-full lg:w-[10rem] shadow-none h-[38px] border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-slate-600 bg-transparent dark:text-white text-sm"
                name="customer"
                onChange={handleCustomerChange}
              >
                <option value="">Select Customer</option>
                {filteredCustomers?.map((customer) => (
                  <option key={customer.name} value={customer.name}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>
            {/* date field */}
            <div className="">
              <Input
                type="date"
                name="date"
                className="w-full lg:w-[10rem] shadow-none text-slate-600"
                onChange={handleInvoiceDateChange}
              />
            </div>
          </div>
        </div>

        <div className="w-full border-b-[1px] border-b-slate-200 my-5"></div>
        {formFields.map((form, index) => (
          <div
            key={index}
            className="relative border border-slate-200 dark:border-slate-700 rounded-lg w-full flex lg:w-5/6 mt-5"
          >
            <div className="flex flex-wrap gap-5 w-full p-5 border-r-[1px] border-r-slate-200">
              <div className="flex flex-col gap-1 ">
                <p className="font-light text-sm mx-1">Item</p>
                <select
                  className="w-full lg:w-[10rem] shadow-none h-[38px] border rounded-md px-2   py-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-transparent dark:text-white"
                  name="item"
                  onChange={(event) => {
                    handleFormChange(event, index);
                  }}
                >
                  <option value="">Select item</option>
                  {filteredItems?.map((item) => (
                    <option key={item.name} value={item.description}>
                      {item.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-light text-sm mx-1">Quantity</p>
                <Input
                  name="quantity"
                  type="number"
                  placeholder="quantity"
                  className="w-full lg:w-[8rem] shadow-none"
                  onChange={(event) => {
                    handleFormChange(event, index);
                  }}
                  value={form.quantity}
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <p className="font-light text-sm mx-1">Price</p>
                <Input
                  name="price"
                  type="number"
                  className="w-full lg:w-[8rem] shadow-none"
                  placeholder="price"
                  onChange={(event) => {
                    handleFormChange(event, index);
                  }}
                  value={form.price}
                />
              </div>
              {/* total field */}
              <div className="flex flex-col gap-1 ">
                <p className="font-light text-sm mx-1">Total</p>
                <Input
                  name="total"
                  type="number"
                  readOnly
                  placeholder="total"
                  className="w-full lg:w-[5rem] shadow-none focus:outline-none"
                  onChange={(event) => {
                    handleFormChange(event, index);
                  }}
                  value={form.total}
                />
              </div>
            </div>
            <div className="relative flex justify-center items-center w-10 ">
              {/* close icon */}
              <button onClick={() => removeFields(index)} className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-700 dark:text-slate-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>{" "}
          </div>
        ))}
        <button
          onClick={addFields}
          type="button"
          className="bg-primary dark:bg-slate-200 text-white dark:text-slate-700 px-8 py-2 rounded-lg my-4"
        >
          Add Item
        </button>
        <br />
        <div className="flex flex-col gap-5">
          <div className="w-full border-b-[1px] border-b-slate-200"></div>
          {/* calculation banner */}
          <SummaryBanner summaryTotal={cumulativeTotal} />
          <div className="w-full border-b-[1px] border-b-slate-200 "></div>
          <Button
            className="bg-primary w-full text-white mb-10 "
            size={"lg"}
            type="submit"
          >
            Create Invoice
          </Button>{" "}
        </div>
      </form>
    </div>
  );
}
