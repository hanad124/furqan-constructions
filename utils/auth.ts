// // utils/auth.ts
"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../app/models/User";

// const saltRounds = 10;
// const secretKey = process.env.JWT_SECRET || "Hanad_MOHAMED_DAHIR";

// export const hashPassword = async (password: string): Promise<string> => {
//   return bcrypt.hash(password, saltRounds);
// };

// export const comparePasswords = async (
//   inputPassword: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   return bcrypt.compare(inputPassword, hashedPassword);
// };

// export const generateToken = (userId: string): string => {
//   return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
// };

// export const verifyToken = (token: string): any => {
//   return jwt.verify(token, secretKey);
// };

export const authenticate = async (formdata: any) => {
  const { username, password } = formdata;
  console.log("formdata", formdata);
  try {
    await signIn("credentials", {
      username,
      password,
    });
  } catch (error) {
    console.error("Authentication error:", error);
    // throw new Error("Authentication failed");
    // return { success: false };
  }
};
