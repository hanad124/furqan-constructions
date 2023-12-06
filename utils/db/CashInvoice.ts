"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

interface FormData {
  quantity: string;
  price: string;
  item: string;
  total: number;
  customer: string;
  invoice_date: Date;
}

// ######################## Cash Invoice Operations ###########################
//  get Cash Invoice
export const getCashInvoices = async () => {
  try {
    await connectToDB();
    const cashInvoices = await prisma.cashInvoice.findMany();
    return cashInvoices;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// get Cash Invoice Item
export const getCashInvoiceItem = async () => {
  try {
    await connectToDB();
    const cashInvoiceItem = await prisma.cashInvoiceItem.findMany();

    return cashInvoiceItem;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// create Cash Invoice
export const createCashInvoice = async (formData: FormData[]) => {
  try {
    const customerSet = new Set(formData?.map((item) => item.customer));
    const invoiceDateSet = new Set(formData?.map((item) => item.invoice_date));

    const otherFields: Array<Partial<FormData>> = formData.map((item) => {
      const { customer, invoice_date, ...rest } = item;
      return rest;
    });

    console.log(otherFields);

    // Create auto invoice number by adding 1 to the last invoice number
    const lastInvoice = await prisma.cashInvoice.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    const lastInvoiceNumber = lastInvoice ? lastInvoice.invoice_number : 0;

    await prisma.$connect();

    // Create and save the new Cash Invoice
    const newCashInvoice = await prisma.cashInvoice.create({
      data: {
        invoice_number: lastInvoiceNumber + 1,
        customer: customerSet.values().next().value,
        invoice_date: invoiceDateSet.values().next().value,
        items: {
          create: otherFields.map((item) => ({
            item: item.item || "", // Provide a default value for item if undefined
            quantity: Number(item.quantity) || 0, // Convert quantity to a number and provide a default value if undefined
            price: Number(item.price) || 0, // Convert price to a number and provide a default value if undefined
            total: Number(item.total) || 0, // Convert total to a number and provide a default value if undefined
          })),
        },
      },
    });

    console.log("New Cash Invoice created successfully:", newCashInvoice);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/cash-invoice-list");
  } catch (err) {
    console.error("Error creating Cash Invoice:", err);
    return {
      error: "Error creating Cash Invoice",
    };
  } finally {
    await prisma.$disconnect();
  }
};
