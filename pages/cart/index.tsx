import Button from "@/components/shared/Button/Button";
import { RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartItem } from "@/types/productType";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Loading from "@/components/shared/Loading/Loading";
import Input from "@/components/shared/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  password: string;
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleDelete = (id: string) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    if (!cartItem) return toast.error("Cart is empty", { id: "1" });
    const product = cartItem.productList.find(
      (item: CartItem) => item._id === id
    );
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: product._id,
        quantity: -product.itemQuantity,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Product removed from cart", { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleIncreaseItem = (item: CartItem) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: 1,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleDecreaseItem = (item: CartItem) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: -1,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleClearAll = () => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    if (!cartItem) return toast.error("Cart is empty", { id: "1" });
    setLoading(true);
    axios
      .delete(`/api/user/cart?cartId=${cartItem._id}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(null));
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    // if (data) {
    //   axios
    //     .post("/api/auth/login", {
    //       email: data.email,
    //       password: data.password,
    //     })
    //     .then((res) => {
    //       if (res.data.user) {
    //         SetCookies("user", res.data.user);
    //         dispatch(setUser(res.data.user));
    //         setLoading(false);
    //         router.push("/");
    //       } else {
    //         console.log(res.data);
    //         SetCookies("seller", res.data.shop);
    //         dispatch(setSeller(res.data.shop));
    //         setLoading(false);
    //         router.push("/");
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       toast.error(`${err.response.data.message}`);
    //     });
    // }
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto grid grid-cols-2 gap-10 mt-10">
        {cartItem && cartItem?.productList?.length > 0 ? (
          <>
            <div className="col-span-1">
              <div className="bg-white flex justify-between items-center px-3 py-2 mb-4">
                <p className="text-common-gray-text">Your cart item </p>
                <Button
                  onClick={handleClearAll}
                  className="text-common-gray-text hover:text-danger flex gap-3 items-center">
                  <RiDeleteBin6Line /> Clear All
                </Button>
              </div>
              <div className="">
                <div className="">
                  {cartItem &&
                    cartItem.productList.map((item: CartItem) => {
                      return (
                        <div
                          key={item?._id}
                          className="mb-3 p-3 relative flex justify-between gap-4 bg-white">
                          <div className="flex space-x-4">
                            {item?.url && (
                              <Image
                                style={{ width: "120px", height: "80px" }}
                                width={120}
                                // unoptimized
                                height={80}
                                quality={100}
                                className="rounded-md"
                                priority={true}
                                loader={() => item.url}
                                src={item.url}
                                alt=""
                              />
                            )}
                            <div>
                              <p className="">{item?.title}</p>
                              {item.properties && item.properties[0] && (
                                <p className="text-common-gray-text mt-1">
                                  {item.properties[0].propertyName}:
                                  {item.properties[0].propertyValue}
                                </p>
                              )}
                              <p className="text-xs mt-1">
                                Only {item.quantity} item in stock
                              </p>
                            </div>
                          </div>
                          <div className="max-w-[200px]">
                            <div className="text-center">
                              ${item?.itemTotal}
                            </div>
                            <div className="flex gap-4 my-2">
                              <Button
                                onClick={() => item && handleDecreaseItem(item)}
                                className="cursor-pointer px-2 bg-[#9e9e9e] text-base">
                                -
                              </Button>
                              <p>{item?.itemQuantity}</p>
                              <Button
                                onClick={() => item && handleIncreaseItem(item)}
                                className="cursor-pointer px-2 bg-[#9e9e9e] text-base">
                                +
                              </Button>
                            </div>

                            <div className="flex justify-between my-2">
                              <button
                                type="button"
                                // onClick={() => addToFavourite(item)}
                                className="text-2xl text-common-gray-text hover:text-secondary">
                                {/* {favouriteItem.find((element) => element._id === item._id) ? (
                  // ) : ( */}
                                {/* <MdOutlineFavorite /> */}
                                <MdOutlineFavoriteBorder />
                                {/* )} */}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(item._id)}
                                className="text-2xl text-common-gray-text hover:text-danger">
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                          {/* <Button
                          onClick={() => handleDelete(item._id)}
                          className="absolute right-0 top-0 px-3 py-2 bg-[#c51919] text-white">
                          X
                        </Button> */}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-white p-3 ">
              <p>Order Summary</p>
              <div className="mt-3 flex justify-between">
                <p className="text-common-gray-text">
                  Subtotal ({cartItem.totalQuantity} item)
                </p>
                <p>${cartItem.totalPrice}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  register={register("name")}
                  error={errors.name?.message}
                />
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
