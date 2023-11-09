import mongoose, { Schema, models } from "mongoose";

const productCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    ref: "ProductCategory",
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const ProductCategory =
  models?.ProductCategory ||
  mongoose.model("ProductCategory", productCategorySchema);
