import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/shared/Button/Button";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { dbConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { Categories } from "@/types/categoriesType";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  category: string;
  parentCategory: string | null;
};

const CategoryDashboard: React.FC<{ categories: Categories[] }> = ({
  categories,
}) => {
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
  console.log(categories);
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
            // SetCookies("user", res.data.user);
            // dispatch(setUser(res.data.user));
            // setLoading(false);
            // router.push("/");
            setLoading(false);
            refreshData();
            console.log(res.data);
            reset();
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
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
        {/* <p>Add a Product</p> */}
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
                ? categories.find(
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
          </select>
          <Input type="submit" value="Save"></Input>
        </form>
        <div className="mt-8">
          {categories.map((category) => {
            return (
              <div
                key={category._id}
                className="flex justify-between items-center gap-4 mb-3">
                <p>{category.name}</p>
                <div className="flex gap-4">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryDashboard;

export const getServerSideProps = async () => {
  await dbConnect();
  const categories = await Category.find({});
  return { props: { categories: JSON.parse(JSON.stringify(categories)) } };
};
