import Button from "@/components/shared/Button/Button";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";

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

  const handleDelete = (id: number) => {
    const filteredItem = cart.filter((element) => element._id !== id);
    setCart(filteredItem);
    localStorage.setItem("cart", JSON.stringify(filteredItem));
    dispatch(setDefaultCart([]));
    filteredItem.map((item) => {
      dispatch(setCartAction(item));
    });
  };

  return (
    <div className="container mx-auto">
      <p>Your cart item</p>
      {cartItem &&
        cartItem.map((item) => {
          return (
            <div key={item._id} className="mb-3">
              = <span className="mr-3">{item?.title}</span>
              <Button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-2 bg-[#c51919] text-white">
                Delete
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default Cart;
