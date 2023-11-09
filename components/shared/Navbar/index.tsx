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

const Header = () => {
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );
  return (
    <div className="bg-white">
      <nav className="container mx-auto flex justify-between items-center py-2">
        <div className="flex items-center gap-8">
          <NavLink route="/">
            {/* <span>Flip Dash</span> */}
            <Icon name="nav_logo" />
          </NavLink>
          <Input
            placeholder="Search for Products, Brands and More"
            className="bg-common w-[725px]"
          />
        </div>
        <div className="flex gap-8">
          <NavLink
            className="py-[14px] flex items-center space-x-2"
            route="/store">
            <BsInboxes />
            <p>Become a Seller</p>
          </NavLink>
          <NavLink
            className="py-[14px] flex items-center space-x-2"
            route="/auth/login">
            <BiUser />
            <p>Sign in</p>
            {/* <IoIosArrowDown />
            <IoIosArrowUp /> */}
          </NavLink>
          <NavLink
            className="py-[14px] flex items-center space-x-2"
            route="/auth/register">
            <BiUser />
            <p>Sign up</p>
            {/* <IoIosArrowDown />
            <IoIosArrowUp /> */}
          </NavLink>
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

          {/* <NavLink className="py-[14px]" route="/auth/register">
          <p>Sign up</p>
        </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
