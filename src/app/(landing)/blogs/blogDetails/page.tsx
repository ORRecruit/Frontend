import React from "react";
import Navbar from "../../../../components/landing/navbar/navbar";
import About from "../../../../components/landing/about/about";
import Footer from "../../../../components/landing/footer/footer";
import BlogDetailsHeader from "@/components/landing/blogs/blogDetailsHeader/blogDetailsHeader";
import BlogDetailsText from "@/components/landing/blogs/blogDetailsText/blogDetailsText";

const page = () => {
  return (
    <>
      <Navbar />
      <BlogDetailsHeader />
      <BlogDetailsText />
      <About height="400px" backgroundImage="" />
      <Footer />
    </>
  );
};

export default page;
