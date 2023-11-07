import mongoose, { Schema } from "mongoose";

const CashInvoiceSchema = new Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    // invoiceDate: {
    //   type: Date,
    //   required: true,
    // },
    customer: {
      type: String,
      required: true,
    },

    // items: [
    //   {
    //     item: {
    //       type: String,
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //     },
    //     amount: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    // ],
    // subTotal: {
    //   type: Number,
    //   required: true,
    // },
    // discount: {
    //   type: Number,
    //   required: true,
    // },
    // amountPaid: {
    //   type: Number,
    //   required: true,
    // },
    // amountDue: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const CashInvoice =
  mongoose.models.CashInvoice ||
  mongoose.model("CashInvoice", CashInvoiceSchema);

export default CashInvoice;
