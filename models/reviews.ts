import mongoose, { Schema, models } from "mongoose";

const reviewSchema = new Schema({
  user: {
    objectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  shopId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Review = models?.Review || mongoose.model("Review", reviewSchema);
