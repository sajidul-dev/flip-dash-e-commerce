import Button from "@/components/shared/Button/Button";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartItem } from "@/types/productType";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [price, setPrice] = useState(0);
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  // }, []);

  // const uniqueItems = Array.from(new Set(cart.map((item) => item._id)));

  const handleDelete = (id: string) => {
    // const filteredItem = cart.filter((element) => element._id !== id);
    // setCart(filteredItem);
    // localStorage.setItem("cart", JSON.stringify(filteredItem));
    // dispatch(setDefaultCart([]));
    // filteredItem.map((item) => {
    //   dispatch(setCartAction(item));
    // });
  };

  const handleIncreaseItem = (item: CartItem) => {
    const updatedCart = [...cart, item];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setDefaultCart([]));

    // updatedCart.forEach((cartItem) => {
    //   dispatch(setCartAction(cartItem));
    // });

    setCart(updatedCart);
  };

  const handleDecreaseItem = (item: CartItem) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (itemIndex !== -1 && cart.length > 1) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(setDefaultCart([]));

      // updatedCart.forEach((cartItem) => {
      // dispatch(setCartAction(updatedCart));
      // });

      setCart(updatedCart);
    }
  };

  const handleClearAll = () => {
    localStorage.removeItem("cart");
    setCart([]);
    dispatch(setDefaultCart([]));
  };
  // console.log(cartItem.productList);
  return (
    <div className="container mx-auto grid grid-cols-2 gap-10 mt-10">
      {cartItem && cartItem?.productList?.length > 0 ? (
        <>
          <div className="col-span-1">
            <div className=" flex justify-between items-center pb-4">
              <p>Your cart item</p>
              <Button
                onClick={handleClearAll}
                className="text-danger flex gap-3 items-center">
                <RiDeleteBin6Line /> Clear All
              </Button>
            </div>
            <div className="">
              <div className="">
                {cartItem &&
                  cartItem.productList.map((item: CartItem) => {
                    // const item: CartItem | undefined = cart.find(
                    //   (element) => element._id === itemId
                    // );
                    return (
                      <div
                        key={item?._id}
                        className="mb-3 p-3 relative flex gap-4 border border-[#86868b]">
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
                          <span className="mr-3">{item?.title}</span>

                          <div className="flex gap-4">
                            <Button
                              onClick={() => item && handleDecreaseItem(item)}>
                              -
                            </Button>
                            <p>{item?.itemQuantity}</p>
                            <Button
                              onClick={() => item && handleIncreaseItem(item)}
                              className="cursor-pointer">
                              +
                            </Button>
                          </div>
                          <div>${item?.itemTotal}</div>
                        </div>
                        <Button
                          onClick={() => handleDelete(item._id)}
                          className="absolute right-0 top-0 px-3 py-2 bg-[#c51919] text-white">
                          X
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            Checkout form
            <p>{price}</p>
          </div>
        </>
      ) : (
        <p className="text-secondary text-2xl text-center col-span-2">
          Add Something to Cart
        </p>
      )}
    </div>
  );
};

export default Cart;
