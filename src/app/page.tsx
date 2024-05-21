"use client";
import React, { useEffect, useRef } from "react";
import Navbar from "@/components/landing/navbar/navbar";
import HeroSection from "@/components/landing/heroSection/heroSection";
import Service from "@/components/landing/services/services";
import Footer from "@/components/landing/footer/footer";
import About from "@/components/landing/about/about";
import FAQs from "@/components/landing/faqs/faqs";
import Assessments from "@/components/landing/assessments/assessments";
import ContactUs from "@/components/landing/contactUs/contactUs";
import Features from "@/components/landing/jobs/features";
import CompanyServices from "@/components/landing/companyServices/companyServices";
import Cookie from "@/components/landing/cookie/cookie";
import ORRTeam from "@/components/landing/orrTeam/orrTeam";
import Specialization from "@/components/landing/specialization/specialization";

const page = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const iconImages = [
    "/hero-icon1.svg",
    "/hero-icon2.svg",
    "/hero-icon3.svg",
    "/hero-icon4.svg",
    "/hero-icon5.svg",
  ];

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* <div className="flex justify-center bg-blue-300 h-12 text-center text-blue-950 text-sm items-center">
        Our website is under maintenance. Please check back later.
      </div> */}
      <Cookie />
      <HeroSection
        heading={"Revolutionize Your Hiring"}
        paragraph={`Elevate your hiring process with our AI-powered platform tailored for work. Connect seamlessly with top talent, streamline recruitment, and effortlessly build your dream team.`}
        videoImageSrc={`/demo-video.svg`}
        iconImages={iconImages}
        showIconImages="true"
        href={"/auth/signin"}
      />
      <Service />
      <CompanyServices />
      <Assessments
        heading1={`AI powered ATS for Recruiters hunting quality talent`}
        paragraph1={`Utilize our AI-driven skill assessment tools to gain insights
                into your strengths and areas for growth. Our platform provides
                personalized suggestions for skill development, helping you stay
                competitive and ready for new challenges.`}
        img1={`/assessment-img.svg`}
        href1={`/talent`}
        buttonText1={`Discover Talent`}
        heading2={`Smart Job Recommendations for Candidates`}
        paragraph2={`With our real-time application tracking system, you’ll always
                know the status of your job applications. Get instant updates
                and feedback, so you’re never left wondering where you stand.`}
        img2={`/tracher-img.svg`}
        buttonText2={`Find Jobs`}
        href2={`/job-board`}
      />
      <Features />
      <Specialization />
      <div ref={myRef} id="contactUs">
        <ContactUs />
      </div>
      <FAQs />
      <ORRTeam />
      <About height="473px" backgroundImage="" />
      <Footer />
    </div>
  );
};

export default page;
