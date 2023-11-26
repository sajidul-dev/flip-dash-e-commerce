import Reviews from "@/components/Reviews/Reviews";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";
import { RootState } from "@/redux/store/store";
import { CartItem } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiClock2 } from "react-icons/ci";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const productId = router.query.id;

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
  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto bg-white my-3">
        {(
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
                  <Skeleton height={330} width={330} />
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                <p className="my-3 text-xl">{product.title || <Skeleton />}</p>
                <p>
                  Price: <span className="font-semibold">{product.price}$</span>
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {product.description}
                </p>
                <div>
                  <p>Shop: {}</p>
                </div>
                <div className="flex justify-start items-center gap-4">
                  <Button className="bg-gray text-white px-3 py-2 rounded hover:bg-opacity-80 my-3">
                    Add to Favourite
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-secondary px-3 py-2 rounded hover:bg-opacity-80 my-3">
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
                <p>Change of mind is not applicable</p>
                <p>Warrenty not available</p>
                <p>Cash on delivary available</p>
                <p>Enjoy free shipping promotion with minimum spend of $499</p>
              </div>
            </div>
          </div>
        ) || "No Product Found"}
      </div>
      <div>
        <Reviews />
      </div>
    </>
  );
};

export default ProductDetails;
