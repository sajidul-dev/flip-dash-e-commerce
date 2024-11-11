import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("/api/user/review")
        .then((res) => {
          console.log(res.data.reviews);
          setReviews(res.data.reviews);
        })
        .then((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="my-6 bg-white p-6">
      <p className="text-center text-5xl font-bold py-6">
        Hear From Our Happy Customers
      </p>
      <div className="grid grid-cols-12 gap-6 w-4/5 mx-auto">
        {reviews &&
          reviews.map((review: any) => {
            return (
              <div key={review._id} className="col-span-4">
                <ReviewCard reviewProps={review} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CustomerReview;
