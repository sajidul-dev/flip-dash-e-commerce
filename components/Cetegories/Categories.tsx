import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const router = useRouter();
  const categories = useSelector(
    (state: any) => state.categoriesReducer.categories
  );
  const handleNavigate = (id: string, category: string) => {
    router.push(`/categories/${category}/${id}`);
  };
  return (
    <div className="flex flex-wrap gap-6 bg-white">
      {categories &&
        categories.map((item: any) => {
          return (
            <div
              key={item._id}
              onClick={() => handleNavigate(item._id, item.name)}
              className="whitespace-nowrap px-3 py-2 cursor-pointer hover:bg-secondary hover:text-white text-base hover:text-lg transform hover:scale-110  transition-all duration-300 ease-in-out">
              {item.name}
            </div>
          );
        })}
    </div>
  );
};

export default Categories;
