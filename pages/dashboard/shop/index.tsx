import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/shared/Button/Button";
import { RemoveCookies } from "@/components/shared/Cookies/Cookies";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const shop = useSelector((state: RootState) => state.sellerReducer.seller);

  const handleShopLogout = () => {
    router.push("/");
  };

  return (
    <DashboardLayout>
      <div>
        <p>My shop {shop?.shopName}</p>
        <Button
          onClick={handleShopLogout}
          className="px-3 py-2 bg-danger rounded">
          Log Out
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Shop;
