"use client";
import React, { useState } from "react";
import Image from "next/image";

const carouselData = [
  {
    image: "/carousel-img.svg",
    text: `"ORR is an amazing concept, we cant wait for their launch and to use the product"`,
  },
  {
    image: "/carousel-img.svg",
    text: `"The ORR founders showed us their concept and we are hooked already!"`,
  },
  {
    image: "/carousel-img.svg",
    text: `"Our team is tired of old ATS solutions and we are looking for an new alternative"`,
  },
];

const carouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center space-y-4 lg:w-4/5 lg:mt-8 xl:mt-20 2xl:w-2/3">
      <button
        onClick={goToPrevious}
        className="absolute text-primary-color left-0 z-10 p-4 focus:outline-none"
      >
        <span className="text-2xl">&#x3c;</span>
      </button>
      <button
        onClick={goToNext}
        className="absolute text-primary-color right-0 z-10 p-4 focus:outline-none"
      >
        <span className="text-2xl">&#x3e;</span>
      </button>

      <div>
        <Image
          height={500}
          width={500}
          src={carouselData[activeIndex].image}
          alt="Carousel"
          className="w-full h-auto mb-8"
        />
      </div>
      <p className="text-center text-2xl font-semibold px-4 lg:w-3/5 2xl:w-2/4">
        {carouselData[activeIndex].text}
      </p>
      <div className="flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === activeIndex ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default carouselComponent;
