import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import {
  setFavourite as setFavouriteAction,
  setDefaultFavourite,
} from "@/redux/slice/favouriteSlice/favouriteSlice";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";

const TopDeals = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [favourite, setFavourite] = useState<Product[]>([]);
  const [topDeals, setTopDeals] = useState<any>([]);
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );
  const topDealsItems = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const user = useSelector((state: RootState) => state.userReducer.user);
  const allCart = useSelector((state: RootState) => state.cartReducer.items);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  //   setFavourite(JSON.parse(localStorage.getItem("favourite") || "[]"));
  // }, []);

  useEffect(() => {
    axios
      .get("api/admin/product")
      .then((res) => setTopDeals(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  const addToFavourite = (item: Product) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    const foundItem = favouriteItem.find((element) => element._id === item._id);
    if (foundItem) {
      const filteredItem = favourite.filter(
        (element) => element._id !== item._id
      );
      setFavourite(filteredItem);
    } else {
      setFavourite((prev: any) => [...prev, item]);
    }
  };

  const handleAddToCart = (item: Product) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    axios
      .put("/api/user/cart", {
        userId: user._id,
        productId: item._id,
        quantity: 1,
      })
      .then((res) => {
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNavigate = (id: string, category: string) => {
    console.log(id);
    console.log(category, "cat");
    router.push(`/product/${category}/${id}`);
  };
  return (
    <div className="bg-white">
      <p className="p-4 text-xl font-semibold">Top Deals</p>
      <div className="flex flex-wrap gap-6 p-4">
        {topDeals.length > 0 ? (
          topDeals.map((item: Product) => {
            return (
              <div
                key={item._id}
                className="relative p-4 border-[0.5px] border-[#e0e0e0] w-[250px] flex flex-col justify-between hover:shadow-[20px_20px_20px_20px_#00000014] transition-all duration-300">
                <div
                  onClick={() => handleNavigate(item._id, item.category)}
                  className="cursor-pointer">
                  <Image
                    width={220}
                    unoptimized
                    height={200}
                    // quality={100}
                    className="rounded-md"
                    priority={true}
                    loader={() => item.url}
                    src={item.url}
                    alt=""
                  />
                </div>
                <div className="">
                  <div>
                    <p className="text-sm py-2">
                      {item.title.length > 60
                        ? `${item.title.slice(0, 60)}...`
                        : item.title}
                    </p>
                    {/* <p className="text-center text-base font-semibold">
                      {item.comment}
                    </p> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-secondary text-base font-medium">
                      ${item.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="text-2xl">
                      <AiOutlineShoppingCart />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addToFavourite(item)}
                  className="absolute top-0 right-2 text-2xl">
                  {favouriteItem.find((element) => element._id === item._id) ? (
                    <MdOutlineFavorite />
                  ) : (
                    <MdOutlineFavoriteBorder />
                  )}
                </button>
              </div>
            );
          })
        ) : (
          <Skeleton className="w-[250px]" baseColor="#000" count={10} />
        )}
      </div>
    </div>
  );
};

export default TopDeals;
