import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const TopDeals = () => {
  const [topDealsItems, setTopDealsItems] = useState([
    {
      _id: 1,
      title: "title 1",
      comment: "Flat 70% off",
      image: "/images/top-deals/1.jpg",
    },
    {
      _id: 2,
      title: "title 2",
      comment: "Flat 70% off",
      image: "/images/top-deals/2.jpg",
    },
    {
      _id: 3,
      title: "title 3",
      comment: "Flat 70% off",
      image: "/images/top-deals/3.jpg",
    },
    {
      _id: 4,
      title: "title 4",
      comment: "Flat 70% off",
      image: "/images/top-deals/4.jpg",
    },
    {
      _id: 5,
      title: "title 5",
      comment: "Flat 70% off",
      image: "/images/top-deals/5.jpg",
    },
    {
      _id: 6,
      title: "title 6",
      comment: "Flat 70% off",
      image: "/images/top-deals/6.jpg",
    },
    {
      _id: 7,
      title: "title 7",
      comment: "Flat 70% off",
      image: "/images/top-deals/7.jpg",
    },
    {
      _id: 8,
      title: "title 8",
      comment: "Flat 70% off",
      image: "/images/top-deals/8.jpg",
    },
    {
      _id: 9,
      title: "title 9",
      comment: "Flat 70% off",
      image: "/images/top-deals/9.jpg",
    },
    {
      _id: 10,
      title: "title 10",
      comment: "Flat 70% off",
      image: "/images/top-deals/10.jpg",
    },
  ]);
  return (
    <div className="bg-white">
      <p className="p-4 text-xl font-semibold">Top Deals</p>
      <div className="flex flex-wrap gap-4 p-4">
        {topDealsItems.map((item) => {
          return (
            <div
              key={item._id}
              className="p-4 border-[0.5px] border-[#e0e0e0] w-[210px] flex flex-col justify-between">
              <Image
                width={200}
                height={200}
                quality={100}
                className="rounded-md"
                priority={true}
                loader={() => item.image}
                src={item.image}
                alt=""
              />
              <div className="flex justify-center items-center gap-4">
                <div>
                  <p className="text-center">{item.title}</p>
                  <p className="text-center text-base font-semibold">
                    {item.comment}
                  </p>
                </div>
                <button className="text-2xl">
                  <AiOutlineShoppingCart />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopDeals;
