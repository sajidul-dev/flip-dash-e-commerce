import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/shared/Button/Button";
import Loading from "@/components/shared/Loading/Loading";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import { RootState } from "@/redux/store/store";
import { Product } from "@/types/productType";
import axios from "axios";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { BsCameraFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const imgbbAPI = "08b06c8e39357d81837495ad55693154";

const Shop = () => {
  const dispatch = useDispatch();
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [shopCategory, setShopCategory] = useState<string | undefined>("");
  const [shopProducts, setShopProducts] = useState<Product[]>([]);
  const shop = useSelector((state: RootState) => state.sellerReducer.seller);
  const categories = useSelector(
    (state: RootState) => state.categoriesReducer.categories
  );
  useEffect(() => {
    const findedCategory = categories.find(
      (category) => category._id == shop?.shopCategory
    );
    if (findedCategory) {
      setShopCategory(findedCategory.name);
    }
  }, [categories, shop]);

  useEffect(() => {
    if (shop) {
      axios
        .get(`/api/seller/products?id=${shop._id}`)
        .then((res) => setShopProducts(res.data.products))
        .catch((err) => toast.error(err.response.data.message, { id: "1" }));
    }
  }, [shop]);

  const handleButtonClick = (isCover: boolean) => {
    if (isCover) {
      if (coverInputRef.current) {
        coverInputRef.current.click();
      }
    } else {
      if (profileInputRef.current) {
        profileInputRef.current.click();
      }
    }
  };

  const handleCoverChange = (
    e: ChangeEvent<HTMLInputElement>,
    isCover: boolean
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      axios
        .post(`https://api.imgbb.com/1/upload?key=${imgbbAPI}`, formData)
        .then((res) => {
          if (res.data) {
            let data;
            if (isCover) {
              data = { _id: shop?._id, coverPhoto: res.data.data.display_url };
            } else {
              data = {
                _id: shop?._id,
                profilePhoto: res.data.data.display_url,
              };
            }
            axios
              .put("/api/auth/seller/sellerProfile", data)
              .then((res) => {
                if (res.data) {
                  toast.success(`${res.data.message}`, { id: "33" });
                  dispatch(setSeller(res.data.seller));
                  setLoading(false);
                }
              })
              .catch((err) => {
                setLoading(false);
                toast.error(`${err.response.data.message}`);
              });
          }
        });
    }
  };
  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <DashboardLayout>
      <div>
        <div className="relative">
          {shop?.coverPhoto ? (
            <Image
              style={{ width: "1100px", height: "200px" }}
              width={1100}
              unoptimized
              height={200}
              // quality={100}
              className="rounded-md"
              priority={true}
              loader={() => shop.coverPhoto}
              src={shop.coverPhoto}
              alt=""
            />
          ) : (
            <div className="w-full text-center !h-[200px] flex flex-col items-center justify-center">
              <Image
                style={{ width: "1100px", height: "200px" }}
                width={1100}
                // unoptimized
                height={200}
                quality={100}
                className="rounded-md"
                priority={true}
                loader={() => "https://i.ibb.co/j3r2kHW/cover.webp"}
                src="https://i.ibb.co/j3r2kHW/cover.webp"
                alt=""
              />
            </div>
          )}
          <input
            ref={coverInputRef}
            onChange={(e) => handleCoverChange(e, true)}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => handleButtonClick(true)}
            className="absolute right-4 bottom-4 px-3 py-2 rounded bg-black bg-opacity-20 flex items-center gap-2 text-white font-medium"
          >
            <AiOutlineCamera />
            Upload cover photo
          </Button>
          <div className="absolute -bottom-16 left-4">
            <div className="relative">
              {shop?.profilePhoto ? (
                <Image
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "100%",
                  }}
                  width={1100}
                  loading="lazy"
                  // unoptimized
                  height={200}
                  quality={100}
                  className="rounded-md"
                  loader={() => shop.profilePhoto}
                  src={shop.profilePhoto}
                  alt=""
                />
              ) : (
                <Image
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "100%",
                  }}
                  width={1100}
                  loading="lazy"
                  // unoptimized
                  height={200}
                  quality={100}
                  className="rounded-md"
                  loader={() => "https://i.ibb.co/j3r2kHW/cover.webp"}
                  src="https://i.ibb.co/j3r2kHW/cover.webp"
                  alt=""
                />
              )}
              <input
                ref={profileInputRef}
                onChange={(e) => handleCoverChange(e, false)}
                type="file"
                className="hidden"
              />
              <p
                onClick={() => handleButtonClick(false)}
                className="absolute -right-2 bottom-3 text-xl w-8 h-8 bg-[#D8DADF]  flex justify-center items-center rounded-full cursor-pointer"
              >
                <BsCameraFill />
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-xl font-semibold mt-3">
          {shop?.shopName}
        </p>
        <div className="mt-10">{shopCategory}</div>
        <div>
          <table className="mt-8 w-full">
            <thead className="pb-5">
              <tr className="capitalize">
                <th className="text-left flex gap-x-2 whitespace-nowrap">
                  Image
                </th>
                <th className="text-left">Product Title</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {shopProducts.length > 0
                ? shopProducts.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="bg-[#FFFFFF] hover:bg-gray hover:shadow-md rounded-md"
                      >
                        <td>
                          <Image
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "100%",
                            }}
                            width={1100}
                            // unoptimized
                            height={200}
                            quality={100}
                            className="rounded-md"
                            priority={true}
                            loader={() => item.url}
                            src={item.url}
                            alt=""
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>
                          <span className="font-medium">${item.price}</span>
                        </td>
                        {/* <td>
                        {category.parentCategory
                          ? category.parentCategory?.name
                          : "No parent category"}
                      </td> */}
                        {/* <td className="">
                        <div className="flex gap-4">
                          <Button
                            onClick={() =>
                              setEditCategory({ id: category._id, value: true })
                            }
                            className="bg-secondary px-2 py-1 hover:bg-opacity-90">
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="bg-danger px-2 py-1 hover:bg-opacity-90">
                            Delete
                          </Button>
                        </div>
                      </td> */}
                      </tr>
                    );
                  })
                : " "}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Shop;

// export async function getServerSideProps(context: any) {
//   const res = await axios
//     .get("/api/auth/seller/products")
//     .then((res) => console.log(res.data));
//   return { props: { data: res } };
//   // const;
//   // console.log(context, "Context");
// }
