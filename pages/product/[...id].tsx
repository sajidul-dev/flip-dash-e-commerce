import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
        <div className="p-5">
          <div>
            <Image
              width={220}
              unoptimized
              height={200}
              // quality={100}
              className="rounded-md"
              priority={true}
              loader={() => product.url}
              src={product.url}
              alt=""
            />
            <p className="my-3">{product.title}</p>
            <p>
              Price: <span className="font-semibold">{product.price}$</span>
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {product.description}
            </p>
            <Button className="bg-secondary px-3 py-2 rounded hover:bg-opacity-80 my-3">
              Add to Cart
            </Button>
          </div>
          <div></div>
        </div>
      ) || "No Product Found"}
    </div>
  );
};

export default ProductDetails;
