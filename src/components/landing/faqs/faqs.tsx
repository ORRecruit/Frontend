"use client";
import React, { useState } from "react";

const faqs = () => {
  const [ind, setInd] = useState(0);
  const array = [
    {
      question: "How ORR's different from others?",
      designation: "Web Developer at Google",
      answer:
        "Remote recruit is a company that uses AI to find talent and match with the right talent We understand the challenges of finding the right remote talent, which is why we've developed a sophisticated matching algorithm that connects recruiters with top-notch candidates effortlessly. Say goodbye to endless searching and let our AI technology streamline your recruitment process.",
    },
    {
      question: "What does ORR do?",
      designation: "CEO at Facebook",
      answer:
        "ORR is a dedicated platform that offers comprehensive services to companies aiming to source the finest resources, ensuring a perfect match for their firm's unique needs and fostering organizational growth with top-tier talent.",
    },
    {
      question: "What is ORR's mission?",
      designation: "CTO at Microsoft",
      answer:
        "ORR's mission is to empower businesses by connecting them with the optimal resources and talent, driving their success and innovation through strategic partnerships and unparalleled service excellence.",
    },
  ];
  return (
    <>
      <div className="w-full mx-auto py-28 mt-20">
        <div className="w-4/5 mx-auto 2xl:w-3/4">
          <div className="mb-12">
            <p className="text-3xl	font-bold mb-2">FAQs</p>
            <p className="w-4/5 xl:w-3/5 2xl:w-2/4 text-xl font-normal text-text-gray">
              We are dedicated to providing constant support to our clients.
              Here are some frequently asked questions to us
            </p>
          </div>
          <div className="sm:block lg:flex lg:justify-between lg:items-center">
            <div className="lg:w-w-38 2xl:w-3/12">
              {array.map((item: any, index: any) => (
                <div
                  className="pl-4 bg-light-gray py-2 my-2 rounded-lg 2xl:my-4 hover:cursor-pointer"
                  onClick={() => setInd(index)}
                >
                  <h3 className="text-base font-normal">{item.question}</h3>
                  <p className="text-text-gray">{item.designation}</p>
                </div>
              ))}
              <div className="flex items-center text-primary-color">
                <p className="mr-2">Contact our team to learn more</p>
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2 text-base font-medium"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </div>
            </div>
            <div className="lg:w-3/5">
              <h1 className="text-xl font-semibold mb-2">
                {array[ind].question}
              </h1>
              <div className="text-xl font-normal text-text-gray">
                {array[ind].answer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default faqs;
