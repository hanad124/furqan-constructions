"use server";

import User from "../models/User";
import prisma from "@/prisma";
import Account from "../models/Account";
import { connectToDB } from "./database";
import { revalidatePath } from "next/cache";
// import hashPassword from "../providers/PasswordHassher";

type UpdateFields = {
  username: any;
  email: any;
  phone: any;
  role: any;
  password?: string; // Make password optional since it might be undefined
};

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
  console.log("formData:", formData);

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

  revalidatePath("/users");
};

export const createAccount = async (accountData: any) => {
  return Account.create(accountData);
};

export const getAccounts = async () => {
  await connectToDB();
  try {
    const accounts = await Account.find();
    return accounts;
  } catch (err) {
    console.log(err);
  }
};

export const getAccountById = async (accountId: string) => {
  return Account.findById(accountId);
};

export const updateAccount = async (accountId: string, updatedData: any) => {
  return Account.findByIdAndUpdate(accountId, updatedData, { new: true });
};

export const deleteAccount = async (accountId: string) => {
  return Account.findByIdAndRemove(accountId);
};

// Debit and Credit Operations

export const debitAccount = async (
  accountId: string,
  amount: number
): Promise<any> => {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  const updatedDebit = account.debit + amount;

  const updatedAccount = await Account.findByIdAndUpdate(
    accountId,
    { debit: updatedDebit },
    { new: true }
  );

  return updatedAccount;
};

export const creditAccount = async (
  accountId: string,
  amount: number
): Promise<any> => {
  const account = await Account.findById(accountId);

  if (!account) {
    throw new Error("Account not found");
  }

  const updatedCredit = account.credit + amount;

  const updatedAccount = await Account.findByIdAndUpdate(
    accountId,
    { credit: updatedCredit },
    { new: true }
  );

  return updatedAccount;
};
