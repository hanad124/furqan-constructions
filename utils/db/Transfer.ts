"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Transfer Operations ##############################

// Get all Transfers
export const getTransfers = async () => {
  try {
    await connectToDB();
    const transfers = await prisma.transfer.findMany();
    return transfers;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// Create Transfer
export const createTransfer = async (formData: any) => {
  const { to, item, date, quantity, price, total } = formData;

  console.log("formData: ", formData);

  try {
    await connectToDB();

    // Create and save the new Transfer
    // const newTransfer = await prisma.transfer.create({
    //   data: {
    //     to,
    //     item,
    //     date,
    //     quantity,
    //     price,
    //     total,
    //   },
    // });

    // save this data into stock according to "to"
    const stockItem = await prisma.stock.findFirst({
      where: {
        item: item,
      },
    });

    if (stockItem) {
      console.log("item already exists");
      // return;
      // update the stock
      const updateStock = await prisma.stock.update({
        where: {
          id: stockItem.id,
        },
        data: {
          quantity: stockItem.quantity + quantity,
          total: stockItem.total + total,
        },
      });
      console.log("updated stock: ", updateStock);
    } else {
      // create new stock
      const createStock = await prisma.stock.create({
        data: {
          stock: to,
          item: item,
          quantity: quantity,
          price: price,
          total: total,
        },
      });
      console.log("created stock: ", createStock);
    }

    // console.log("New Transfer created successfully:", newTransfer);

    // Revalidate the path after creating the transfer
    revalidatePath("/dashboard/transfer");
  } catch (err) {
    console.error(" Error in createTransfer: ", err);
  }
};

// Update Transfer
export const updateTransfer = async (FormData: any) => {
  const { id, to, item, date, quantity, price, total } = FormData;

  try {
    await connectToDB();

    // change [price, quantity, total] to number
    const priceNumber = Number(price);
    const quantityNumber = Number(quantity);
    const totalNumber = parseFloat(total);

    // Initialize the updateFields object
    const updateFields: any = {
      to,
      item,
      date,
      quantity: quantityNumber,
      price: priceNumber,
      total: totalNumber,
    };

    // Remove undefined fields
    for (const key of Object.keys(updateFields)) {
      if (
        updateFields[key as keyof typeof updateFields] === undefined ||
        updateFields[key as keyof typeof updateFields] === null ||
        updateFields[key as keyof typeof updateFields] === ""
      ) {
        delete updateFields[key as keyof typeof updateFields];
      }
    }

    // Update the Transfer
    const updatedTransfer = await prisma.transfer.update({
      where: {
        id: id,
      },
      data: updateFields,
    });

    console.log("Transfer updated successfully:", updatedTransfer);

    // Revalidate the path after updating the transfer
    revalidatePath("/dashboard/transfer");
  } catch (err) {
    console.error(" Error in updateTransfer: ", err);
  }
};

// Delete Transfer
export const deleteTransfer = async (id: string) => {
  try {
    await connectToDB();

    // Delete the Transfer
    await prisma.transfer.delete({
      where: {
        id: id,
      },
    });

    console.log(`Transfer with ID ${id} deleted successfully`);

    // Revalidate the path after deleting the transfer
    revalidatePath("/dashboard/transfer");
  } catch (err) {
    console.error(" Error in deleteTransfer: ", err);
  }
};

// Find Transfer
export const findTransferById = async (id: string) => {
  try {
    await connectToDB();

    // Find the Transfer
    const transfer = await prisma.transfer.findUnique({
      where: {
        id: id,
      },
    });

    console.log("Transfer found successfully:", transfer);

    return transfer;
  } catch (err) {
    console.error(" Error in findTransfer: ", err);
  }
};
