import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/shared/Button/Button";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { dbConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { RootState } from "@/redux/store/store";
import { Categories } from "@/types/categoriesType";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Inputs = {
  category: string;
  parentCategory: string | null;
};

const CategoryDashboard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<any>({
    id: "",
    isEdit: false,
  });
  const allCategories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let category;
    if (data.parentCategory == "") {
      category = {
        name: data.category,
      };
    } else {
      category = {
        name: data.category,
        parentCategory: data.parentCategory,
      };
    }
    setLoading(true);
    if (data) {
      axios
        .post("/api/admin/category", category)
        .then((res) => {
          if (res.data) {
            setLoading(false);
            refreshData();
            reset();
            toast.success(`${res.data.message}`);
          }
        })
        .catch((err) => {
          setLoading(false);
          reset();
          toast.error(`${err.response.data.message}`);
        });
    }
  };
  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <DashboardLayout>
      <div className="w-[60%] mx-auto">
        {editCategory.value && (
          <Button
            onClick={() =>
              setEditCategory({
                id: "",
                value: false,
              })
            }
            className="bg-secondary px-2 py-1 hover:bg-opacity-90">
            Create Category
          </Button>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            register={register("category", {
              required: {
                value: true,
                message: "Category is required",
              },
            })}
            type="text"
            defaultValue={
              editCategory.value
                ? allCategories.find(
                    (category) => category._id === editCategory.id
                  )?.name
                : ""
            }
            placeholder="Enter your category name"
            label={`${editCategory.value ? "Edit" : "Create"} a category`}
            className="w-full"
          />
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
          <select
            {...register("parentCategory")}
            className="block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400">
            <option value="">No parent category</option>
            {allCategories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <Input type="submit" value="Save"></Input>
        </form>
        <table className="mt-8 basic w-full">
          <thead className="pb-5">
            <tr className="">
              <th className="text-left">Category Name</th>
              <th className="text-left">Parent Category</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((category) => (
              <tr key={category._id} className="">
                <td>{category.name}</td>
                <td>
                  {category.parentCategory
                    ? category.parentCategory?.name
                    : "No parent category"}
                </td>
                <td className="flex gap-4">
                  <Button
                    onClick={() =>
                      setEditCategory({ id: category._id, value: true })
                    }
                    className="bg-secondary px-2 py-1 hover:bg-opacity-90">
                    Edit
                  </Button>
                  <Button className="bg-danger px-2 py-1 hover:bg-opacity-90">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CategoryDashboard;
