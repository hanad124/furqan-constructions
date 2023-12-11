"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

interface FormData {
  customer: string;
  invoice_date: Date;
  item: string;
  quantity: number;
  price: number;
  total: number;
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

// get Cash Invoice by ID
export const getCashInvoiceById = async (id: string) => {
  try {
    await connectToDB();
    const cashInvoice = await prisma.cashInvoice.findUnique({
      where: {
        id: id,
      },
    });
    return cashInvoice;
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
        invoice_number: Number(
          (lastInvoiceNumber + 1).toString().padStart(3, "0")
        ),
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

// update cash invoice
export const updateCashInvoice = async (formData: FormData[], id: string) => {
  try {
    const customerSet = new Set(formData?.map((item) => item.customer));
    const invoiceDateSet = new Set(formData?.map((item) => item.invoice_date));

    const otherFields: Array<Partial<FormData>> = formData.map((item) => {
      const { customer, invoice_date, ...rest } = item;
      return rest;
    });

    await connectToDB();

    // Update the Cash Invoice
    const updatedCashInvoice = await prisma.cashInvoice.update({
      where: {
        id: id,
      },
      data: {
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

    console.log("Cash Invoice updated successfully:", updatedCashInvoice);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/cash-invoice-list");
  } catch (err) {
    console.error("Error updating Cash Invoice:", err);
    return {
      error: "Error updating Cash Invoice",
    };
  } finally {
    await prisma.$disconnect();
  }
};

// delete cash invoice and its items
export const deleteCashInvoice = async (id: string) => {
  console.log("id", id);
  try {
    await connectToDB();

    // delete cash invoice items
    const deletedCashInvoiceItem = await prisma.cashInvoiceItem.delete({
      where: {
        id: id,
      },
    });

    console.log(
      "Cash Invoice Item deleted successfully:",
      deletedCashInvoiceItem
    );

    // Delete the Cash Invoice
    const deletedCashInvoice = await prisma.cashInvoice.delete({
      where: {
        id: id,
      },
    });

    console.log("Cash Invoice deleted successfully:", deletedCashInvoice);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/cash-invoice-list");
  } catch (err) {
    console.error("Error deleting Cash Invoice:", err);
    return {
      error: "Error deleting Cash Invoice",
    };
  } finally {
    await prisma.$disconnect();
  }
};
