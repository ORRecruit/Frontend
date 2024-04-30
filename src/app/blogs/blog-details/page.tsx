"use client";
import React, { useEffect, useRef } from "react";
import { Suspense } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import Footer from "@/components/landing/footer/footer";
import BlogDetailsHeader from "@/components/landing/blogs/blogDetailsHeader/blogDetailsHeader";
import BlogDetailsText from "@/components/landing/blogs/blogDetailsText/blogDetailsText";

const page = () => {
  function SearchBarFallback() {
    return <>Loading...</>;
  }

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <Navbar scrollToBottom={scrollToBottom} />
        <BlogDetailsHeader />
        <BlogDetailsText />
        <Footer />
      </Suspense>
    </>
  );
};

export default page;
