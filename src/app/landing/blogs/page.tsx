import React from "react";
import Navbar from "../../../components/landing/navbar/page";
import BlogHeader from "./blogHeader/blogHeader";
import BlogGrid from "./blogGrid/blogGrid";

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
    </>
  );
};

export default page;
