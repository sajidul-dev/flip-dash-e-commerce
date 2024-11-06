import Image from "next/image";
import { Inter } from "next/font/google";
import Banner from "@/components/Banner/Banner";
import TopDeals from "@/components/TopDeals/TopDeals";
import Categories from "@/components/Cetegories/Categories";
import ProductBuyingGuide from "@/components/Banner/ProductBuyingGuide";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="container mx-auto">
      <Banner />
      <ProductBuyingGuide />
      <div className="md:h-[100px] rounded my-5 ">
        <p className="text-base text-common-gray-text mb-3">Categories</p>
        <Categories />
      </div>
      <TopDeals />
    </main>
  );
}
