import React, { useState } from "react";
import NavLink from "./NavLink";
import NavDropDown from "./NavDropDown";
import { useRouter } from "next/router";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";

const Header = () => {
  const router = useRouter();
  const [state, setState] = useState<string | null>(null);
  return (
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
        <NavLink className="py-[14px]" route="/store">
          <p>Become a Seller</p>
        </NavLink>
        <NavLink className="py-[14px]" route="/store">
          <p>Sign in</p>
        </NavLink>
        <NavLink className="py-[14px]" route="/store">
          <p>Cart</p>
        </NavLink>
        <NavLink
          className="py-[14px]"
          // onClick={() => router.push("/auth/register")}
          route="/auth/register">
          <p>Sign up</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
