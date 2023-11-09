import React, { useState } from "react";

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([
    {
      _id: 1,
      category: "About",
      links: [
        { _id: 1, slug: "contact-us", link: "Contact Us" },
        { _id: 2, slug: "about-us", link: "About Us" },
        { _id: 3, slug: "careers", link: "Careers" },
        { _id: 4, slug: "careers", link: "Careers" },
      ],
    },
    {
      _id: 2,
      category: "Help",
      links: [
        { _id: 1, slug: "contact-us", link: "Contact Us" },
        { _id: 2, slug: "about-us", link: "About Us" },
        { _id: 3, slug: "careers", link: "Careers" },
        { _id: 4, slug: "careers", link: "Careers" },
      ],
    },
    {
      _id: 3,
      category: "Consumer Policy",
      links: [
        { _id: 1, slug: "contact-us", link: "Contact Us" },
        { _id: 2, slug: "about-us", link: "About Us" },
        { _id: 3, slug: "careers", link: "Careers" },
        { _id: 4, slug: "careers", link: "Careers" },
      ],
    },
    {
      _id: 4,
      category: "Social",
      links: [
        { _id: 1, slug: "contact-us", link: "Contact Us" },
        { _id: 2, slug: "about-us", link: "About Us" },
        { _id: 3, slug: "careers", link: "Careers" },
        { _id: 4, slug: "careers", link: "Careers" },
      ],
    },
  ]);

  return (
    <footer className="bg-[#212121] mt-2 w-full">
      <div className="container mx-auto text-white py-10 grid grid-cols-12 gap-8">
        {footerLinks.map((item) => {
          return (
            <div key={item._id} className="col-span-3">
              <h1 className="text-xl font-bold">{item.category}</h1>
              {item.links.map((link) => {
                return (
                  <a
                    key={link._id}
                    href={`/store/${link.slug}`}
                    className="w-fit underline-appear hover:underline-appear block">
                    {link.link}
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
