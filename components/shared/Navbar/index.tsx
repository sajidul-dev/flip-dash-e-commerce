import React, { useState } from "react";
import NavLink from "./NavLink";
import NavDropDown from "./NavDropDown";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import { BsInboxes } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Header = () => {
  const router = useRouter();
  const [state, setState] = useState<string | null>(null);
  return (
    <div className="bg-white">
      <nav className="container mx-auto flex justify-between items-center py-2 px-5">
        <div className="flex items-center gap-8">
          <NavLink route="/">
            <span>Flip Dash</span>
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
            route="/store">
            <BiUser />
            <p>Sign in</p>
            <IoIosArrowDown />
            <IoIosArrowUp />
          </NavLink>
          <NavLink
            className="py-[14px] flex items-center space-x-2"
            route="/cart">
            <AiOutlineShoppingCart />
            <p>Cart</p>
          </NavLink>
          {/* <NavLink className="py-[14px]" route="/auth/register">
          <p>Sign up</p>
        </NavLink> */}
        </div>
      </nav>
    </div>
  );
};

export default Header;
