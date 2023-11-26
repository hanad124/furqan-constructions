"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Stocks Operations ##############################

// Get Stocks
export const getStocks = async () => {
  try {
    await connectToDB();
    const stocks = await prisma.stock.findMany();
    return stocks;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// Create Stock
export const createStock = async (formData: any) => {
  const { stock, quantity } = formData;

  try {
    await connectToDB();

    const quantityNumber = Number(quantity);

    // Check if Stock with the provided name or phone already exists
    const existingStock = await prisma.stock.findFirst({
      where: {
        stock: stock,
      },
    });

    if (existingStock) {
      // throw new Error('User already exists');
      console.log("Stock already exists");
      return;
    }

    // Create and save the new Stock
    const newStock = await prisma.stock.create({
      data: {
        stock,
        quantity: quantityNumber,
      },
    });

    console.log("New Stock created successfully:", newStock);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/stock");
  } catch (err) {
    console.error("Error creating Stock:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// Update Stock
export const updateStock = async (formData: any) => {
  const { id, stock, quantity } = Object.fromEntries(formData);

  const quantityNumber = Number(quantity);

  try {
    // Initialize the updateFields object
    const updateFields = {
      stock,
      quantity: quantityNumber,
    };

    // remove empty fields
    for (const key of Object.keys(updateFields)) {
      if (
        updateFields[key as keyof typeof updateFields] === undefined ||
        updateFields[key as keyof typeof updateFields] === null ||
        updateFields[key as keyof typeof updateFields] === ""
      ) {
        delete updateFields[key as keyof typeof updateFields];
      }
    }

    // update the Stock
    await prisma.stock.update({
      where: {
        id: id,
      },
      data: updateFields,
    });

    console.log("Stock updated successfully");

    // Revalidate the path after updated the stock
    revalidatePath("/dashboard/stock");
  } catch (err) {
    console.error("Error updating Stock:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// find Stock
export const findStockById = async (id: string) => {
  try {
    await connectToDB();
    const stock = await prisma.stock.findUnique({
      where: {
        id: id,
      },
    });

    console.log("Stock found successfully");

    return stock;
  } catch (err) {
    console.error("Error finding stock:", err);
  }
};

// Delete Stock
export const deleteStock = async (formData: any) => {
  const { id } = formData;

  try {
    await connectToDB();

    // Delete the stock
    await prisma.stock.delete({
      where: {
        id: id,
      },
    });

    console.log("Stock deleted successfully");

    // Revalidate the path after deleting the stock
    revalidatePath("/dashboard/stock");
  } catch (err) {
    console.error("Error deleting stock:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};
