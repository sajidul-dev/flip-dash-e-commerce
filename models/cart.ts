import mongoose, { Schema, models } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: { type: mongoose.Schema.Types.ObjectId },
  quantity: { type: Number },
  productList: [
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
  purchased: {
    type: Boolean,
    default: false,
  },
});

export const Cart = models?.Cart || mongoose.model("Cart", cartSchema);
