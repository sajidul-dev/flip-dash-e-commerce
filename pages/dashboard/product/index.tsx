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

const imgbbAPI = "02edd5c413d22a736d8b7acfa51c03ac";

type Inputs = {
  title: string;
  category: string;
  parentCategory: string | null;
  description: string;
  price: number;
  image: any;
  propertyName: string;
  propertyValue: string;
  quantity: number;
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
  const shop = useSelector((state: RootState) => state.sellerReducer.seller);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    // if (typeof data.quantity !== "number") {
    //   setError("quantity", {
    //     type: "manual",
    //     message: "Quantity must be a number",
    //   });
    //   return;
    // } else if (typeof data.price !== "number") {
    //   setError("price", {
    //     type: "manual",
    //     message: "Price must be a number",
    //   });
    //   return;
    // }
    if (data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      axios
        .post(`https://api.imgbb.com/1/upload?key=${imgbbAPI}`, formData)
        .then((res) => {
          if (res.data) {
            axios
              .post("/api/admin/product", {
                // ...data,
                // url: res.data.data.display_url,
                title: data.title,
                description: data.description,
                price: data.price,
                category: data.parentCategory,
                properties: [
                  {
                    propertryName: data.propertyName,
                    propertyValue: data.propertyValue,
                  },
                ],
                url: res.data.data.display_url,
                shopId: shop?._id,
                quantity: data.quantity,
              })
              .then((res) => {
                if (res.data) {
                  toast.success(`${res.data.message}`, { id: "33" });
                  setLoading(false);
                  refreshData();
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
        });
    }
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <DashboardLayout>
      <div className="w-[60%] mx-auto">
        <p className="text-center font-medium mb-4">Create new product</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            register={register("title", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            type="text"
            placeholder="Enter your product title"
            label="Name"
            className="w-full"
            error={errors.title?.message}
          />
          <label className="block text-gray text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register("parentCategory")}
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
          <Input
            register={register("image", {
              required: {
                value: true,
                message: "Photo is required",
              },
            })}
            type="file"
            className="w-full"
            label="Photo"
          />
          <div className="flex flex-wrap justify-between w-full">
            <div>
              <Input
                type="text"
                label="Property Name"
                placeholder="Property name. Ex: color"
                register={register("propertyName")}
                className="w-full"
                error={errors.propertyName?.message}
              />
              {/* {errors.propertyName && (
                <p className="text-danger">{errors.propertyName.message}</p>
              )} */}
            </div>
            <div>
              <Input
                type="text"
                label="Property Value"
                placeholder="Values. Ex: black"
                register={register("propertyValue")}
                className="w-full"
                error={errors.propertyValue?.message}
              />
              {/* {errors.propertyValue && (
                <p className="text-danger">{errors.propertyValue.message}</p>
              )} */}
            </div>
          </div>
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
            error={errors.description?.message}
          />
          <Input
            register={register("quantity", {
              required: {
                value: true,
                message: "Quantity is required",
              },
            })}
            type="number"
            placeholder="Enter quantity"
            label="Quantity"
            className="w-full"
            error={errors.quantity?.message}
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
            error={errors.price?.message}
          />
          <Input type="submit" value="Save"></Input>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ProductDashboard;
