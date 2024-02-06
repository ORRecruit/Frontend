import React from "react";
import Navbar from "../../../../components/landing/navbar/navbar";
import BlogDetailsHeader from "./blogDetailsHeader/blogDetailsHeader";
import BlogDetailsText from "./blogDetailsText/blogDetailsText";
import About from "../../../../components/landing/about/about";
import Footer from "../../../../components/landing/footer/footer";

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
