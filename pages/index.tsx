import Image from "next/image";
import { Inter } from "next/font/google";
import Banner from "@/components/Banner/Banner";
import TopDeals from "@/components/TopDeals/TopDeals";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="container mx-auto bg-common">
      <Banner />
      <TopDeals />
    </main>
  );
}
