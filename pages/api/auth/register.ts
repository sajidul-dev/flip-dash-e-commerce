import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "User already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({
      error: false,
      user: { _id: userDoc._id, name: userDoc.name, email: userDoc.email },
      message: "Log in successfull",
    });
  }
}
