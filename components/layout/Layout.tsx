import React from "react";
import Header from "../shared/Navbar";
import Footer from "../shared/Footer/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="bg-[#feffff]">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
