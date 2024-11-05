import { dbConnect } from "@/lib/mongoose";
import { Cart } from "@/models/cart";
import { Product } from "@/models/product";
import { User } from "@/models/user";
import { isAdminRequest } from "@/utils/AdminRequest";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    if (req.query?.id) {
      const cart = await Cart.find({ userId: req.query?.id });
      let products: any = [];
      if (cart.length > 0) {
        await Promise.all(
          cart[0].productList.map(async (item: any) => {
            const product = await Product.findOne({ _id: item._id });
            const productData = {
              _id: item._id,
              title: product.title,
              description: product.description,
              category: product.category,
              properties: product.properties,
              url: product.url,
              shopId: product.shopId,
              itemTotal: item.price,
              itemQuantity: item.quantity,
              quantity: product.quantity,
            };
            products.push(productData);
          })
        );
        cart[0].productList = products;
      }
      return res.status(200).send({
        error: false,
        cart: cart,
        message: "Cart Found",
      });
    } else {
      return res.status(200).send({
        error: false,
        cart: null,
        message: "Cart not found",
      });
    }
  }
  if (method == "PUT") {
    const { userId, productId, quantity } = req.body;
    // const user = await User.findOne({ _id: userId });
    // isAdminRequest(user.email, res);
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
        let tempProductList;
        const updatedPrice = product.price * quantity;
        existProduct.price += updatedPrice;
        existProduct.quantity += quantity;
        if (existProduct.quantity === 0) {
          tempProductList = [...restProduct];
        } else {
          tempProductList = [existProduct, ...restProduct];
        }
        tempProductList.map((item) => {
          totalPrice += item.price;
          totalQuantity += item.quantity;
        });
        const cartDoc = await Cart.updateOne(
          { userId },
          {
            productList: tempProductList,
            totalQuantity,
            totalPrice,
          }
        );

        const cart = await Cart.find({ userId: userId });
        let products: any = [];
        if (cart) {
          await Promise.all(
            cart[0].productList.map(async (item: any) => {
              const product = await Product.findOne({ _id: item._id });
              const productData = {
                _id: item._id,
                title: product.title,
                description: product.description,
                category: product.category,
                properties: product.properties,
                url: product.url,
                shopId: product.shopId,
                itemTotal: item.price,
                itemQuantity: item.quantity,
                quantity: product.quantity,
              };
              products.push(productData);
            })
          );
          cart[0].productList = products.reverse();
        }
        return res.status(200).send({
          error: false,
          cart: cart,
          message: "Added to cart",
        });
      } else {
        let totalPrice: number = userCart.totalPrice + product.price * quantity;
        let totalQuantity: number = userCart.totalQuantity + quantity;
        const cartDoc = await Cart.updateOne(
          { userId },
          {
            productList: [
              {
                _id: productId,
                price: product.price * quantity,
                quantity,
              },
              ...userCart.productList,
            ],
            totalQuantity,
            totalPrice,
          }
        );
        const cart = await Cart.find({ userId: userId });
        let products: any = [];
        if (cart) {
          await Promise.all(
            cart[0].productList.map(async (item: any) => {
              const product = await Product.findOne({ _id: item._id });
              const productData = {
                _id: item._id,
                title: product.title,
                description: product.description,
                category: product.category,
                properties: product.properties,
                url: product.url,
                shopId: product.shopId,
                itemTotal: item.price,
                itemQuantity: item.quantity,
                quantity: product.quantity,
              };
              products.push(productData);
            })
          );
          cart[0].productList = products.reverse();
        }
        return res.status(200).send({
          error: false,
          cart: cart,
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
      const cart = await Cart.find({ userId: userId });
      let products: any = [];
      if (cart) {
        await Promise.all(
          cart[0].productList.map(async (item: any) => {
            const product = await Product.findOne({ _id: item._id });
            const productData = {
              _id: item._id,
              title: product.title,
              description: product.description,
              category: product.category,
              properties: product.properties,
              url: product.url,
              shopId: product.shopId,
              itemTotal: item.price,
              itemQuantity: item.quantity,
              quantity: product.quantity,
            };
            products.push(productData);
          })
        );
        cart[0].productList = products;
      }
      return res.status(200).send({
        error: false,
        cart: cart,
        message: "Added to cart",
      });
    }
  }
  if (method == "DELETE") {
    const { cartId } = req.query;
    if (!cartId) {
      return res.status(400).send({
        error: true,
        data: null,
        message: "Cart id is required",
      });
    }
    const userCart = await Cart.deleteOne({ _id: cartId });
    return res.status(200).send({
      error: false,
      data: userCart,
      message: "All product removed",
    });
  }
}
