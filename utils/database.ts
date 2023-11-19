import mongoose, { Connection } from "mongoose";
const dbURI = process.env.MONGODB_URI!;

let isConnected: boolean;
let dbInstance: mongoose.Connection;

// export const connectToDB = async (): Promise<mongoose.Connection> => {
//   if (isConnected) {
//     console.log("Using existing database connection");
//     return dbInstance;
//   }

//   try {
//     await mongoose.connect(dbURI);

//     isConnected = true;
//     dbInstance = mongoose.connection;

//     dbInstance.on("connected", () => {
//       console.log("Connected to MongoDB");
//     });

//     dbInstance.on("error", (err) => {
//       console.error(`MongoDB connection error: ${err}`);
//     });

//     dbInstance.on("disconnected", () => {
//       console.log("MongoDB connection disconnected");
//     });

//     return dbInstance;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// };

// export const closeDatabase = async (): Promise<void> => {
//   if (!isConnected) {
//     return;
//   }

//   await mongoose.connection.close();
//   isConnected = false;
//   console.log("Disconnected from MongoDB");
// };

// connect to db using prisma
import { PrismaClient } from "@prisma/client";

export const connectToDB = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log("Connected to DB");
    return prisma;
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error;
  }
};
