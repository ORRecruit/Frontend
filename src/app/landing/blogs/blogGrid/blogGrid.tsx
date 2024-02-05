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
    <div className="w-10/12	mx-auto">
      <div className="grid grid-cols-3 gap-4 mr">
        {currentArticles.map((article: any, index: any) => (
          <div key={index} className="border rounded-lg p-4">
            <img
              src={article.image}
              alt="Article"
              className="w-full h-40 object-cover rounded"
            />
            <h5 className="text-lg font-bold mt-2">{article.title}</h5>
            <p className="text-gray-600 mt-1">{article.description}</p>
            <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
              <p>{article.author}</p>
              <p>{article.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="border px-4 py-2 mx-1 rounded-lg"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`border px-4 py-2 mx-1 rounded-lg ${
              currentPage === number ? "bg-gray-200" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          className="border px-4 py-2 mx-1 rounded-lg"
          disabled={currentPage === Math.ceil(totalArticles / articlesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogGrid;
