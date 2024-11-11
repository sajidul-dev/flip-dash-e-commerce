import Reviews from "@/components/Reviews/Reviews";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Categories } from "@/types/categoriesType";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCash } from "react-icons/io";
import { useGetProduct } from "@/hooks/useGetProduct";
import { useAddToCart } from "@/hooks/useAddToCart";

const ProductDetails = () => {
  const router = useRouter();
  const [category, setCategory] = useState<any>({});
  const user = useSelector((state: RootState) => state.userReducer.user);
  const categories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );
  const { product, loading: productLoading } = useGetProduct(
    (router.query.id as string[] | undefined)?.[1] as string
  );
  const { handleAddToCart, loading: addToCartLoading } = useAddToCart(user);
  const productId = router.query.id;

  useEffect(() => {
    if (product?.category) {
      const category = categories.find(
        (item: Categories) => item._id === product.category
      );
      setCategory(category);
    }
  }, [product, categories]);
  return (
    <>
      <Loading loading={productLoading || addToCartLoading} />
      <div className="container mx-auto bg-white my-3">
        <div className="p-5 flex flex-wrap ">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              {product?.url ? (
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
                {product?.title || <Skeleton />}
              </p>
              <div className="flex justify-start items-center gap-3">
                <p className="text-2xl font-thin">
                  <FaBangladeshiTakaSign />
                </p>
                <span className="font-medium text-2xl">{product?.price}</span>
                <p>({product?.quantity} in stock)</p>
              </div>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {product?.description}
              </p>
              <p>
                <span className="font-semibold">Categories:</span>{" "}
                {category.name || <Skeleton />}
              </p>
              <p>
                <span className="font-semibold">Shop: </span>
                {product?.shopName || <Skeleton />}
              </p>
              <div className="flex justify-start items-center gap-4">
                <Button className="bg-gray text-white px-3 py-2 rounded hover:bg-opacity-80 my-3">
                  Add to Favourite
                </Button>
                {product && (
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-secondary px-3 py-2 rounded hover:bg-opacity-80 my-3"
                  >
                    Add to Cart
                  </Button>
                )}
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
          shopId={product?.shopId || ""}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetails;
