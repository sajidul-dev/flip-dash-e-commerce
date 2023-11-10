import Button from "@/components/shared/Button/Button";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import Image from "next/image";

export interface CartItem {
  _id: number;
  title: string;
  comment: string;
  image: string;
}

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);
  const uniqueItems = Array.from(new Set(cart.map((item) => item._id)));
  const handleDelete = (id: number) => {
    const filteredItem = cart.filter((element) => element._id !== id);
    setCart(filteredItem);
    localStorage.setItem("cart", JSON.stringify(filteredItem));
    dispatch(setDefaultCart([]));
    filteredItem.map((item) => {
      dispatch(setCartAction(item));
    });
  };

  const handleIncreaseItem = (item: CartItem) => {
    const updatedCart = [...cart, item];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(setDefaultCart([]));

    updatedCart.forEach((cartItem) => {
      dispatch(setCartAction(cartItem));
    });

    setCart(updatedCart);
  };

  const handleDecreaseItem = (item: CartItem) => {
    const itemIndex = cart.findIndex((cartItem) => cartItem._id === item._id);
    if (itemIndex !== -1 && cart.length > 1) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(setDefaultCart([]));

      updatedCart.forEach((cartItem) => {
        dispatch(setCartAction(cartItem));
      });

      setCart(updatedCart);
    }
  };

  return (
    <div className="container mx-auto">
      <p>Your cart item</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          {cartItem &&
            uniqueItems.map((itemId) => {
              const item: CartItem | undefined = cart.find(
                (element) => element._id === itemId
              );
              return (
                <div
                  key={item?._id}
                  className="mb-3 p-3 relative flex gap-4 border border-[#86868b]">
                  {item?.image && (
                    <Image
                      width={120}
                      unoptimized
                      height={80}
                      quality={100}
                      className="rounded-md h-[80px]"
                      priority={true}
                      loader={() => item.image}
                      src={item.image}
                      alt=""
                    />
                  )}
                  <div>
                    <span className="mr-3">{item?.title}</span>

                    <div className="flex gap-4">
                      <Button onClick={() => item && handleDecreaseItem(item)}>
                        -
                      </Button>
                      <p>
                        {cartItem &&
                          cartItem.filter(
                            (element) => element._id === item?._id
                          ).length}
                      </p>
                      <Button
                        onClick={() => item && handleIncreaseItem(item)}
                        className="cursor-pointer">
                        +
                      </Button>
                    </div>
                    <div></div>
                  </div>
                  <Button
                    onClick={() => handleDelete(itemId)}
                    className="absolute right-0 top-0 px-3 py-2 bg-[#c51919] text-white">
                    X
                  </Button>
                </div>
              );
            })}
        </div>
        <div className="col-span-1">Checkout form</div>
      </div>
    </div>
  );
};

export default Cart;
