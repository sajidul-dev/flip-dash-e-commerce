import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Seller } from "@/models/seller";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const { email, password } = req.body;
    if (email) {
      const seller = await Seller.findOne({ email });
      if (seller) {
        const userPassword = await bcrypt.compare(password, seller.password);
        if (userPassword)
          return res.status(200).send({
            error: false,
            shop: {
              _id: seller._id,
              name: seller.name,
              email: seller.email,
              shopName: seller.shopName,
              shopLocation: seller.shopLocation,
              shopCategory: seller.shopCategory,
              phone: seller.phone,
            },
            message: "Log in successfull",
          });
      }
      const user = await User.findOne({ email });
      if (user) {
        const userPassword = await bcrypt.compare(password, user.password);
        if (userPassword)
          return res.status(200).send({
            error: false,
            user: { _id: user._id, name: user.name, email: user.email },
            message: "Log in successfull",
          });
      }
      return res.status(400).send({ error: true, message: "User not found" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const userDoc = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // res.send({ userDoc, status: 200 });
  }
}
