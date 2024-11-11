import { dbConnect } from "@/lib/mongoose";
import { Review } from "@/models/reviews";
import { User } from "@/models/user";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;
  await dbConnect();

  if (method == "GET") {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).send({
      error: false,
      reviews: reviews,
    });
  }

  if (method == "POST") {
    const { userId, productId, shopId, rating, review } = req.body;
    const user = await User.findOne({ _id: userId });
    const userObj = {
      objectId: user._id,
      name: user.name,
    };
    const reviewDoc = await Review.create({
      user: userObj,
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
