'use client';

import React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react'

const BlogDetailsHeader = () => {
  const searchParams = useSearchParams();
  const blogNo = searchParams.get('blogNo') || '1';

  return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
        <section className="bg-white text-black">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
              <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                <h1 className="text-black mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                  We invest in the world&apos;s potential {blogNo}
                </h1>
                <p className="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                  Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                </p>
                <p className="text-xs text-text-gray pb-8">February 17, 2009</p>
                <p className="text-base text-text-purple">‘Jeffrey Richman’</p>
              </div>
              <div className="col-span-6 shadow-2xl rounded-xl overflow-hidden">
                <Image
                    src={`/blog-no${blogNo}.png`}
                    width={600}
                    height={600}
                    alt="Picture of the author"
                />
              </div>
            </div>
          </div>
        </section>
        </Suspense>
      </>
  );
};

export default BlogDetailsHeader;
