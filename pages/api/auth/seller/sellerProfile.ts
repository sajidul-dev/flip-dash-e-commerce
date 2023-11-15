import { dbConnect } from "@/lib/mongoose";
import { Request, Response } from "express";
import { Seller } from "@/models/seller";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "PUT") {
    const { _id, coverPhoto, profilePhoto } = req.body;
    if (_id) {
      const seller = await Seller.updateOne(
        { _id },
        {
          coverPhoto,
          profilePhoto,
        }
      );
      return res.status(200).send({
        error: false,
        seller: seller,
        message: "Profile updated successfully",
      });
    } else {
      return res
        .status(400)
        .send({ error: true, message: "Profile update failed" });
    }
  }
}
