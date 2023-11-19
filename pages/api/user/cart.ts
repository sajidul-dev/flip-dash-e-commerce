import { dbConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    if (req.query?.id) {
      const cart = await Cart.find({ userId: req.query?.id });
      return res.status(200).send({
        error: false,
        cart: cart,
        message: "Product send",
      });
    } else {
      return res.status(400).send({
        error: false,
        cart: null,
        message: "Cart not found",
      });
    }
  }
  if (method == "PUT") {
    const { userId, productId, quantity } = req.body;
    const userCart = await Cart.findOne({ userId });
    if (userCart) {
      const product = await Product.findById({ _id: productId });
      const existProduct = userCart.productList.find(
        (item: any) => item._id === productId
      );
      const restProduct = userCart.productList.filter(
        (item: any) => item._id !== productId
      );

      if (existProduct) {
        let totalPrice: number = 0;
        let totalQuantity: number = 0;
        const updatedPrice = product.price * quantity;
        existProduct.price += updatedPrice;
        existProduct.quantity += quantity;
        const tempProductList = [...restProduct, existProduct];
        tempProductList.map((item) => {
          totalPrice += item.price;
          totalQuantity += item.quantity;
        });
        const cartDoc = await Cart.updateOne({
          userId,
          productList: tempProductList,
          totalQuantity,
          totalPrice,
        });
        return res.status(200).send({
          error: false,
          product: cartDoc,
          message: "Added to cart",
        });
      } else {
        let totalPrice: number = userCart.totalPrice + product.price * quantity;
        let totalQuantity: number = userCart.totalQuantity + quantity;
        const cartDoc = await Cart.updateOne({
          userId,
          productList: [
            ...userCart.productList,
            {
              _id: productId,
              price: product.price * quantity,
              quantity,
            },
          ],
          totalQuantity,
          totalPrice,
        });
        return res.status(200).send({
          error: false,
          product: cartDoc,
          message: "Added to cart",
        });
      }
    } else {
      const product = await Product.findById({ _id: productId });
      const productList = [{ _id: productId, price: product.price, quantity }];

      const cartDoc = await Cart.create({
        userId,
        productList,
        totalQuantity: quantity,
        totalPrice: product.price,
      });
      return res.status(200).send({
        error: false,
        product: cartDoc,
        message: "Added to cart",
      });
    }
  }
}
