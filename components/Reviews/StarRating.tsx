import React from "react";
import Star from "./Star";

interface StarRatingProps {
  totalStars?: number;
  onRate?: (rating: number) => void;
  rating: number;
  setRating?: (rating: number) => void;
  clickable: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRate,
  rating,
  setRating,
  clickable,
}) => {
  const handleStarClick = (index: number) => {
    setRating && setRating(index + 1);
    onRate && onRate(index + 1);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          clickable={clickable}
          onClick={() => {
            if (clickable) {
              handleStarClick(index);
            }
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
