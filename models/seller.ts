import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopLocation: {
    type: String,
    required: true,
  },
  shopCategory: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const Seller = models?.Seller || mongoose.model("Seller", userSchema);
