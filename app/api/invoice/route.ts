import connectMongoDB from "@/lib/mongodb";
import CashInvoice from "@/model/invoices";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectMongoDB();
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const cashInvoices = await CashInvoice.find({});
//         res.status(200).json(cashInvoices);
//       } catch (error: any) {
//         res.status(400).json({ success: false, message: error.message });
//       }
//       break;
//     case "POST":
//       try {
//         const cashInvoice = await CashInvoice.create(req.body);
//         res.status(201).json(cashInvoice);
//       } catch (error: any) {
//         res.status(400).json({ success: false, message: error.message });
//       }
//       break;
//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// };

// export default handler;

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     await connectMongoDB();

//     try {
//       const cashInvoice = await CashInvoice.create(req.body);
//       res.status(201).json(cashInvoice);
//     } catch (error: any) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   } else {
//     res
//       .status(400)
//       .json({ success: false, message: "Invalid request method." });
//   }
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   await connectMongoDB();

//   try {
//     await CashInvoice.create(req.body);
//     // res.status(201).json(req.body);
//     return NextResponse.json({ message: "Invoice created" }, { status: 201 });
//   } catch (error: any) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// }
