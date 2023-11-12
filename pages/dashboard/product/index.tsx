import DashboardLayout from "@/components/layout/DashboardLayout";
import Input, { CommonTextArea } from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Inputs = {
  name: string;
  category: string;
  parentCategory: string | null;
  description: string;
  price: number;
};

const ProductDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState<any>({
    id: "",
    isEdit: false,
  });
  const categories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

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
        <p className="text-center mb-4">Create new product</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            register={register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            type="text"
            // defaultValue={
            //   editCategory.value
            //     ? categories.find(
            //         (category) => category._id === editCategory.id
            //       )?.name
            //     : ""
            // }
            placeholder="Enter your category name"
            // label={`${editCategory.value ? "Edit" : "Create"} a category`}
            label="Name"
            className="w-full"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
          <label className="block text-gray text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register("parentCategory", {
              required: {
                value: true,
                message: "Category is required",
              },
            })}
            className="block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400">
            <option value="">No category</option>
            {categories &&
              categories.map((category) => {
                return (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          <Input type="file" className="w-full" label="Photo" />
          {/* <Input type="textarea" /> */}
          <CommonTextArea
            register={register("description", {
              required: {
                value: true,
                message: "Description is required",
              },
            })}
            label="Description"
            placeholder="Enter your product description"
            className="w-full"
          />
          <Input
            register={register("price", {
              required: {
                value: true,
                message: "Price is required",
              },
            })}
            type="number"
            placeholder="Enter product price"
            label="Price"
            className="w-full"
          />
          <Input type="submit" value="Save"></Input>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
