import {
  setCart as setCartAction,
  setDefaultCart,
} from "@/redux/slice/cartSlice/cartSlice";
import {
  setFavourite as setFavouriteAction,
  setDefaultFavourite,
} from "@/redux/slice/favouriteSlice/favouriteSlice";
import { RootState } from "@/redux/store/store";
import { CartItem } from "@/types/productType";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const TopDeals = () => {
  // const [topDealsItems, setTopDealsItems] = useState([
  //   {
  //     _id: 1,
  //     title: "title 1",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/1.jpg",
  //     price: 3,
  //   },
  //   {
  //     _id: 2,
  //     title: "title 2",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/2.jpg",
  //     price: 6,
  //   },
  //   {
  //     _id: 3,
  //     title: "title 3",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/3.jpg",
  //     price: 5,
  //   },
  //   {
  //     _id: 4,
  //     title: "title 4",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/4.jpg",
  //     price: 7,
  //   },
  //   {
  //     _id: 5,
  //     title: "title 5",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/5.jpg",
  //     price: 10,
  //   },
  //   {
  //     _id: 6,
  //     title: "title 6",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/6.jpg",
  //     price: 68,
  //   },
  //   {
  //     _id: 7,
  //     title: "title 7",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/7.jpg",
  //     price: 15,
  //   },
  //   {
  //     _id: 8,
  //     title: "title 8",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/8.jpg",
  //     price: 10,
  //   },
  //   {
  //     _id: 9,
  //     title: "title 9",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/9.jpg",
  //     price: 20,
  //   },
  //   {
  //     _id: 10,
  //     title: "title 10",
  //     category: "fashion",
  //     comment: "Flat 70% off",
  //     image: "/images/top-deals/10.jpg",
  //     price: 15,
  //   },
  // ]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favourite, setFavourite] = useState<CartItem[]>([]);
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );
  const topDealsItems = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const user = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    setFavourite(JSON.parse(localStorage.getItem("favourite") || "[]"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setDefaultCart([]));
      dispatch(setDefaultFavourite([]));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("favourite", JSON.stringify(favourite));
      cart.map((item) => {
        dispatch(setCartAction(item));
      });
      favourite.map((item) => {
        dispatch(setFavouriteAction(item));
      });
    }, 500);
  }, [cart, favourite, dispatch]);

  const addToCart = (item: CartItem) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setCart((prev: any) => [...prev, item]);
  };
  const addToFavourite = (item: CartItem) => {
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

  const handleNavigate = (id: number, category: string) => {
    router.push(`/product/${category}/${id}`);
  };

  return (
    <div className="bg-white">
      <p className="p-4 text-xl font-semibold">Top Deals</p>
      <div className="flex flex-wrap gap-6 p-4">
        {topDealsItems &&
          topDealsItems.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => handleNavigate(item._id, item.category)}
                className="relative p-4 border-[0.5px] border-[#e0e0e0] w-[250px] flex flex-col justify-between hover:shadow-[20px_20px_20px_20px_#00000014] transition-all duration-300">
                <Image
                  width={220}
                  unoptimized
                  height={200}
                  // quality={100}
                  className="rounded-md"
                  priority={true}
                  loader={() => item.image}
                  src={item.image}
                  alt=""
                />
                <div className="flex justify-center items-center gap-4">
                  <div>
                    <p className="text-center">{item.title}</p>
                    <p className="text-center text-base font-semibold">
                      {item.comment}
                    </p>
                  </div>
                  <button onClick={() => addToCart(item)} className="text-2xl">
                    <AiOutlineShoppingCart />
                  </button>
                  <p>{item.price}$</p>
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
          })}
      </div>
    </div>
  );
};

export default TopDeals;
