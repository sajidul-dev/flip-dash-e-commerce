import { dbConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();

  if (method === "POST") {
    const productLists: any = [];
    const { userId, cartId } = req.body;

    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).send({
        error: true,
        message: "Cart not found",
      });
    }
    cart.productList.map(async (item: any) => {
      productLists.push(item);
      const product = await Product.findOne({ _id: item._id });
      if (product.quantity < item.quantity) {
        return res.status(400).send({
          error: true,
          message: "Not enough quantity",
        });
      }
      product.quantity -= item.quantity;
      await product.save();
    });

    const orderDoc = await Order.create({
      userId: userId,
      productLists,
      totalQuantity: cart.totalQuantity,
      totalPrice: cart.totalPrice,
    });

    await Cart.deleteOne({ _id: cartId });

    return res.status(200).send({
      error: false,
      order: orderDoc,
      message: "Order successful",
    });
  }
}
