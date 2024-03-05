import React from "react";
import { Suspense } from "react";
import Navbar from "../../../../components/landing/navbar/navbar";
import Footer from "../../../../components/landing/footer/footer";
import BlogDetailsHeader from "@/components/landing/blogs/blogDetailsHeader/blogDetailsHeader";
import BlogDetailsText from "@/components/landing/blogs/blogDetailsText/blogDetailsText";

const page = () => {
  function SearchBarFallback() {
    return <>Loading...</>;
  }
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <Navbar />
        <BlogDetailsHeader />
        <BlogDetailsText />
        <Footer />
      </Suspense>
    </>
  );
};

export default page;
