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
    const customerSet = new Set(formData.map((item) => item.customer));
    const invoiceDateSet = new Set(formData.map((item) => item.invoice_date));

    const otherFields: Partial<FormData>[] = formData.map((item) => {
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
    const newInvoiceNumber = (lastInvoiceNumber + 1)
      .toString()
      .padStart(3, "0");

    await prisma.$connect();

    // Check if the item is in the stock and accumulate quantities
    const accumulatedQuantities = new Map<string, number>();

    await Promise.all(
      otherFields.map(async (item) => {
        const existingStock = await prisma.stock.findMany({
          where: {
            item: item.item,
          },
        });

        if (existingStock && existingStock.length > 0) {
          const totalQuantity = existingStock.reduce((accumulator, stock) => {
            accumulator += stock.quantity;
            return accumulator;
          }, 0);

          accumulatedQuantities.set(item.item, totalQuantity);
        } else {
          // If the item is not in the stock, return an error
          throw new Error(`Item not found in stock: ${item.item}`);
        }
      })
    );

    // Update quantity and total in the stock
    await Promise.all(
      Array.from(accumulatedQuantities.entries()).map(
        async ([itemName, totalQuantity]) => {
          if (itemName != undefined) {
            console.log(
              "Item name:",
              itemName,
              "Total quantity:",
              totalQuantity
            );
            const existingStock = await prisma.stock.findFirst({
              where: {
                item: itemName,
              },
            });

            if (existingStock) {
              const updatedQuantity = existingStock.quantity - totalQuantity;

              // Check if the quantity is sufficient in the stock
              if (updatedQuantity < 0) {
                throw new Error(
                  `Insufficient quantity in stock for item: ${itemName}`
                );
              }

              const updatedTotal =
                existingStock.total - totalQuantity * existingStock.price;

              // Update the stock record
              await prisma.stock.update({
                where: {
                  id: existingStock.id,
                },
                data: {
                  quantity: updatedQuantity,
                  total: updatedTotal,
                },
              });
            }
          }
        }
      )
    );

    // Create and save the new Cash Invoice
    const newCashInvoice = await prisma.cashInvoice.create({
      data: {
        invoice_number: Number(newInvoiceNumber),
        customer: customerSet.values().next().value,
        invoice_date: invoiceDateSet.values().next().value,
        items: {
          create: otherFields.map((item) => ({
            item: item.item || "",
            quantity: Number(item.quantity) || 0,
            price: Number(item.price) || 0,
            total: Number(item.total) || 0,
          })),
        },
      },
    });

    console.log("New Cash Invoice created successfully:", newCashInvoice);

    // Revalidate the path after creating the invoice
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

// Delete Cash Invoice
export const deleteCashInvoice = async (invoiceId: string) => {
  try {
    await prisma.$connect();

    // Find the Cash Invoice by its unique identifier (id)
    const cashInvoiceToDelete = await prisma.cashInvoice.findUnique({
      where: {
        id: invoiceId,
      },
      include: {
        items: true, // Include associated items
      },
    });

    if (!cashInvoiceToDelete) {
      throw new Error(`Cash Invoice not found with id: ${invoiceId}`);
    }

    // Delete associated Cash Invoice Items first
    await prisma.cashInvoiceItem.deleteMany({
      where: {
        invoice_id: invoiceId,
      },
    });

    // Delete the Cash Invoice
    await prisma.cashInvoice.delete({
      where: {
        id: invoiceId,
      },
    });

    // Update stock quantities based on the deleted invoice
    await Promise.all(
      cashInvoiceToDelete.items.map(async (item) => {
        const existingStock = await prisma.stock.findFirst({
          where: {
            item: item.item,
          },
        });

        if (existingStock) {
          const updatedQuantity = existingStock.quantity + item.quantity;
          const updatedTotal =
            existingStock.total + item.quantity * existingStock.price;

          // Update the stock record
          await prisma.stock.update({
            where: {
              id: existingStock.id,
            },
            data: {
              quantity: updatedQuantity,
              total: updatedTotal,
            },
          });
        }
      })
    );

    console.log("Cash Invoice deleted successfully:", invoiceId);

    // Revalidate the path after deleting the invoice
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
