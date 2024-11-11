import React, { useState } from "react";
import Input from "../shared/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../shared/Loading/Loading";
import axios from "axios";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import Image from "next/image";
import { useGetProduct } from "@/hooks/useGetProduct";
import { Product } from "@/types/productType";

type Inputs = {
  review: string;
  password: string;
};
interface Props {
  userId?: string;
  productId?: string;
  shopId: string;
  product: any;
  setProduct: (product: any) => void;
}

const PostReviews = ({
  userId,
  productId,
  shopId,
  product,
  setProduct,
}: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [rating, setRating] = useState<number>(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const handleRating = (rating: number) => {
    setRating(rating);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    setLoading(true);
    if (data) {
      try {
        axios
          .post("/api/user/review", {
            userId,
            productId,
            shopId,
            rating: rating,
            review: data.review,
          })
          .then((res) => {
            if (res.data.review) {
              toast.success(`${res.data.message}`);
              console.log(res.data.review);
              setProduct((prev: any) => ({
                ...prev,
                reviews: [res.data.review, ...product.reviews],
              }));
            }
          })
          .catch((err) => {
            toast.error(`${err.response.data.message}`);
          });
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
        reset();
        setRating(0);
      }
    }
  };

  console.log(product?.reviews);

  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto bg-white my-3 p-5">
        <p className="text-common-gray-text">Ratings & Reviews</p>
        <div className="h-[1px] bg-common-gray-text"></div>

        <div className="w-4/5 mx-auto my-6">
          <p className="text-xl text-[#6b6262] font-medium my-4">
            Add a review
          </p>
          <div className="flex items-center gap-4">
            <p className="text-lg text-[#6b6262] font-medium">Your rating *</p>
            <StarRating
              onRate={handleRating}
              setRating={setRating}
              rating={rating}
              clickable={true}
            />
          </div>
          <p className="text-lg text-[#6b6262] font-medium my-3">
            Your review *
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              register={register("review", {
                required: { value: true, message: "Review is required" },
              })}
              type="text"
              placeholder="Write your thoughts"
              error={errors.review?.message}
              className="w-full"
            />
            <Input type="submit" value="Submit" className="my-4 bg-secondary" />
          </form>
          <p className="text-xl text-[#6b6262] font-medium my-4">
            Reviews({product?.reviews?.length})
          </p>
          <div>
            {product &&
              product?.reviews?.map((item: any) => {
                return (
                  <div key={item._id} className="flex items-start my-3 gap-3">
                    <Image
                      src={"/images/user.png"}
                      loader={() => "/images/user.png"}
                      className="rounded-full"
                      alt=""
                      loading="lazy"
                      width={50}
                      height={50}
                    />
                    <div>
                      <p>{item.user.name}</p>
                      <StarRating rating={item.rating} clickable={false} />
                      <p>{item.review}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostReviews;
