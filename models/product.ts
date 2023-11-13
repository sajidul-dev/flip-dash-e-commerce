import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    properties: [{ type: Object }],
    reviews: [{ type: String }],
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Product = models?.Product || model("Product", ProductSchema);
