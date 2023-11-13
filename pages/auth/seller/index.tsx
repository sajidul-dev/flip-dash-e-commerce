import Button from "@/components/shared/Button/Button";
import { SetCookies } from "@/components/shared/Cookies/Cookies";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import { RootState } from "@/redux/store/store";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type Inputs = {
  name: string;
  email: string;
  password: string;
  parentCategory: string;
  shopName: string;
  shopLocation: string;
  phone: string;
};

const Seller = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const allCategories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post("/api/auth/seller/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        shopName: data.shopName,
        shopLocation: data.shopLocation,
        shopCategory: data.parentCategory,
        phone: data.phone,
      })
      .then((res) => {
        if (res.data.shop) {
          console.log(res.data.shop);
          SetCookies("seller", res.data.shop);
          dispatch(setSeller(res.data.shop));
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="container mx-auto flex flex-col justify-center mt-4 ">
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <p className="text-lg text-center my-5 animate-ping">Become a Seller</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step == 1 && (
            <>
              <Input
                register={register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                type="text"
                placeholder="Enter your name"
                className="mt-4 w-full"
                error={errors.name?.message}
              />
              <Input
                register={register("email")}
                type="email"
                placeholder="Enter your email"
                className="mt-4 w-full"
                error={errors.email?.message}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                register={register("password")}
                className="my-4 w-full"
                error={errors.password?.message}
              />
            </>
          )}
          {step == 2 && (
            <>
              <Input
                register={register("shopName", {
                  required: {
                    value: true,
                    message: "Shop name is required",
                  },
                })}
                type="text"
                placeholder="Enter your shop name"
                label="Shop Name"
                className="my-4 w-full"
                error={errors.shopName?.message}
              />
              <Input
                register={register("shopLocation", {
                  required: {
                    value: true,
                    message: "Shop location is required",
                  },
                })}
                type="text"
                placeholder="Enter your shop name"
                className="my-4 w-full"
                label="Shop Location"
                error={errors.shopLocation?.message}
              />
              <Input
                register={register("phone", {
                  required: {
                    value: true,
                    message: "Phone is required",
                  },
                })}
                type="text"
                placeholder="Enter your phone number"
                className="my-4 w-full"
                label="Phone Number"
                error={errors.phone?.message}
              />
              <label className="block text-gray text-sm font-bold mb-2">
                Shop Category
              </label>
              <select
                {...register("parentCategory", {
                  required: {
                    value: true,
                    message: "Category is required",
                  },
                })}
                className="block px-4 py-2 border border-[#86868b] rounded-md focus:outline-none focus:ring focus:border-[#0071e3] placeholder-gray-400 my-4 w-full">
                <option value="">No parent category</option>
                {allCategories.map((category) => {
                  return (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              {errors.parentCategory && (
                <p className="text-danger">{errors.parentCategory.message}</p>
              )}
            </>
          )}
          {step == 2 && (
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-white my-3 rounded border">
                Previous
              </Button>
              <Input
                type="submit"
                value="Become a seller"
                className="cursor-pointer my-3 bg-secondary"
              />
            </div>
          )}
          {step == 1 && (
            <Button
              type="button"
              onClick={() => {
                if (!getValues("name")) {
                  setError("name", {
                    type: "manual",
                    message: "Name is required",
                  });
                } else if (!getValues("email")) {
                  setError("email", {
                    type: "manual",
                    message: "Email is required",
                  });
                } else if (!getValues("password")) {
                  setError("password", {
                    type: "manual",
                    message: "Password is required",
                  });
                } else {
                  setStep(2);
                }
              }}
              className="px-4 py-2 bg-secondary my-3 rounded">
              Next
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Seller;
