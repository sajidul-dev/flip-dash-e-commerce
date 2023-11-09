import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Document() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(setDefaultCart([]));
  //     const cartItem = localStorage.getItem("cart");
  //     const cart = JSON.parse(cartItem!);
  //     // localStorage.setItem("cart", JSON.stringify(cart));
  //     // localStorage.setItem("favourite", JSON.stringify(favourite));
  //     cart.map((item: any) => {
  //       dispatch(setCartAction(item));
  //     });
  //   }, 500);
  // }, [dispatch]);
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
