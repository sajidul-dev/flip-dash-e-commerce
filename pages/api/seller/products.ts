import { dbConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();
  // await isAdminRequest(req,res)

  if (method === "GET") {
    if (req.query?.id) {
      const products = await Product.find({ shopId: req.query?.id });
      return res.status(200).send({
        error: false,
        products: products,
        message: "Product send",
      });
    } else {
      return res.status(400).send({
        error: false,
        products: null,
        message: "Somthing went wrong",
      });
    }
  }
  //   if (method == "POST") {
  //     const { title, description, price, category, properties, url, shopId } =
  //       req.body;
  //     const productDoc = await Product.create({
  //       title,
  //       description,
  //       price,
  //       category,
  //       properties,
  //       url,
  //       shopId,
  //     });
  //     return res.status(200).send({
  //       error: false,
  //       product: productDoc,
  //       message: "Product created successfull",
  //     });
  //   }

  //   if (method === "PUT") {
  //     const { title, description, price, category, properties, url, _id } =
  //       req.body;
  //     console.log("from server", title, description, price);
  //     await Product.updateOne(
  //       { _id },
  //       { title, description, price, category, url, properties }
  //     );
  //     res.json(true);
  //   }

  //   if (method === "DELETE") {
  //     if (req.query?.id) {
  //       await Product.deleteOne({ _id: req.query?.id });
  //       res.json(true);
  //     }
  //   }
}
