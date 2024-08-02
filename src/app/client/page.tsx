"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import HeroSection from "@/components/landing/heroSection/heroSection";
import Assessments from "@/components/landing/assessments/assessments";
import Footer from "@/components/landing/footer/footer";
import About from "@/components/landing/about/about";
import StatsComponent from "@/components/landing/jobs/statsComponent/statsComponent";

const page = () => {
  const iconImages = [
    "/hero-icon1.svg",
    "/hero-icon2.svg",
    "/hero-icon3.svg",
    "/hero-icon4.svg",
    "/hero-icon5.svg",
  ];

  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HeroSection
        heading={"Make Your Next Hire Your Best Hire"}
        paragraph={`Create job listings that our AI system comprehensively analyzes, ensuring they reach the most suitable candidates. `}
        videoImageSrc={`/hero-section-img-job.svg`}
        iconImages={iconImages}
        showIconImages="false"
        href={"/auth/signup"}
      />
      <StatsComponent />
      <Assessments
        heading1={`Smart Candidate Matching`}
        paragraph1={`Our advanced AI algorithms sift through countless profiles to find candidates who not only match the job requirements but also align with your company culture and values. Experience a new level of efficiency in finding the perfect match for your team.`}
        img1={`/assessment-page-img1.svg`}
        buttonText1={`Find Your Match`}
        href1={`/auth/signup`}
        heading2={`Resume and Skill Analysis`}
        paragraph2={`Go beyond the resume with our AI-driven analysis. Understand candidate strengths, potential, and how they align with the role and your organization. Make informed decisions based on comprehensive data.`}
        img2={`/assessment-page-img2.svg`}
        buttonText2={`Analyze Potential`}
        href2={`/auth/signup`}
      />
      <Assessments
        heading1={`Candidate Engagement Tools`}
        paragraph1={` Utilize our communication tools to reach out to potential candidates, schedule interviews, and manage responses. Our platform ensures you stay connected with top talent throughout the recruitment process.`}
        img1={`/assessment-page-img3.svg`}
        buttonText1={`Engage Talent`}
        href1={`/auth/signup`}
        heading2={`Analytics and Reporting`}
        paragraph2={`Access detailed analytics and reports to understand the effectiveness of your job postings and recruitment strategies. Use these insights to refine your approach and continually improve your talent acquisition process.`}
        img2={`/assessment-page-img4.svg`}
        buttonText2={`Optimize Recruitment`}
        href2={`/auth/signup`}
      />
      <About height="473px" backgroundImage="" />
      <Footer />
    </>
  );
};

export default page;
