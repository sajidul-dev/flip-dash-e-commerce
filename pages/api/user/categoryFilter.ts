import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();

  if (method === "GET") {
    if (req.query?.id) {
      const product = await Product.find({ category: req.query?.id });
      return res.status(200).send({
        error: false,
        product: product,
        message: "Product send",
      });
    }
  }
}
