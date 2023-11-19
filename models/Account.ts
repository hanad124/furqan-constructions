import mongoose, { Document, Schema } from "mongoose";

interface IAccount extends Document {
  name: string;
  type: string;
  debit: number;
  credit: number;
}

const accountSchema = new Schema<IAccount>(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    debit: {
      type: Number,
      default: 0,
    },
    credit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Account ||
  mongoose.model<IAccount>("Account", accountSchema);
