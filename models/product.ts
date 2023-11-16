import mongoose, { Schema, model, models } from "mongoose";
import { Seller } from "./seller";
import { Category } from "./category";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: Category },
    properties: [{ type: Object }],
    url: { type: String, required: true },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Seller,
      required: true,
    },
    quantity: { type: Number, required: true },
    totalOrders: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
