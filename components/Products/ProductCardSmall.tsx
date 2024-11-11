import React from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../shared/Button/Button";
import Image from "next/image";
import { CartItem } from "@/types/cartType";

interface Props {
  item: CartItem;
  handleDecreaseItem: (item: any) => void;
  handleIncreaseItem: (item: any) => void;
  handleDelete: (item: any) => void;
}

const ProductCardSmall = ({
  item,
  handleDecreaseItem,
  handleIncreaseItem,
  handleDelete,
}: Props) => {
  return (
    <div
      key={item?._id}
      className="mb-3 p-3 relative flex justify-between gap-4 bg-white"
    >
      <div className="flex space-x-4">
        {item?.url && (
          <Image
            style={{ width: "120px", height: "80px" }}
            width={120}
            // unoptimized
            height={80}
            quality={100}
            className="rounded-md"
            loading="lazy"
            loader={() => item.url}
            src={item.url}
            alt=""
          />
        )}
        <div>
          <p className="">{item?.title}</p>
          {item.properties && item.properties[0] && (
            <p className="text-common-gray-text mt-1">
              {item.properties[0].propertyName}:
              {item.properties[0].propertyValue}
            </p>
          )}
          <p className="text-xs mt-1">Only {item.quantity} item in stock</p>
        </div>
      </div>
      <div className="max-w-[200px]">
        <div className="text-center">${item?.itemTotal}</div>
        <div className="flex gap-4 my-2">
          <Button
            onClick={() => item && handleDecreaseItem(item)}
            className="cursor-pointer px-2 bg-[#9e9e9e] text-base"
          >
            -
          </Button>
          <p>{item?.itemQuantity}</p>
          <Button
            onClick={() => item && handleIncreaseItem(item)}
            className="cursor-pointer px-2 bg-[#9e9e9e] text-base"
          >
            +
          </Button>
        </div>

        <div className="flex justify-between my-2">
          <button
            type="button"
            // onClick={() => addToFavourite(item)}
            className="text-2xl text-common-gray-text hover:text-secondary"
          >
            {/* {favouriteItem.find((element) => element._id === item._id) ? (
                  // ) : ( */}
            {/* <MdOutlineFavorite /> */}
            <MdOutlineFavoriteBorder />
            {/* )} */}
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item._id)}
            className="text-2xl text-common-gray-text hover:text-danger"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      {/* <Button
                          onClick={() => handleDelete(item._id)}
                          className="absolute right-0 top-0 px-3 py-2 bg-[#c51919] text-white">
                          X
                        </Button> */}
    </div>
  );
};

export default ProductCardSmall;
