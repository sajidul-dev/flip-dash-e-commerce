import React from "react";
import Store from "./NavDropdownComponent/Store/Store";
import Mac from "./NavDropdownComponent/Mac/Mac";
import Ipad from "./NavDropdownComponent/IPad/Ipad";
import Iphone from "./NavDropdownComponent/IPhone/Iphone";
import Watch from "./NavDropdownComponent/Watch/Watch";
import Airpods from "./NavDropdownComponent/Airpods/Airpods";
import TvHome from "./NavDropdownComponent/TvHome/TvHome";
import Entertainment from "./NavDropdownComponent/Entertainment/Entertainment";
import Accesssories from "./NavDropdownComponent/Accesssories/Accesssories";
import Support from "./NavDropdownComponent/Support/Support";
import Search from "./NavDropdownComponent/Search/Search";

const NavDropDown = ({ nav, className }: any) => {
  // if (nav == "store") {
  return (
    <div className={className}>
      <div className="w-full text-[#000]">
        {/* {nav == "store" ? (
          <Store />
        ) : nav == "mac" ? (
          <Mac />
        ) : nav == "ipad" ? (
          <Ipad />
        ) : nav == "iphone" ? (
          <Iphone />
        ) : nav == "watch" ? (
          <Watch />
        ) : nav == "airpods" ? (
          <Airpods />
        ) : nav == "tvhome" ? (
          <TvHome />
        ) : nav == "entertainment" ? (
          <Entertainment />
        ) : nav == "accessories" ? (
          <Accesssories />
        ) : nav == "support" ? (
          <Support />
        ) : nav == "search" ? (
          <Search />
        ) : (
          ""
        )} */}
        {nav ? "Hello" : "Gelo"}
      </div>
    </div>
  );
  // }
};

export default NavDropDown;
