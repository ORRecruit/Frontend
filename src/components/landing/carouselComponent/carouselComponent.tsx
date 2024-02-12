"use client";
import React, { useState } from "react";
import Image from "next/image";

const carouselData = [
  {
    image: "/carousel-img.svg",
    text: `"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."`,
  },
  {
    image: "/carousel-img.svg",
    text: `"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."`,
  },
  {
    image: "/carousel-img.svg",
    text: `"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."`,
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
