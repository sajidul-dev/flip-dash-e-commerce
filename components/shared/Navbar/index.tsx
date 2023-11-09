import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import NavDropDown from "./NavDropDown";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import { BsInboxes } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Cookies from "universal-cookie";
import Button from "../Button/Button";

const Header = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const cookies = new Cookies();
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );
  return (
    <div className="bg-white sticky z-[1100] top-0">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center gap-8">
          <NavLink route="/">
            <Icon name="nav_logo" />
          </NavLink>
          <Input
            placeholder="Search for Products, Brands and More"
            className="bg-common md:w-[725px]"
          />
        </div>
        <div className="flex gap-8">
          <NavLink
            className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
            route="/auth/seller">
            <BsInboxes />
            <p>Become a Seller</p>
          </NavLink>
          {!cookies.get("user")?._id ? (
            <>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/login">
                <BiUser />
                <p>Sign in</p>
                {/* <IoIosArrowDown />
            <IoIosArrowUp /> */}
              </NavLink>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/register">
                <BiUser />
                <p>Sign up</p>
                {/* <IoIosArrowDown />
            <IoIosArrowUp /> */}
              </NavLink>
            </>
          ) : (
            <div
              onClick={() => setOpenDropDown(!openDropDown)}
              className="py-[14px] cursor-pointer flex items-center">
              {cookies.get("user").name}
            </div>
          )}
          <NavDropDown
            className={`absolute top-10 bg-white shadow-2xl mt-[40px] z-50 text-white w-[400px] transition-all ease-in-out duration-500 ${
              openDropDown ? "h-[30vh] opacity-100" : "h-0 opacity-0"
            }`}
            nav={openDropDown}
          />
          <NavLink
            className="py-[14px] relative flex items-center text-2xl cursor-pointer"
            route="/cart">
            <AiOutlineShoppingCart />
            <div className="absolute top-[0px] right-[-15px] text-base bg-[#000] text-white rounded-full w-full flex justify-center items-center">
              <span>{cartItem?.length}</span>
            </div>
          </NavLink>
          <div className="py-[14px] flex items-center space-x-2 text-2xl cursor-pointer">
            <MdOutlineFavorite />
            {favouriteItem?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
