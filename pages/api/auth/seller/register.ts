import { dbConnect } from "@/lib/mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Seller } from "@/models/seller";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const {
      name,
      email,
      password,
      shopName,
      shopLocation,
      shopCategory,
      phone,
    } = req.body;
    if (email) {
      const user = await Seller.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "Shop already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const shopDoc = await Seller.create({
      name,
      email,
      password: hashedPassword,
      shopName,
      shopLocation,
      shopCategory,
      phone,
    });
    res.status(200).send({
      error: false,
      shop: {
        _id: shopDoc._id,
        name: shopDoc.name,
        email: shopDoc.email,
        shopName: shopDoc.shopName,
        shopLocation: shopDoc.shopLocation,
        shopCategory: shopDoc.shopCategory,
        phone: shopDoc.phone,
      },
      message: "Create shop successfull",
    });
  }
}
