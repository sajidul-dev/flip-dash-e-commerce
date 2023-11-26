import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    requried: true,
  },
});

export const Review = models?.Review || mongoose.model("Review", reviewSchema);
