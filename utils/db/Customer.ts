"use server";

import prisma from "@/prisma";
import { connectToDB } from "../database";
import { revalidatePath } from "next/cache";

// ############################## Customer Operations ##############################

// Get all customers
export const getCustomers = async () => {
  try {
    await connectToDB();
    const customers = await prisma.customer.findMany();
    return customers;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

// Create new customer
export const createCustomer = async (formData: any) => {
  const { name, phone } = formData;

  try {
    await connectToDB();

    // Check if Employee with the provided name or phone already exists
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        name: name,
      },
    });

    if (existingCustomer) {
      // throw new Error('User already exists');
      console.log("Customer already exists");
      return {
        error: "Customer already exists",
      };
    }

    // Create and save the new Employee
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        phone,
      },
    });

    console.log("New Customer created successfully:", newCustomer);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/customers");
  } catch (err) {
    console.error("Error creating Customer:", err);
    return {
      error: "Error creating customer",
    };
  }
};

// Update Customer
export const updateCustomer = async (formData: any) => {
  const { id, name, phone } = formData;

  try {
    await connectToDB();

    const updateFields = {
      name,
      phone,
    };

    for (const key of Object.keys(updateFields)) {
      if (
        updateFields[key as keyof typeof updateFields] === undefined ||
        updateFields[key as keyof typeof updateFields] === null ||
        updateFields[key as keyof typeof updateFields] === ""
      ) {
        delete updateFields[key as keyof typeof updateFields];
      }
    }

    // update customer
    const updatedCustomer = await prisma.customer.update({
      where: {
        id: id,
      },
      data: updateFields,
    });

    console.log("Customer updated successfully:", updatedCustomer);

    // Revalidate the path after updating the customer
    revalidatePath("/dashboard/customers");
  } catch (err) {
    console.error("Error updating customer:", err);
    return {
      error: "Error updating customer",
    }; // Re-throw the error to propagate it further if needed
  }
};

// find customer by id
export const findCustomerById = async (id: string) => {
  try {
    await connectToDB();

    // find customer
    const customer = await prisma.customer.findUnique({
      where: { id: id },
    });

    console.log("Customer found successfully:", customer);

    return customer;
  } catch (error) {
    console.error("Error finding customer", error);
  }
};

// delete customer
export const deleteCustomer = async (formData: any) => {
  const id = formData;

  try {
    await connectToDB();

    // delete customer
    const deletedCustomer = await prisma.customer.delete({
      where: { id: id },
    });

    console.log("Customer deleted successfully:", deletedCustomer);

    // Revalidate the path after deleting the customer
    revalidatePath("/dashboard/customers");
  } catch (error) {
    console.log("error deleting customer", error);
    return {
      error: "error deleting customer",
    };
  }
};
