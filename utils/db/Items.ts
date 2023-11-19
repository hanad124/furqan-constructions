"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Items Operations ##############################
export const getItems = async () => {
  try {
    await connectToDB();
    const items = await prisma.item.findMany();
    return items;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

export const createItem = async (formData: any) => {
  const { name, modal } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Check if Employee with the provided name or phone already exists
    const existingItem = await prisma.item.findFirst({
      where: {
        modal: modal,
      },
    });

    if (existingItem) {
      // throw new Error('User already exists');
      console.log("Item already exists");
      return;
    }

    // Create and save the new Employee
    const newItem = await prisma.item.create({
      data: {
        name,
        modal,
      },
    });

    console.log("New Item created successfully:", newItem);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/item-list");
  } catch (err) {
    console.error("Error creating Item:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }

  // try {
  //   await connectToDB();

  //   // Check if item with the provided name already exists
  //   const existingItem = await prisma.item.findFirst({
  //     where: {
  //       modal: modal,
  //     },
  //   });

  //   if (existingItem) {
  //     console.log("Item already exists");
  //     return;
  //   }

  //   // Create and save the new item
  //   const newItem = await prisma.item.create({
  //     data: {
  //       name,
  //       modal,
  //     },
  //   });

  //   console.log("New item created successfully:", newItem);

  //   // Revalidate the path after creating the item
  //   revalidatePath("/dashboard/items");
  // } catch (err) {
  //   console.error("Error creating item:", err);
  //   throw err; // Re-throw the error to propagate it further if needed
  // }
};

// Update Item
export const updateItem = async (formData: any) => {
  const { id, name, modal } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Check if item with the provided name already exists
    const existingItem = await prisma.item.findFirst({
      where: {
        modal: modal,
      },
    });

    if (existingItem) {
      console.log("Item already exists");
      return;
    }

    // Update the item
    const updatedItem = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name,
        modal,
      },
    });

    console.log("Item updated successfully:", updatedItem);

    // Revalidate the path after updating the item
    revalidatePath("/dashboard/items");
  } catch (err) {
    console.error("Error updating item:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// find Item
export const findItem = async (id: string) => {
  try {
    await connectToDB();

    // Find the item
    const item = await prisma.item.findUnique({
      where: {
        id: id,
      },
    });

    console.log("Item found successfully:", item);

    return item;
  } catch (err) {
    console.error("Error finding item:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// Delete Item
export const deleteItem = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Delete the item
    await prisma.item.delete({
      where: {
        id: id,
      },
    });

    console.log("Item deleted successfully");

    // Revalidate the path after deleting the item
    revalidatePath("/dashboard/items-list");
  } catch (err) {
    console.error("Error deleting item:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};
