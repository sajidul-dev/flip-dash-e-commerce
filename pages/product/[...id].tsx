import Loading from "@/components/shared/Loading/Loading";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const router = useRouter();
  const products = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const productId = router.query.id;
  if (!productId) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto bg-white my-3">
      {products?.find((item: Product) => item._id == Number(productId[1]))
        ?.title || "No Product Found"}
    </div>
  );
};

export default ProductDetails;
