import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="bg-common">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
