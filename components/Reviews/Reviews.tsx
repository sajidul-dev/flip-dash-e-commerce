import React from "react";
import Input from "../shared/Input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../shared/Loading/Loading";
import axios from "axios";
import toast from "react-hot-toast";

type Inputs = {
  review: string;
  password: string;
};
interface Props {
  userId?: string;
  productId?: string;
  shopId: string;
  product: any;
}

const Reviews = ({ userId, productId, shopId, product }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    if (data) {
      axios
        .post("/api/user/review", {
          userId,
          productId,
          shopId,
          rating: 3,
          review: data.review,
        })
        .then((res) => {
          if (res.data.review) {
            toast.success(`${res.data.message}`);
            product.reviews.push(res.data.review);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.response.data.message}`);
        });
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="container mx-auto bg-white my-3 p-5">
        <p className="text-common-gray-text">Ratings & Reviews</p>
        <div className="h-[1px] bg-common-gray-text"></div>
        <div>
          {product &&
            product?.reviews?.map((item: any) => {
              return (
                <div key={item._id} className="flex flex-col gap-3">
                  <p>{item.review}</p>
                  <p>{item.rating}</p>
                </div>
              );
            })}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("review", {
              required: { value: true, message: "Review is required" },
            })}
            type="text"
            placeholder="Write your thoughts"
            error={errors.review?.message}
          />
          <Input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Reviews;
