"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const articlesPerPage = 12;
const totalArticles = 36;

interface blogGridInterface {
  articles: any;
}

const BlogGrid: React.FC<blogGridInterface> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const router = useRouter();

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = articles.slice(firstArticleIndex, lastArticleIndex);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    console.log("Selected Image URL:", imageUrl);
    router.push(imageUrl);
  };
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {articles.map((item: any, index: any) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              >
                <Link
                  href={"/blogs/blogDetails?blogNo=" + (index + 1)}
                  onClick={() => handleClick(item.image)}
                >
                  <Image
                    width={500}
                    height={500}
                    className="rounded-t-lg w-full"
                    src={item.image}
                    alt=""
                  />
                </Link>
                <div className="p-5">
                  <p className="text-xs mb-2 text-purple-artist rounded-lg w-max px-4 bg-light-gray">
                    Artist
                  </p>
                  <Link href={"/blogs/blogDetails?blogNo=" + (index + 1)}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {item.title}
                    </h5>
                  </Link>
                  <Link href={"/blogs/blogDetails?blogNo=" + (index + 1)}>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.description}
                    </p>
                  </Link>
                  <div className="flex items-center mb-8">
                    <div className="mr-4">
                      <Image
                        width={40}
                        height={40}
                        src="/finallogoORR.svg"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm">Online Remote Recruiting</p>
                      <p className="text-sm	text-text-gray">
                        {item.date} · 16 min read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
