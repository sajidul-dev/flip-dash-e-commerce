import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema({
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
});

export const User = models?.User || mongoose.model("User", orderSchema);
