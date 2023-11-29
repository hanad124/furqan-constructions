"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Entities Operations ##############################

// Get Stocks
export const getEntities = async () => {
  try {
    await connectToDB();
    const stocks = await prisma.entity.findMany();
    return stocks;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// Create Stock
export const createEntity = async (formData: any) => {
  const { name } = formData;

  try {
    await connectToDB();

    // const quantityNumber = Number(quantity);

    // Check if Entity with the provided name or phone already exists
    const existingEntity = await prisma.entity.findFirst({
      where: {
        name: name,
      },
    });

    if (existingEntity) {
      // throw new Error('Entity already exists');
      console.log("Entity already exists");
      return {
        error: "Entity already exists",
      };
    }

    // Create and save the new Enity
    const newEntity = await prisma.entity.create({
      data: {
        name,
        // quantity: quantityNumber,
      },
    });

    console.log("New Entity created successfully:", newEntity);

    // Revalidate the path after creating the entity
    revalidatePath("/dashboard/entities");
  } catch (err) {
    console.error("Error creating Entity:", err);
    // throw err; // Re-throw the error to propagate it further if needed
    return {
      error: "something went wrong",
    };
  }
};

// Update Stock
export const updateEntity = async (formData: any) => {
  const { id, name } = formData;

  //   const quantityNumber = Number(quantity);

  try {
    // Initialize the updateFields object
    const updateFields = {
      name,
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

    // update the Entity
    await prisma.entity.update({
      where: {
        id: id,
      },
      data: updateFields,
    });

    console.log("Entity updated successfully");

    // Revalidate the path after updated the Entity
    revalidatePath("/dashboard/entities");
  } catch (err) {
    console.error("Error updating Entity:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

// find entity by id
export const findEnetityById = async (id: string) => {
  try {
    await connectToDB();
    const entity = await prisma.entity.findUnique({
      where: {
        id: id,
      },
    });

    console.log("entity found successfully");

    return entity;
  } catch (err) {
    console.error("Error finding entity:", err);
  }
};

// Delete entity
export const deleteEntity = async (formData: any) => {
  const { id } = formData;

  try {
    await connectToDB();

    // Delete the entity
    await prisma.entity.delete({
      where: {
        id: id,
      },
    });

    console.log("Entity deleted successfully");

    // Revalidate the path after deleting the entity
    revalidatePath("/dashboard/entities");
  } catch (err) {
    console.error("Error deleting entity:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};
