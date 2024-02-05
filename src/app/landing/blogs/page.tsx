import React from "react";
import Navbar from "../../../components/landing/navbar/page";
import BlogHeader from "./blogHeader/blogHeader";
import BlogGrid from "./blogGrid/blogGrid";
import About from "./../../../components/landing/about/page";
import Footer from "./../../../components/landing/footer/page";

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
