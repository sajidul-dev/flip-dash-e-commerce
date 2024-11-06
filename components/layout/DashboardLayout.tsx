import Link from "next/link";
import React, { useEffect } from "react";
import NavLink from "../shared/Navbar/NavLink";
import axios from "axios";
import { setCategories } from "@/redux/slice/categorySlice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { GetCookies } from "../shared/Cookies/Cookies";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userReducer.user);
  const seller = useSelector((state: RootState) => state.sellerReducer.seller);
  // const router = useRouter();

  // const userCookie = GetCookies("user");
  // const shopCookie = GetCookies("seller");
  // console.log(userCookie, "User");
  // console.log(shopCookie, "Seller");
  useEffect(() => {
    axios
      .get("/api/admin/category")
      .then((res) => dispatch(setCategories(res.data.category)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  // useEffect(() => {
  //   if (!user && userCookie) {
  //     console.log(true);
  //     router.push("/");
  //   }
  //   if (!seller && shopCookie) {
  //     router.push("/");
  //   }
  // }, [user, userCookie, seller, shopCookie]);

  // useEffect(() => {
  //   if (!seller && shopCookie) {
  //     router.push("/");
  //   }
  // }, [seller, shopCookie]);
  return (
    <div className="container mx-auto grid grid-cols-12 gap-4 bg-white my-4 p-8">
      <div className="col-span-3 flex flex-col border-r-2 border-common">
        <NavLink
          route="/dashboard/category"
          className="m-3 p-3 hover:bg-common"
        >
          Category
        </NavLink>
        {seller?._id && (
          <>
            {" "}
            <div className="w-full h-[1px] bg-black"></div>
            <NavLink
              route="/dashboard/product"
              className="m-3 p-3 hover:bg-common"
            >
              Create Product
            </NavLink>
            <div className="w-full h-[1px] bg-black"></div>
            <NavLink
              route="/dashboard/shop"
              className="m-3 p-3 hover:bg-common"
            >
              My Shop
            </NavLink>
          </>
        )}
        <div className="w-full h-[1px] bg-black"></div>
        <NavLink route="/dashboard/admin" className="m-3 p-3 hover:bg-common">
          Admin
        </NavLink>
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  );
};

export default DashboardLayout;
