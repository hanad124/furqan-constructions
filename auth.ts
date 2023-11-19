import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./utils/database";
import User, { IUser } from "./models/User";
// import bcrypt from "bcrypt";
import prisma from "@/prisma";
// import { decryptPassword } from "./providers/PasswordHassher";

const login = async (credentials: any) => {
  try {
    // Ensure the database connection is established
    await prisma.$connect();

    // Find the user by username using Prisma
    const user = await prisma.user.findUnique({
      where: {
        username: credentials.username,
      },
    });

    if (!user) throw new Error("User not found");

    // Compare the passwords using bcrypt
    // const isValidPassword = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );

    // if (!isValidPassword) throw new Error("Password is not valid");

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw the error to propagate it further if needed
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.error("NextAuth Error", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }: any) {
      session.username = token.username;
      return session;
    },
  },
});
