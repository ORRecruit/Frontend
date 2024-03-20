// components/BlogHeader.tsx
import React from "react";
import Image from "next/image";

const BlogHeader = () => {
  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-6xl font-bold mb-4">Blogs</h1>
      <p className="text-xl text-text-gray text-center mb-6 max-w-prose">
        Here at Online Remote Recruiting we focus on markets where technology,
        innovation, and capital can unlock long-term value and drive economic
        growth.
      </p>
      <div className="flex border text-center border-gray-300 rounded overflow-hidden">
        <Image
          width={40}
          height={40}
          className="pl-4"
          src="/search-icon.svg"
          alt=""
        />
        <input
          type="text"
          placeholder="Search Blogs"
          className="px-4 py-2 w-80 outline-none"
        />
      </div>
    </div>
  );
};

export default BlogHeader;
