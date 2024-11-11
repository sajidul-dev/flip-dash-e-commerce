type ReviewType = {
  review: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
};

export interface ReviewProps {
  reviewProps: ReviewType;
}
