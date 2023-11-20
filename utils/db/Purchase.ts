"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Purchase Operations ##############################

// get all purchases
export const getPurchases = async () => {
  try {
    await connectToDB();
    const purchases = await prisma.purchase.findMany();
    return purchases;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// get purchase by id
export const getPurchaseById = async (id: string) => {
  try {
    await connectToDB();
    const purchase = await prisma.purchase.findUnique({
      where: { id: id },
    });
    return purchase;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// create purchase
export const createPurchase = async (formData: any) => {
  const { supplier, item, quantity, price, place, total, status, date } =
    Object.fromEntries(formData);

  try {
    await connectToDB();

    // Create and save the new Purcha
    const newPurchase = await prisma.purchase.create({
      data: {
        supplier: supplier,
        item: item,
        quantity: quantity,
        price: price,
        place: place,
        total: total,
        date: date,
        status: status,
      },
    });

    console.log("New Purchase created successfully:", newPurchase);

    // Revalidate the path after creating the Purchase
    revalidatePath("/dashboard/purchase");
  } catch (err) {
    console.error("Error creating Purchase:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// update purchase
export const updatePurchase = async (formData: any) => {
  const { id, supplier, item, quantity, price, place, total, date, status } =
    Object.fromEntries(formData);

  try {
    await connectToDB();

    // Update the Purchase
    const updatedPurchase = await prisma.purchase.update({
      where: { id: id },
      data: {
        supplier: supplier,
        item: item,
        quantity: quantity,
        price: price,
        place: place,
        total: total,
        date: date,
        status: status,
      },
    });

    console.log("Purchase updated successfully:", updatedPurchase);

    // Revalidate the path after updating the Purchase
    revalidatePath("/dashboard/purchase");
  } catch (err) {
    console.error("Error updating Purchase:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// delete purchase
export const deletePurchase = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();

    // Delete the Purchase
    const deletedPurchase = await prisma.purchase.delete({
      where: { id: id },
    });

    console.log("Purchase deleted successfully:", deletedPurchase);

    // Revalidate the path after deleting the Purchase
    revalidatePath("/dashboard/purchase");
  } catch (err) {
    console.error("Error deleting Purchase:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};
