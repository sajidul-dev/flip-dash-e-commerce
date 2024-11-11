import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Review } from "@/models/reviews";
import { Seller } from "@/models/seller";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.findOne({ _id: req.query?.id });
      const shop = await Seller.findOne({ _id: product.shopId });
      const {
        _id,
        title,
        description,
        price,
        category,
        properties,
        url,
        shopId,
        quantity,
      } = product;
      const reviews = await Review.find({ productId: req.query?.id }).sort({
        createdAt: -1,
      });
      return res.status(200).send({
        error: false,
        product: {
          _id,
          title,
          description,
          price,
          category,
          properties,
          url,
          shopId,
          quantity,
          shopName: shop.shopName,
          shopProfilePic: shop.profilePhoto,
          shopAddress: shop.shopLocation,
          reviews: reviews,
        },
        message: "Product send",
      });
      // res.json(await Product.findOne({ _id: req.query?.id }));
    } else {
      const products = await Product.find();
      return res.status(200).send({
        error: false,
        products: products,
        message: "Product send",
      });
    }
  }
  if (method == "POST") {
    const {
      title,
      description,
      price,
      category,
      properties,
      url,
      shopId,
      quantity,
    } = req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      category,
      properties,
      url,
      shopId,
      quantity,
    });
    return res.status(200).send({
      error: false,
      product: productDoc,
      message: "Product created successfull",
    });
  }

  if (method === "PUT") {
    const { title, description, price, category, properties, url, _id } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, category, url, properties }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
