import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { ReviewProps } from "@/types/reviewTypes";

const ReviewCard = ({ reviewProps }: ReviewProps) => {
  const { user, review, rating } = reviewProps;

  return (
    <div className=" flex flex-col my-auto justify-between items-center">
      <div>
        <div className="flex justify-center gap-3 py-3">
          {" "}
          {Array.from({ length: rating }, (_, index) => (
            <TiStarFullOutline
              key={index}
              className="text-[#ebd14b] text-2xl"
            />
          ))}
        </div>
        <p>{review}</p>
      </div>
      <div className="flex justify-center items-center gap-3 py-6">
        <FaUser />
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
