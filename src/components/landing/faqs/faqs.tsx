"use client";
import React, { useState } from "react";

const faqs = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index: any) => {
    if (openAccordion === index) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(index);
    }
  };
  const array = [
    {
      question: "How Online Remote Recruiting's different from others?",
      answer:
        "Online Remote Recruiting is job recruiting platform that uses AI to find talent and match with the right talent We understand the challenges of finding the right talent, which is why we've developed a sophisticated matching algorithm that connects recruiters with top-notch candidates effortlessly. Say goodbye to endless searching and let our AI technology streamline your recruitment process.",
    },
    {
      question: "What does Online Remote Recruiting do?",
      answer:
        "Online Remote Recruiting is a dedicated platform that offers comprehensive services to companies aiming to source the finest resources, ensuring a perfect match for their firm's unique needs and fostering organizational growth with top-tier talent.",
    },
    {
      question: "What is Online Remote Recruiting's mission?",
      answer:
        "Online Remote Recruiting's mission is to empower businesses by connecting them with the optimal resources and talent, driving their success and innovation through strategic partnerships and unparalleled service excellence.",
    },
    {
      question:
        "How Online Remote Recruiting promise in transforming life for its clients?",
      answer:
        "Online Remote Recruiting is your trusted partner for all your recruitment needs. Whether you're a startup looking to expand your team or an established enterprise seeking top talent, we are here to help you build a brighter future with the right people. Let's embark on this journey together and make your recruitment experience seamless and successful. Reach out to us today, and let's start finding your next great hire!",
    },
    {
      question: "What is Online Remote Recruiting's pricing structure?",
      answer:
        "Like our simple and innovative services, our pricing is straightforward. We charge fixed fees based on the seniority of the position you're filling. This means all our premium services are included, so there are no confusing percentage calculations or separate costs to worry about. Our tiers are: Basic placements: $5,000 Mid-Management: $10,000 Upper Management: $15,000 These fixed prices cover everything you need for a successful recruitment experience.",
    },
  ];
  return (
    <>
      <section className="bg-white dark:bg-gray-900 lg:my-8">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <h2 className="mb-6 lg:mb-16 text-3xl lg:text-5xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-screen-md">
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              {array?.map((item, index) => (
                <div key={index}>
                  <h2 id={`accordion-flush-heading-${index}`}>
                    <button
                      type="button"
                      className="flex justify-between items-center lg:text-lg py-5 w-full font-medium text-left"
                      aria-expanded={openAccordion === index}
                      aria-controls={`accordion-flush-body-${index}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span>{item.question}</span>
                      <svg
                        data-accordion-icon=""
                        className={`w-6 h-6 ${
                          openAccordion === index ? "rotate-180" : ""
                        } shrink-0`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-flush-body-${index}`}
                    className={`${openAccordion === index ? "" : "hidden"}`}
                    aria-labelledby={`accordion-flush-heading-${index}`}
                  >
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-2 text-gray-500 dark:text-gray-400 lg:text-lg text-justify">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default faqs;
