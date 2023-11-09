import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store/store";
import { useEffect } from "react";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";

export default function App({ Component, pageProps }: AppProps) {
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
    <Provider store={store}>
      <Layout>
        {" "}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
