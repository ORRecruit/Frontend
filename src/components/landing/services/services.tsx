import React from "react";
import ServiceCard from "./service-card/serviceCard";

const Services = () => {
  const paragraphs: string[] = [
    "" +
      "We've developed a sophisticated matching algorithm that connects recruiters with top-notch candidates in real time using AI",
    "Our platform is rigorously monitored to prevent spam and abuse, ensuring a positive and trustworthy experience for recruiters and candidates alike.",
    "Designed with simplicity and efficiency in mind, our dashboard provides recruiters with the tools they need to  hire talent quickly",
    "Our platform offers seamless onboarding, allowing you to customize and setup onboarding for candidates with just a few clicks at scale",
  ];
  const titles: string[] = [
    "AI Powered Matching",
    "Available Talent Pool",
    "Smart Dashboards",
    "Custom Onboarding",
  ];
  const icons: string[] = [
    "/service-icon1.svg",
    "/service-icon2.svg",
    "/service-icon3.svg",
    "/service-icon4.svg",
  ];
  return (
    <>
      <div className="w-[100%] mx-auto bg-bg-service py-28">
        <div className="w-4/5 mx-auto 2xl:w-9/12	">
          <div className="mb-12">
            <p className="text-3xl	font-bold mb-2 text-center">Why Us</p>
            <div className="text-xl font-normal text-center lg:w-[100%] flex justify-center items-center lg:my-[20px]">
              <p className="lg:w-[100%] text-center text-gray-500 sm:text-xl dark:text-gray-400 lg:my-4">
                Online Remote Recruiting eliminates the traditional matchmaking
                and is a gateway to modern AI-Enhanced Matching.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
            {paragraphs.map((paragraph, index) => (
              <ServiceCard
                key={index}
                paragraphText={paragraph}
                title={titles[index]}
                iconUrl={icons[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
