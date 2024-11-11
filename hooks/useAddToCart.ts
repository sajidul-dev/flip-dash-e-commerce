import { CartItem, Product } from "@/types/productType";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";
import { useDispatch } from "react-redux";

export function useAddToCart(user: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleAddToCart = (item: Product) => {
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

  return { handleAddToCart, loading };
}
