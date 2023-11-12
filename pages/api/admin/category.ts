import { dbConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  const { method } = req;

  await dbConnect();
  // await isAdminRequest(req,res)

  if (method == "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parentCategory,
      properties,
    });
    return res.status(200).send({
      error: false,
      category: categoryDoc,
      message: "Category created successfully",
    });
  }

  if (method == "GET") {
    const data = await Category.find({}).populate("parentCategory");
    return res.status(200).send({
      error: false,
      category: data,
      message: "Category get successfully",
    });
  }

  if (method == "PUT") {
    const { name, parentCategory, _id, properties } = req.body;
    const category = await Category.updateOne(
      { _id },
      {
        name,
        parentCategory,
        properties,
      }
    );
    return res.status(200).send({
      error: false,
      category: category,
      message: "Category updated successfully",
    });
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    const category = await Category.deleteOne({ _id });
    return res.status(200).send({
      error: false,
      category: null,
      message: "Category deleted successfully",
    });
  }
}
