import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const router = useRouter();
  // const products = useSelector(
  //   (state: RootState) => state.productReducer.products
  // );
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
      {product.title || "No Product Found"}
    </div>
  );
};

export default ProductDetails;
