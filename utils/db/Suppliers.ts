"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Supplier Operations ##############################

// get suppliers
export const getSuppliers = async () => {
  try {
    await connectToDB();
    const suppliers = await prisma.supplier.findMany();
    return suppliers;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// create supplier
export const createSupplier = async (formData: any) => {
  const { name, phone } = Object.fromEntries(formData);

  console.log("Supplier Data:", name, phone);

  try {
    await connectToDB();

    // Check if Employee with the provided name or phone already exists
    const existingSupplier = await prisma.supplier.findFirst({
      where: {
        phone: phone,
      },
    });

    if (existingSupplier) {
      // throw new Error('User already exists');
      console.log("Supplier already exists");
      return;
    }

    // Create and save the new Employee
    const newSupplier = await prisma.supplier.create({
      data: {
        name,
        phone,
      },
    });

    console.log("New Supplier created successfully:", newSupplier);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/suppliers");
  } catch (err) {
    console.error("Error creating Supplier:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// update supplier
export const updateSupplier = async (formData: any) => {
  const { id, name, phone } = Object.fromEntries(formData);

  try {
    // Initialize the updateFields object
    const updateFields = {
      name,
      phone,
    };

    // Remove properties with undefined or null or "" values from the updateFields object
    for (const key of Object.keys(updateFields)) {
      if (
        updateFields[key as keyof typeof updateFields] === undefined ||
        updateFields[key as keyof typeof updateFields] === null ||
        updateFields[key as keyof typeof updateFields] === ""
      ) {
        delete updateFields[key as keyof typeof updateFields];
      }
    }

    // update the employee
    await prisma.supplier.update({
      where: { id: id },
      data: updateFields,
    });

    console.log(`Supplier with ID ${id} updated successfully`);

    // Revalidate the path after updating the employee
    revalidatePath("/dashboard/suppliers");
  } catch (err) {
    console.error("Error updating Supplier:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// find supplier by id
export const findSupplier = async (id: string) => {
  try {
    await connectToDB();

    // Find the item
    const supplier = await prisma.supplier.findUnique({
      where: {
        id: id,
      },
    });

    console.log("supplier found successfully:", supplier);

    return supplier;
  } catch (err) {
    console.error("Error finding supplier:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
  await prisma.$disconnect(); // Disconnect the Prisma client after the operation
};

// delete supplier
export const deleteSupplier = async (formData: any) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();
    const supplier = await prisma.supplier.delete({
      where: {
        id: id,
      },
    });
    return supplier;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};
