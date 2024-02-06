"use client";
import React, { useState } from "react";

const articlesPerPage = 12;
const totalArticles = 36;

interface blogGridInterface {
  articles: any;
}

const BlogGrid: React.FC<blogGridInterface> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = articles.slice(firstArticleIndex, lastArticleIndex);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {Array.from({ length: 12 }).map((item: any, index: any) => (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg w-full"
                    src="/blog-grid-img.svg"
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <p className="text-xs mb-2 text-purple-artist rounded-lg w-max px-4 bg-light-gray">
                    Artist
                  </p>
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      Our first office
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Over the past year, Volosoft has undergone many changes!
                    After months of preparation and some hard work, we moved to
                    our new office.
                  </p>
                  <div className="flex items-center mb-8">
                    <div className="mr-4">
                      <img src="/avatar-each-blog.svg" alt="" />
                    </div>
                    <div>
                      <p className="text-sm">Bonnie Green</p>
                      <p className="text-sm	text-text-gray">
                        Aug 15, 2021 · 16 min read
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
