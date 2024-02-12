import React from "react";
import Navbar from "../../../components/landing/navbar/navbar";
import About from "../../../components/landing/about/about";
import Footer from "../../../components/landing/footer/footer";
import BlogGrid from "@/components/landing/blogs/BlogGrid/BlogGrid";
import BlogHeader from "@/components/landing/blogs/BlogHeader/BlogHeader";

const page = () => {
  const articles = [
    {
      image: "/blog-grid-img.svg",
      title: "abc",
      description: "any description",
      author: "shan",
      date: "any date",
    },
    {
      image: "/blog-grid-img.svg",
      title: "abc",
      description: "any description",
      author: "shan",
      date: "any date",
    },
    {
      image: "/blog-grid-img.svg",
      title: "abc",
      description: "any description",
      author: "shan",
      date: "any date",
    },
    {
      image: "/blog-grid-img.svg",
      title: "abc",
      description: "any description",
      author: "shan",
      date: "any date",
    },
    {
      image: "/blog-grid-img.svg",
      title: "abc",
      description: "any description",
      author: "shan",
      date: "any date",
    },
  ];
  return (
    <>
      <Navbar />
      <BlogHeader />
      <BlogGrid articles={articles} />
      <About height="400px" backgroundImage="" />
      <Footer />
    </>
  );
};

export default page;
