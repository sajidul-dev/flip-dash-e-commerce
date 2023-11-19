import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiClock2 } from "react-icons/ci";

const ProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const productId = router.query.id;

  useEffect(() => {
    setLoading(true);
    if (productId) {
      axios
        .get(`/api/admin/product?id=${productId[1]}`)
        .then((res) => {
          setLoading(false);
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto bg-white my-3">
      {(
        <div className="p-5 flex flex-wrap ">
          <div className="flex justify-center gap-6 w-[calc(100%-300px)]">
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
            <div className="w-[calc(100%-330px)]">
              <p className="my-3">{product.title}</p>
              <p>
                Price: <span className="font-semibold">{product.price}$</span>
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>
              <div className="flex justify-start items-center gap-4">
                <Button className="bg-gray px-3 py-2 rounded hover:bg-opacity-80 my-3">
                  Buy Now
                </Button>
                <Button className="bg-secondary px-3 py-2 rounded hover:bg-opacity-80 my-3">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[300px] px-4">
            <p className="text-[#757575]">Service</p>
            <div className="flex">
              <p className="text-xl py-2 text-center">
                {" "}
                <CiClock2 />
              </p>
              <p>
                7 Days Returns <br />
                Change of mind is not applicable
              </p>
            </div>
            <p>Change of mind is not applicable</p>
            <p>Warrenty not available</p>
            <p>Cash on delivary available</p>
            <p>Enjoy free shipping promotion with minimum spend of $499</p>
          </div>
        </div>
      ) || "No Product Found"}
    </div>
  );
};

export default ProductDetails;
