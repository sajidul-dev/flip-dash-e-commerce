import Reviews from "@/components/Reviews/Reviews";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";
import { RootState } from "@/redux/store/store";
import { Categories } from "@/types/categoriesType";
import { CartItem, Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiClock2 } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCash } from "react-icons/io";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>({});
  const user = useSelector((state: RootState) => state.userReducer.user);
  const categories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );
  const productId = router.query.id;
  // console.log(categories, "Categories");
  useEffect(() => {
    setLoading(true);
    if (productId) {
      axios
        .get(`/api/admin/product?id=${productId[1]}`)
        .then((res) => {
          setLoading(false);
          setProduct(res.data.product);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = (item: CartItem) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: 1,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  console.log(product, "Product");
  console.log(category, "Category");
  useEffect(() => {
    if (product.category) {
      const category = categories.find(
        (item: Categories) => item._id === product.category
      );
      setCategory(category);
    }
  }, [product, categories]);
  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto bg-white my-3">
        <div className="p-5 flex flex-wrap ">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              {product.url ? (
                <Image
                  width={330}
                  unoptimized
                  height={330}
                  // quality={100}
                  className="rounded-md"
                  priority={true}
                  loader={() => product.url}
                  src={product.url}
                  alt=""
                />
              ) : (
                <Skeleton height={330} width={292} />
              )}
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-y-4">
              <p className="text-gray">New Arrival</p>
              <p className="my-3 text-2xl font-semibold fon">
                {product.title || <Skeleton />}
              </p>
              <div className="flex justify-start items-center gap-3">
                <p className="text-2xl font-thin">
                  <FaBangladeshiTakaSign />
                </p>
                <span className="font-medium text-2xl">{product.price}</span>
                <p>({product.quantity} in stock)</p>
              </div>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>
              <p>
                <span className="font-semibold">Categories:</span>{" "}
                {category.name || <Skeleton />}
              </p>
              <p>
                <span className="font-semibold">Shop: </span>
                {product.shopName || <Skeleton />}
              </p>
              <div className="flex justify-start items-center gap-4">
                <Button className="bg-gray text-white px-3 py-2 rounded hover:bg-opacity-80 my-3">
                  Add to Favourite
                </Button>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-secondary px-3 py-2 rounded hover:bg-opacity-80 my-3"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="col-span-12 md:col-span-3 px-4">
              <p className="text-[#757575]">Service</p>
              <div className="flex justify-start gap-3 items-start">
                <p className="text-xl py-1 text-center">
                  {" "}
                  <CiClock2 />
                </p>
                <div>
                  <p>7 Days Returns</p>
                  <p className="text-common-gray-text">
                    Change of mind is not applicable
                  </p>
                </div>
              </div>
              <div className="flex justify-start items-center gap-3">
                {" "}
                <p className="text-xl py-1 text-center">
                  <PiWarningCircle />
                </p>
                <p>Warrenty not available</p>
              </div>
              <div className="flex justify-start items-center gap-3">
                {" "}
                <p className="text-xl py-1 text-center">
                  <IoIosCash />
                </p>
                <p>Cash on delivary available</p>
              </div>
              <p>Enjoy free shipping promotion with minimum spend of $499</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Reviews
          userId={user?._id}
          productId={productId && productId[1]}
          shopId={product.shopId}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetails;
