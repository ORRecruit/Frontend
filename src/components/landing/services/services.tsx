import React from "react";
import ServiceCard from "./service-card/serviceCard";

const Services = () => {
  const paragraphs: string[] = [
    "We keep Flowbite, secure, and free of spam and abuse so that this can be the platform where developers come together to create.",
    "Our Flowbite Security Lab is a world-class security R&D team. We inspire and enable the community to secure open source.",
    "We embody the shift toward investments in safe and secure software design practices with our world-class front-end products.",
    "It's easy to customize and style Flowbite. Tweak the look and feel of your UI with CSS/Less, and add major features with HTML.",
  ];
  const titles: string[] = [
    "AI Remote Matching",
    "Finding Criteria",
    "Recruiters Dashboard",
    "Onboarding",
  ];
  const icons: string[] = [
    "/service-icon1.svg",
    "/service-icon2.svg",
    "/service-icon3.svg",
    "/service-icon4.svg",
  ];
  return (
    <>
      <div className="w-full mx-auto bg-bg-service py-28 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-9/12	">
          <div className="mb-12">
            <p className="text-3xl	font-bold mb-2">Services</p>
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
