import Loading from "@/components/shared/Loading/Loading";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Category = () => {
  const router = useRouter();
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

  return (
    <>
      <Loading loading={loading} />
      <div className="bg-white container mx-auto my-3">
        {products.length > 0
          ? products.map((item: any) => {
              return <div key={item._id}>{item.title}</div>;
            })
          : "No Products found"}
      </div>
    </>
  );
};

export default Category;
