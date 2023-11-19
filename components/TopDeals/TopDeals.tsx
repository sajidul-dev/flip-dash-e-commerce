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
  const [cart, setCart] = useState<Product[]>([]);
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

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    setFavourite(JSON.parse(localStorage.getItem("favourite") || "[]"));
  }, []);

  useEffect(() => {
    axios
      .get("api/admin/product")
      .then((res) => setTopDeals(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setDefaultCart([]));
      dispatch(setDefaultFavourite([]));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("favourite", JSON.stringify(favourite));
      // cart?.map((item) => {
      //   dispatch(setCartAction(item));
      // });
      // favourite.map((item) => {
      //   dispatch(setFavouriteAction(item));
      // });
    }, 500);
  }, [cart, favourite, dispatch]);

  const addToCart = (item: Product) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setCart((prev: any) => [...prev, item]);
  };
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
    // console.log(item, "item");
    if (!user) return toast.error("Please login to continue", { id: "1" });
    // const foundItem = allCart.find((element) => element._id === item._id);
    // const restItem = allCart.filter((element) => element._id !== item._id);
    // if (foundItem) {
    //   const modifiedItem = {
    //     ...foundItem,
    //     quantity: foundItem.quantity && foundItem?.quantity + 1,
    //     totalPrice:
    //       foundItem.totalPrice && foundItem.totalPrice + foundItem.price,
    //   };
    //   setCart([...restItem, modifiedItem]);
    //   toast.success("Item added to cart", { id: "1" });
    // } else {
    //   const cartItem = {
    //     ...item,
    //     quantity: 1,
    //     totalPrice: Number(item.price),
    //   };
    //   setCart((prev) => [...prev, cartItem]);
    //   toast.success("Item added to cart", { id: "1" });
    // }
    axios
      .put("/api/user/cart", {
        userId: user._id,
        productId: item._id,
        quantity: 1,
      })
      .then((res) => {
        toast.success(res.data.message, { id: "1" });
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(setCartAction(cartItem));
    // axios.put("/api/user/cart")
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
