import Button from "@/components/shared/Button/Button";
import { RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Loading from "@/components/shared/Loading/Loading";
import Input from "@/components/shared/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CartInputs, CartItem } from "@/types/cartType";
import { useCart } from "@/hooks/useCart";
import ProductCardSmall from "@/components/Products/ProductCardSmall";

const Cart = () => {
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);
  const user = useSelector((state: RootState) => state.userReducer.user);

  const {
    handleDelete,
    handleIncreaseItem,
    handleDecreaseItem,
    handleClearAll,
    fetchCartData,
    loading,
    setLoading,
  } = useCart(cartItem, user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CartInputs>();

  const onSubmit: SubmitHandler<CartInputs> = (data) => {
    setLoading(true);
    if (data && cartItem) {
      axios
        .post("/api/user/purchaseProduct", {
          userId: cartItem.userId,
          cartId: cartItem._id,
        })
        .then((res) => {
          if (res.data) {
            setLoading(false);
            toast.success("Order placed successfully", { id: "1" });
            reset();
            fetchCartData();
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.response.data.message}`);
        });
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto grid grid-cols-2 gap-10 mt-10">
        {cartItem && cartItem?.productList?.length > 0 ? (
          <>
            <div className="col-span-2 md:col-span-1">
              <div className="bg-white flex justify-between items-center px-3 py-2 mb-4">
                <p className="text-common-gray-text">Your cart item </p>
                <Button
                  onClick={handleClearAll}
                  className="text-common-gray-text hover:text-danger flex gap-3 items-center"
                >
                  <RiDeleteBin6Line /> Clear All
                </Button>
              </div>

              <div className="">
                {cartItem &&
                  cartItem.productList.map((item: CartItem) => {
                    return (
                      <div key={item._id}>
                        <ProductCardSmall
                          item={item}
                          handleDecreaseItem={handleDecreaseItem}
                          handleIncreaseItem={handleIncreaseItem}
                          handleDelete={handleDelete}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-3 ">
              <p>Order Summary</p>
              <div className="mt-3 flex justify-between">
                <p className="text-common-gray-text">
                  Subtotal ({cartItem.totalQuantity} item)
                </p>
                <p>${cartItem.totalPrice}</p>
              </div>
              <div className="h-[1px] bg-common-gray-text my-5"></div>
              <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <Input
                  type="text"
                  value={user?.name}
                  readOnly
                  placeholder="Your Name"
                  register={register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                  className="w-full mb-3"
                  error={errors.name?.message}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={user?.email}
                  readOnly
                  register={register("email")}
                  className="w-full mb-3"
                  error={errors.email?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="City"
                    register={register("city", {
                      required: { value: true, message: "City is required" },
                    })}
                    className="w-full mb-3 col-span-1"
                    error={errors.city?.message}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    register={register("postalCode", {
                      required: {
                        value: true,
                        message: "Postal Code is required",
                      },
                    })}
                    className="w-full mb-3 col-span-1"
                    error={errors.postalCode?.message}
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Street Address"
                  register={register("streetAddress", {
                    required: {
                      value: true,
                      message: "Street address is required",
                    },
                  })}
                  className="w-full mb-3"
                  error={errors.streetAddress?.message}
                />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  register={register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                  className="w-full mb-3"
                  error={errors.phone?.message}
                />
                <Input
                  type="submit"
                  value="Proceed To Checkout"
                  className="w-full rounded-none bg-secondary cursor-pointer hover:bg-opacity-80"
                ></Input>
              </form>
              {/* <p>{price}</p> */}
            </div>
          </>
        ) : (
          <p className="text-secondary text-2xl text-center col-span-2">
            Add Something to Cart
          </p>
        )}
      </div>
    </>
  );
};

export default Cart;
