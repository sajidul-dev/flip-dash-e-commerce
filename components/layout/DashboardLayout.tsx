import Link from "next/link";
import React, { useEffect } from "react";
import NavLink from "../shared/Navbar/NavLink";
import axios from "axios";
import { setCategories } from "@/redux/slice/categorySlice/categorySlice";
import { useDispatch } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/admin/category")
      .then((res) => dispatch(setCategories(res.data.category)))
      .catch((err) => console.log(err));
  }, [dispatch]);
  return (
    <div className="container mx-auto grid grid-cols-12 gap-4 bg-white my-4 p-8">
      <div className="col-span-3 flex flex-col border-r-2 border-common">
        <NavLink
          route="/dashboard/category"
          className="m-3 p-3 hover:bg-common">
          Category
        </NavLink>
        <div className="w-full h-[1px] bg-black"></div>
        <NavLink route="/dashboard/product" className="m-3 p-3 hover:bg-common">
          Product
        </NavLink>
        <div className="w-full h-[1px] bg-black"></div>
        <NavLink route="/dashboard/shop" className="m-3 p-3 hover:bg-common">
          Shop
        </NavLink>
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
