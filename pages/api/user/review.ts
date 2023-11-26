import { dbConnect } from "@/lib/mongoose";
import { Review } from "@/models/reviews";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();

  if (method == "POST") {
    const { userId, productId, shopId, rating, review } = req.body;
    const reviewDoc = await Review.create({
      userId,
      productId,
      shopId,
      rating,
      review,
    });
    // const revi;
    return res.status(200).send({
      error: false,
      review: reviewDoc,
      message: "You reviewed this product",
    });
  }
}
