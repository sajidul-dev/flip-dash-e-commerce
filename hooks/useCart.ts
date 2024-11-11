import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCart as setCartAction } from "@/redux/slice/cartSlice/cartSlice";
import { CartItem } from "@/types/cartType";

export function useCart(cartItem: CartItem | null, user: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = (id: string) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    if (!cartItem) return toast.error("Cart is empty", { id: "1" });
    const product = cartItem.productList.find(
      (item: CartItem) => item._id === id
    );
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: product._id,
        quantity: -product.itemQuantity,
      })
      .then((res) => {
        setLoading(false);
        toast.success("Product removed from cart", { id: "1" });
        dispatch(setCartAction(res.data.cart[0]));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleIncreaseItem = (item: CartItem) => {
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

  const handleDecreaseItem = (item: CartItem) => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    setLoading(true);
    axios
      .put("/api/user/cart", {
        userId: user?._id,
        productId: item._id,
        quantity: -1,
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

  const handleClearAll = () => {
    if (!user) return toast.error("Please login to continue", { id: "1" });
    if (!cartItem) return toast.error("Cart is empty", { id: "1" });
    setLoading(true);
    axios
      .delete(`/api/user/cart?cartId=${cartItem._id}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message, { id: "1" });
        dispatch(setCartAction(null));
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`/api/user/cart?id=${user?._id}`);
      const cart = response.data.cart[0];
      setTimeout(() => {
        dispatch(setCartAction(cart));
      }, 500);
    } catch (error) {
      console.error(error);
      dispatch(setCartAction(null));
    }
  };

  return {
    handleDelete,
    handleIncreaseItem,
    handleDecreaseItem,
    handleClearAll,
    fetchCartData,
    loading,
    setLoading,
  };
}
