"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const BlogDetailsHeader = () => {
  const searchParams = useSearchParams();
  const blogNo = parseInt(searchParams.get("blogNo") || "1", 10);
  const blogDetails = [
    {
      id: 1,
      title: "Why Companies Are Turning to Recruitment Agencies",
      description:
        "Online Remote Recruiting offer a solution to all challenges by providing access to a vast network of qualified expertise in sourcing recruitment processes.",
      date: "February 23, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 2,
      title:
        "Why Small Businesses Should Prioritize Recruitment Agency Partnerships",
      description:
        "Online Remote Recruiting offers tailored solutions and expertise to empower small businesses in their quest for top talent.",
      date: "February 19, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 3,
      title:
        "Strategic Recruitment Partnerships: A Game-Changer for Growing Businesses",
      description:
        "Strategic recruitment partnerships involve forming collaborative relationships with external agencies or firms specializing in talent acquisition.",
      date: "February 6, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 4,
      title: "Navigating Career Transitions: A Guide for Job Seekers",
      description:
        "Job seekers often grapple with fear & uncertainty during career transitions. Essential to acknowledge emotions & develop coping strategies to navigate them effectively.",
      date: "March 4, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 5,
      title:
        "The Impact of AI on Recruitment: Navigating Employer Pain Points and Solutions",
      description:
        "AI-driven recruitment platforms offer cost-effective solutions by automating repetitive tasks and reducing reliance on expensive external agencies.",
      date: "March 1, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 6,
      title: "Job Search 101: Essential Tips for Landing Your Dream Job",
      description:
        "Ensure your LinkedIn profile is complete, up-to-date, and showcases your professional achievements and experiences.",
      date: "February 9, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 7,
      title: "Building a Personal Brand: Tips for Job Seekers",
      description:
        "At Online Remote Recruiting, we understand the importance of personal branding in the job search process.",
      date: "March 16, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 8,
      title:
        "Streamlining Success: Why Partnering Ensures Efficient Onboarding",
      description:
        "As businesses continue to evolve, the strategic alignment of talent acquisition & onboarding remains cornerstone of sustainable growth..",
      date: "March 7, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 9,
      title: "The Benefits of Partnering with Recruitment Experts",
      description:
        "From specialized expertise and cost efficiency to scalability and long-term support, the advantages are clear.",
      date: "March 13, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 10,
      title: "How to Showcase Your Company Culture to Attract Top Talent",
      description:
        "Attracting and retaining top talent is imperative for success of organization in today's fiercely competitive job market.",
      date: "March 23, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 11,
      title:
        "Strategies for Successful Salary Negotiations: Securing the Compensation You Deserve",
      description:
        "Negotiating salary can be a daunting task for many job seekers, but it's a crucial step in securing compensation & advancing in your career.",
      date: "March 21, 2024",
      author: "Online Remote Recruiting",
    },
    {
      id: 12,
      title: "Enhancing Efficiency: The Power of Recruitment Agencies for SMEs",
      description:
        "To maximize the effectiveness of the partnership between SMEs and recruitment agencies, clear and open communication is paramount.",
      date: "April 13, 2024",
      author: "Online Remote Recruiting",
    },
  ];

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="bg-white text-black">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
            <div className="grid gap-8 items-center mb-8 lg:mb-24 lg:gap-12 lg:grid-cols-12">
              <div className="col-span-6 text-center sm:mb-6 lg:text-left lg:mb-0">
                <h1 className="text-black mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl">
                  {blogDetails[blogNo - 1].title}
                </h1>
                <p className="mx-auto mb-6 max-w-xl font-light text-gray-500 lg:mx-0 xl:mb-8 md:text-lg xl:text-xl dark:text-gray-400">
                  {blogDetails[blogNo - 1].description}
                </p>
                <p className="text-xs text-text-gray pb-8">
                  {blogDetails[blogNo - 1].date}
                </p>
                <p className="text-base text-text-purple">
                  {blogDetails[blogNo - 1].author}
                </p>
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
