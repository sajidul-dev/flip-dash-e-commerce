import { stat } from "fs";
import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productLists: [
    {
      type: Object,
    },
  ],
  totalQuantity: {
    type: Number,
    // required: true,
  },
  totalPrice: {
    type: Number,
    // requried: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
  },
});

export const Order = models?.Order || mongoose.model("Order", orderSchema);
