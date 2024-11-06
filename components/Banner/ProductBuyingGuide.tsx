import React from "react";

const ProductBuyingGuide = () => {
  const guideObj = [
    {
      id: "01",
      title: "Order Online",
      description:
        "Share some details here. This is Flexible section where you can share anything you want.",
    },
    {
      id: "02",
      title: "Free Shipping",
      description:
        "Share some details here. This is Flexible section where you can share anything you want.",
    },
    {
      id: "03",
      title: "More Freshness",
      description:
        "Share some details here. This is Flexible section where you can share anything you want.",
    },
    {
      id: "04",
      title: "Safe Payment",
      description:
        "Share some details here. This is Flexible section where you can share anything you want.",
    },
  ];

  return (
    <div className="bg-[#fef7f5] py-6 flex justify-around items-center gap-4 ">
      {guideObj.map((item) => {
        return (
          <div key={item.id} className="h-[160px] flex w-[300px] gap-4">
            <div className="w-[1px] bg-[#ff6e4e] h-full rounded-lg"></div>
            <div>
              <p className="mb-5 text-base font-normal text-[#ff6e4e]">
                {item.id}
              </p>
              <p className="text-[24px] font-bold mb-[10px]">{item.title}</p>
              <p className="text-base font-normal text-[#6b6262]">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBuyingGuide;
