import React, { useEffect, useState } from "react";
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
import { setUser } from "@/redux/slice/userSlice/userSlice";
import { GetCookies } from "../shared/Cookies/Cookies";
import { setProduct } from "@/redux/slice/productSlice/productSlice";
import axios from "axios";
import { setCategories } from "@/redux/slice/categorySlice/categorySlice";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Header = dynamic(() => import("../shared/Navbar"), { ssr: false });

interface Props {
  children: React.ReactNode;
}

const products = [
  {
    _id: 1,
    title: "title 1",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/1.jpg",
    price: 3,
  },
  {
    _id: 2,
    title: "title 2",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/2.jpg",
    price: 6,
  },
  {
    _id: 3,
    title: "title 3",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/3.jpg",
    price: 5,
  },
  {
    _id: 4,
    title: "title 4",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/4.jpg",
    price: 7,
  },
  {
    _id: 5,
    title: "title 5",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/5.jpg",
    price: 10,
  },
  {
    _id: 6,
    title: "title 6",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/6.jpg",
    price: 68,
  },
  {
    _id: 7,
    title: "title 7",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/7.jpg",
    price: 15,
  },
  {
    _id: 8,
    title: "title 8",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/8.jpg",
    price: 10,
  },
  {
    _id: 9,
    title: "title 9",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/9.jpg",
    price: 20,
  },
  {
    _id: 10,
    title: "title 10",
    category: "fashion",
    comment: "Flat 70% off",
    image: "/images/top-deals/10.jpg",
    price: 15,
  },
];

const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    axios
      .get("/api/admin/category")
      .then((res) => dispatch(setCategories(res.data.category)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    const user = GetCookies("user");
    const seller = GetCookies("seller");
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
    dispatch(setUser(user));
    dispatch(setSeller(seller));
    dispatch(setProduct(products));
  }, [dispatch]);
  return (
    <>
      <div
        onClick={() => setOpenDropDown(false)}
        className="bg-common relative flex flex-col min-h-screen">
        <Header setOpenDropDown={setOpenDropDown} openDropDown={openDropDown} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <div className="absolute bottom-20 text-5xl text-secondary right-5 cursor-pointer">
          <BsFillArrowUpCircleFill />
        </div>
      </div>
    </>
  );
};

export default Layout;
