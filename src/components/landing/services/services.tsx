import React from "react";
import ServiceCard from "./service-card/serviceCard";

const Services = () => {
  const paragraphs: string[] = [
    "" +
      "We've developed a sophisticated matching algorithm that connects recruiters with top-notch candidates in real time using AI",
    "Our platform is rigorously monitored to prevent spam and abuse, ensuring a positive and trustworthy experience for recruiters and candidates alike.",
    "Designed with simplicity and efficiency in mind, our dashboard provides recruiters with the tools they need to  hire remote talent quickly",
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
      <div className="w-[95%] mx-auto bg-bg-service py-28 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-9/12	">
          <div className="mb-12">
            <p className="text-3xl	font-bold mb-2">Why Us</p>
            <p className="w-4/5	text-xl font-normal">
              ORR eliminates the traditional matchmaking and is a gateway to
              modern AI-Enhanced Remote Matching.
            </p>
          </div>
          <div className="flex flex-wrap	justify-between">
            {paragraphs.map((paragraph, index) => (
              <ServiceCard
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
