"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import Footer from "@/components/landing/footer/footer";
import BlogGrid from "@/components/landing/blogs/BlogGrid/BlogGrid";
import BlogHeader from "@/components/landing/blogs/BlogHeader/BlogHeader";
import createClient from "@/sanity-client"; // Make sure the path is correct

const Page: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchArticles();
    scrollToBottom();
  }, []);

  const fetchArticles = async () => {
    const query = '*[_type == "blog"]';
    try {
      const result = await createClient.fetch<any[]>(query);
      console.log("result.....kkkkk", result);
      const formattedArticles: any[] = result.map((article) => ({
        image: article.mainImage
          ? article.mainImage.asset.url
          : "/default-image.png",
        title: article.title,
        description: article.description,
        author: article.author,
        date: new Date(article.date).toLocaleDateString(),
      }));
      console.log("result", result);
      setArticles(formattedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <BlogHeader />
      <BlogGrid articles={articles} />
      <Footer />
    </>
  );
};

export default Page;
