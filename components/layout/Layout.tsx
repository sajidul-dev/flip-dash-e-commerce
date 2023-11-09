import React, { useEffect } from "react";
// import Header from "../shared/Navbar";
import Footer from "../shared/Footer/Footer";
import { useDispatch } from "react-redux";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import {
  setFavourite as setFavouriteAction,
  setDefaultFavourite,
} from "@/redux/slice/favouriteSlice/favouriteSlice";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../shared/Navbar"), { ssr: false });

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setDefaultCart([]));
      dispatch(setDefaultFavourite([]));
      const cartItem = localStorage.getItem("cart");
      const cart = JSON.parse(cartItem!);
      const favItem = localStorage.getItem("favourite");
      const favourite = JSON.parse(favItem!);
      cart.map((item: any) => {
        dispatch(setCartAction(item));
      });
      favourite.map((item: any) => {
        dispatch(setFavouriteAction(item));
      });
    }, 500);
  }, [dispatch]);
  return (
    <>
      <div className="bg-common flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
