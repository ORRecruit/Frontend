import React from "react";
import Navbar from "../../../../components/landing/navbar/navbar";
import Footer from "../../../../components/landing/footer/footer";
import BlogDetailsHeader from "@/components/landing/blogs/blogDetailsHeader/blogDetailsHeader";
import BlogDetailsText from "@/components/landing/blogs/blogDetailsText/blogDetailsText";

const page = () => {
  return (
    <>
      <Navbar />
      <BlogDetailsHeader />
      <BlogDetailsText />
      <Footer />
    </>
  );
};

export default page;
