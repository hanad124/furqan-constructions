"use server";

import User from "../models/User";
import prisma from "@/prisma";
import { connectToDB } from "./database";
import { revalidatePath } from "next/cache";
// import hashPassword from "../providers/PasswordHassher";

// ############################## User Operations ##############################
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

export const createUser = async (formData: any) => {
  const { username, email, password, phone, role } =
    Object.fromEntries(formData);

  try {
    await connectToDB();

    // Check if user with the provided email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      // throw new Error('User already exists');
      console.log("User already exists");
      return;
    }

    // const hashedPassword = await hashPassword(password);

    // Create and save the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        phone,
        role,
      },
    });

    console.log("New user created successfully:", newUser);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/users");
  } catch (err) {
    console.error("Error creating user:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

export const updateUser = async (formData: any) => {
  const { id, username, email, password, phone, role } =
    Object.fromEntries(formData);

  try {
    // Initialize the updateFields object
    const updateFields = {
      username,
      email,
      phone,
      role,
      password,
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

    // update the user
    await prisma.user.update({
      where: { id: id },
      data: updateFields,
    });

    console.log(`User with ID ${id} updated successfully`);

    // Revalidate the path after updating the user
    revalidatePath("/dashboard/users");
  } catch (err) {
    console.error("Error updating user:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ username });
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

export const findUserById = async (userId: string) => {
  try {
    // Find the user by ID using Prisma
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    // Ensure the database connection is established
    await prisma.$connect();

    // Check if the user with the specified ID exists before attempting to delete
    const userToDelete = await prisma.user.findUnique({
      where: {
        id: id, // Assuming the ID is of type integer
      },
    });

    if (!userToDelete) {
      console.log("User not found");
      return;
    }

    // Delete the user with the specified ID using Prisma
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    console.log(`User with ID ${id} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting user with ID ${id}:`, err);
    throw err; // Re-throw the error to propagate it further if needed
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }

  revalidatePath("/dashboard/users");
};

// ############################## End User Operations ##############################

// ############################## Employee Operations ##############################
export const getEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany();
    return employees;
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client after the operation
  }
};

export const createEmployee = async (formData: any) => {
  const { name, phone } = formData;

  console.log(name, phone);

  try {
    await connectToDB();

    // Check if Employee with the provided name or phone already exists
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        phone: phone,
      },
    });

    if (existingEmployee) {
      // throw new Error('User already exists');
      console.log("Employee already exists");
      return;
    }

    // Create and save the new Employee
    const newEmployee = await prisma.employee.create({
      data: {
        name,
        phone,
      },
    });

    console.log("New Employee created successfully:", newEmployee);

    // Revalidate the path after creating the user
    revalidatePath("/dashboard/employee");
  } catch (err) {
    console.error("Error creating Employee:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

export const updateEmployee = async (formData: any) => {
  const { id, name, phone } = formData;

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
    await prisma.employee.update({
      where: { id: id },
      data: updateFields,
    });

    console.log(`Employee with ID ${id} updated successfully`);

    // Revalidate the path after updating the employee
    revalidatePath("/dashboard/employees");
  } catch (err) {
    console.error("Error updating employee:", err);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

export const findEmployeeById = async (employeeId: string) => {
  try {
    // Find the employee by ID using Prisma
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    return employee;
  } catch (err) {
    console.log(err);
  }
};

export const deleteEmployee = async (formData: any) => {
  const id = formData;
  console.log(id);
  try {
    // Ensure the database connection is established
    await prisma.$connect();

    // Check if the employee with the specified ID exists before attempting to delete
    const employeeToDelete = await prisma.employee.findUnique({
      where: {
        id: id, // Assuming the ID is of type integer
      },
    });

    if (!employeeToDelete) {
      console.log("Employee not found");
      return;
    }

    // Delete the employee with the specified ID using Prisma
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    console.log(`Employee with ID ${id} deleted successfully`);
  } catch (err) {
    console.error(`Error deleting employee with ID ${id}:`, err);
    throw err; // Re-throw the error to propagate it further if needed
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }

  revalidatePath("/dashboard/employees");
};

// ####################### End Employee Operations ############################
