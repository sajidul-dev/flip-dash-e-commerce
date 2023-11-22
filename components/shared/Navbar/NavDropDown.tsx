import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { SlEmotsmile } from "react-icons/sl";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import { RemoveCookies } from "../Cookies/Cookies";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

const NavDropDown = ({
  openDropDown,
  setOpenDropDown,
  handleLogout,
  className,
}: any) => {
  return (
    <div className={className}>
      <div className={`w-full h-0 p-5 text-[#6e686e] flex flex-col space-y-3`}>
        <Button className="flex items-center gap-4 hover:text-[#30C47E]">
          <SlEmotsmile />
          My Account
        </Button>
        <Button className="flex items-center gap-4 hover:text-[#30C47E]">
          <AiOutlineHeart />
          My Wishlist
        </Button>
        <Link
          href="/dashboard/category"
          className="flex items-center gap-4 hover:text-[#30C47E]">
          <MdDashboard />
          Dashboard
        </Link>
        <Button
          onClick={handleLogout}
          className="flex items-center gap-4 hover:text-[#30C47E]">
          <BiLogOut />
          Log Out
        </Button>
      </div>
    </div>
  );
  // }
};

export default NavDropDown;
