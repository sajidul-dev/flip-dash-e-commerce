import { Product } from "@/types/productType";
import axios from "axios";
import { useEffect, useState } from "react";

export function useGetProduct(productId: string) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    setLoading(true);
    if (productId) {
      axios
        .get(`/api/admin/product?id=${productId}`)
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

  return { product, loading };
}
