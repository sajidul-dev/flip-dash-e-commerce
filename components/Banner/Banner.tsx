import Image from "next/image";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Banner = () => {
  const [bannerItems, setBannerItems] = useState([
    {
      _id: 1,
      slug: "iphone15problack-slug",
      image: "/images/hero_iphone15pro_large.jpg",
    },
    {
      _id: 2,
      slug: "iphone15prowhite-slug",
      image: "/images/hero_iphone15_announce_large.jpg",
    },
  ]);

  return (
    <div className=" my-2">
      <Carousel
        draggable
        showDots
        autoPlay
        autoPlaySpeed={5000}
        responsive={responsive}>
        {bannerItems.map((bannerItem) => {
          return (
            <div className="" key={bannerItem._id}>
              <Image
                width={1920}
                height={650}
                layout="responsive"
                // objectFit="cover"
                quality={100}
                className="rounded-md"
                priority={true}
                // sizes="100vw"
                loader={() => bannerItem.image}
                src={bannerItem.image}
                alt=""
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
