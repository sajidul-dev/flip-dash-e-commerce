import React, { useEffect } from "react";
import NavLink from "./NavLink";
import NavDropDown from "./NavDropDown";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import { BsInboxes } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { RemoveCookies } from "../Cookies/Cookies";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import axios from "axios";
import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";

interface Props {
  openDropDown: boolean;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ openDropDown, setOpenDropDown }: Props) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cartReducer.items);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );
  const shop = useSelector((state: RootState) => state.sellerReducer.seller);
  const handleLogout = () => {
    RemoveCookies("user");
    dispatch(setUser(null));
    RemoveCookies("seller");
    dispatch(setSeller(null));
    setOpenDropDown(false);
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`/api/user/cart?id=${user?._id}`);
        const cart = response.data.cart[0];
        console.log(cart, "Cart");
        // if (isMounted) {
        setTimeout(() => {
          dispatch(setCartAction(cart));
        }, 500);
        // }
      } catch (error) {
        console.error(error);
        dispatch(setDefaultCart([]));
      }
    };
    if (user) {
      fetchCartData();
    }
  }, [dispatch, user]);
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
            route={shop ? "/dashboard/shop" : "/auth/seller"}>
            <BsInboxes />
            <p>{shop ? shop.shopName : "Become a Seller"}</p>
          </NavLink>
          {!user && !shop ? (
            <>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/login">
                <BiUser />
                <p>Sign in</p>
              </NavLink>
              <NavLink
                className="px-[10px] flex items-center space-x-2 hover:bg-common hover:rounded-lg"
                route="/auth/register">
                <BiUser />
                <p>Sign up</p>
              </NavLink>
            </>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenDropDown(!openDropDown);
              }}
              className="py-[14px] cursor-pointer flex items-center gap-3">
              {shop ? shop.name : user?.name}
              {openDropDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </div>
          )}
          <NavDropDown
            className={`absolute top-10 right-8 bg-white shadow-2xl mt-[30px] z-50 text-white w-[400px] transition-all ease-in-out duration-500 ${
              openDropDown ? "h-[200px] opacity-100" : "h-0 opacity-0"
            }`}
            openDropDown
            setOpenDropDown
            handleLogout={handleLogout}
          />
          <NavLink
            className="py-[14px] relative flex items-center text-2xl cursor-pointer"
            route="/cart">
            <AiOutlineShoppingCart />
            <div className="absolute top-[0px] right-[-15px] text-base bg-[#000] text-white rounded-full w-full flex justify-center items-center">
              {/* <span>{cartItem?.length}</span> */}
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
