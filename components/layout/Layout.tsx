import React, { useEffect, useState } from "react";
// import Header from "../shared/Navbar";
import Footer from "../shared/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart,
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
import toast from "react-hot-toast";
import { RootState } from "@/redux/store/store";

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
  const user = useSelector((state: RootState) => state.userReducer.user);

  // const fetchCartData = async () => {
  //   try {
  //     const response = await axios.get(`/api/user/cart?id=${user?._id}`);
  //     const cart = response.data.cart;
  //     dispatch(setCart(cart));
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(setDefaultCart([]));
  //   }
  // };

  useEffect(() => {
    let isMounted = true;
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/api/user/cart?id=${user?._id}`);
        const cart = response.data.cart;
        console.log(cart, "Cart");
        if (isMounted) {
          dispatch(setCart(cart));
        }
      } catch (error) {
        console.error(error);
        dispatch(setDefaultCart([]));
      }
    };
    axios
      .get("/api/admin/category")
      .then((res) => dispatch(setCategories(res.data.category)))
      .catch((err) => console.log(err));
    if (user) {
      fetchCartData();
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, user]);

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
