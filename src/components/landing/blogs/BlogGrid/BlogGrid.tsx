"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface blogGridInterface {
  articles: any;
}

const BlogGrid: React.FC<blogGridInterface> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const handleNext = () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = Math.min(startIndex + articlesPerPage, articles.length);
  const slicedArticles = articles.slice(startIndex, endIndex);

  const router = useRouter();

  const handleClick = (imageUrl: string) => {
    console.log("Selected Image URL:", imageUrl);
    router.push(imageUrl);
  };
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {slicedArticles.map((item: any, index: any) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              >
                <Link
                  href={"/blogs/blog-details?blogNo=" + (index + 1)}
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
                  <Link href={"/blogs/blog-details?blogNo=" + (index + 1)}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {item.title}
                    </h5>
                  </Link>
                  <Link href={"/blogs/blog-details?blogNo=" + (index + 1)}>
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
          <nav
            className="w-full flex flex-col md:flex-row justify-center mt-4 items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <ul className="inline-flex items-stretch -space-x-px">
              <li onClick={handlePrevious}>
                <a className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li onClick={handleNext}>
                <a className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
