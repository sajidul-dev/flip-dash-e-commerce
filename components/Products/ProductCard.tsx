import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";

interface Props {
  item: Product;
  addToCart: (item: Product) => void;
  addToFavourite: (item: Product) => void;
}

const ProductCard = ({ item, addToCart, addToFavourite }: Props) => {
  const router = useRouter();
  const favouriteItem = useSelector(
    (state: RootState) => state.favouriteReducer.items
  );

  const handleNavigate = (id: string, category: string) => {
    console.log(id);
    console.log(category, "cat");
    router.push(`/product/${category}/${id}`);
  };
  return (
    <div
      key={item._id}
      onClick={() => handleNavigate(item._id, item.category)}
      className="relative p-4 border-[0.5px] border-[#e0e0e0] w-[250px] flex flex-col justify-between hover:shadow-[20px_20px_20px_20px_#00000014] transition-all duration-300">
      <Image
        width={220}
        unoptimized
        height={200}
        // quality={100}
        className="rounded-md"
        priority={true}
        loader={() => item.url}
        src={item.url}
        alt=""
      />
      <div className="flex justify-center items-center gap-4">
        <div>
          <p className="text-center">{item.title}</p>
          <p className="text-center text-base font-semibold">{item.comment}</p>
        </div>
        <button onClick={() => addToCart(item)} className="text-2xl">
          <AiOutlineShoppingCart />
        </button>
        <p>{item.price}$</p>
      </div>
      <button
        type="button"
        onClick={() => addToFavourite(item)}
        className="absolute top-0 right-2 text-2xl">
        {favouriteItem.find((element) => element._id === item._id) ? (
          <MdOutlineFavorite />
        ) : (
          <MdOutlineFavoriteBorder />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
