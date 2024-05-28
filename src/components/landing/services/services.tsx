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
  const modalTitles: string[] = [
    "Revolutionize your recruitment with our cutting-edge AI matching technology.",
    "Trustworthy Connections: A Secure Talent Pool for All",
    "Effortless Hiring: Smart Dashboards for Streamlined Recruitment",
    "Custom Onboarding: A Seamless Start for New Hires",
  ];
  const modalParas: string[] = [
    "Our intelligent algorithm goes beyond traditional keyword searches. It analyzes a vast pool of talent, meticulously comparing candidate skills and experience with your specific job requirements.  This real-time matching ensures you connect with the most qualified individuals, streamlining your recruitment process and saving you valuable time.",
    "Finding the right talent shouldn't be a gamble. At ORR, we understand the importance of a reliable and secure recruitment experience. That's why we've built a robust talent pool meticulously monitored to prevent spam and abuse.",
    "Imagine a recruitment process that's intuitive, organized, and saves you precious time. That's the power of our Smart Dashboards. Designed with recruiters in mind, our user-friendly dashboards provide all the tools you need for efficient hiring, right at your fingertips.",
    "Our platform offers a streamlined and efficient way to set up and manage onboarding programs for new hires. With just a few clicks, you can tailor the onboarding process to fit the specific needs of each role and department.",
  ];
  const modalSubHeadings: string[] = [
    "Here's what sets our AI Matching apart:",
    "Here's what sets our talent pool apart:",
    "Here's how our Smart Dashboards empower you:",
    "Here's what you can achieve with our Custom Onboarding:",
  ];
  const modalListHeadings: any[] = [
    [
      "No More Keyword Games:",
      "Unmatched Candidate Fit:",
      "Faster Results:",
      "Effortless Workflow:",
    ],
    [
      "Rigorous Screening:",
      "Spam-Free Environment:",
      "Peace of Mind for Recruiters:",
      "Authenticity for Candidates:",
    ],
    [
      "Simple Interface:",
      "Real-Time Tracking: ",
      "Data-Driven Decisions: ",
      "Streamlined Communication: ",
    ],
    [
      "Reduced Time to Productivity: ",
      "Improved Engagement: ",
      "Scalability and Flexibility: ",
      "Compliance Management",
    ],
  ];
  const modalListParas: any[] = [
    [
      "We understand the complexities of your job descriptions, not just keywords.",
      "Identify top-tier talent with pinpoint accuracy based on true skill and experience.",
      "Fill open positions quicker with real-time candidate connections.",
      "Focus on interviewing the best, not sorting through endless resumes.",
    ],
    [
      "We actively monitor our platform to ensure the quality and legitimacy of candidates.",
      "Focus on real connections, not wasting time with irrelevant profiles.",
      "Recruit with confidence knowing you're connecting with genuine candidates.",
      "Showcase your skills and experience to credible recruiters.",
    ],
    [
      "Quickly access all your recruitment needs in one centralized location.",
      "Monitor candidate applications, interview stages, and hiring progress with ease.",
      "Leverage insightful metrics to make informed hiring choices.",
      "Collaborate effectively with hiring managers and candidates.",
    ],
    [
      "Get new hires up and running faster with a structured onboarding plan.",
      "Create a positive first impression and boost new hire engagement.",
      "Easily adapt onboarding programs to different roles and departments.",
      "Ensure all new hires complete mandatory training and paperwork.",
    ],
  ];
  const modalConclusion: string[] = [
    "Experience the future of recruitment. Let AI become your secret weapon in finding the perfect fit.",
    "We foster a trusted space where both recruiters and candidates can build meaningful connections and achieve their goals.",
    "Experience the difference with Smart Dashboards. One single stop shop for all your recruiting needs.",
    "Invest in your new hires' success from day one. Our Custom Onboarding platform is the perfect solution.",
  ];

  return (
    <>
      <div className="w-[100%] mx-auto bg-bg-service py-28">
        <div className="w-4/5 mx-auto 2xl:w-9/12 md:w-[90%] lg:w-4/5">
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
            {paragraphs?.map((paragraph, index) => (
              <ServiceCard
                key={index}
                paragraphText={paragraph}
                title={titles[index]}
                iconUrl={icons[index]}
                modalTitle={modalTitles[index]}
                modalParas={modalParas[index]}
                modalSubHeadings={modalSubHeadings[index]}
                modalListHeadings={modalListHeadings[index]}
                modalListParas={modalListParas[index]}
                modalConclusion={modalConclusion[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
