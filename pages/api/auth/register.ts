import { dbConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await dbConnect();
  if (req.method == "POST") {
    const { name, email, password } = req.body;
    const userDoc = await User.create({ name, email, password });
  }
}
