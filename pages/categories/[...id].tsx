import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";

const Category = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.userReducer.user);
  const categoryId = router.query.id;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      axios
        .get(`/api/user/categoryFilter?id=${categoryId[1]}`)
        .then((res) => {
          setProducts(res.data.product);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [categoryId]);

  const handleNavigate = (id: string, category: string) => {
    router.push(`/product/${category}/${id}`);
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

  return (
    <>
      <Loading loading={loading} />
      <div
        className="bg-white container mx-auto my-3 flex gap-8 flex-wrap
      justify-start p-10"
      >
        {products.length > 0
          ? products.map((item: any) => {
              return (
                <div
                  key={item._id}
                  className="relative p-4 border-[0.5px] border-[#e0e0e0] w-[250px] flex flex-col justify-between hover:shadow-[20px_20px_20px_20px_#00000014] transition-all duration-300"
                >
                  <div
                    onClick={() => handleNavigate(item._id, item.category)}
                    className="cursor-pointer"
                  >
                    <Image
                      width={220}
                      unoptimized
                      height={200}
                      // quality={100}
                      className="rounded-md"
                      loading="lazy"
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
                        className="text-2xl"
                      >
                        <p className="bg-common-gray-text rounded-full p-2 tooltip">
                          <span className="tooltiptext">Add to cart</span>
                          <AiOutlineShoppingCart />
                        </p>
                      </button>
                    </div>
                  </div>
                  {/* <button
                                type="button"
                                onClick={() => addToFavourite(item)}
                                className="absolute top-0 right-2 text-2xl">
                                {favouriteItem.find((element) => element._id === item._id) ? (
                                  <MdOutlineFavorite />
                                ) : (
                                  <MdOutlineFavoriteBorder />
                                )}
                              </button> */}
                </div>
              );
            })
          : "No Products found"}
      </div>
    </>
  );
};

export default Category;
