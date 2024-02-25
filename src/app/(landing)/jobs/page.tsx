import React from "react";
import Navbar from "../../../components/landing/navbar/navbar";
import HeroSection from "../../../components/landing/heroSection/heroSection";
import StatsComponent from "../../../components/landing/jobs/statsComponent/statsComponent";
import Assessments from "../../../components/landing/assessments/assessments";
import Footer from "../../../components/landing/footer/footer";
import About from "../../../components/landing/about/about";
import Features from "@/components/landing/jobs/features";
import ContactUs from "@/components/landing/contactUs/contactUs";

const page = () => {
  const iconImages = [
    "/hero-icon1.svg",
    "/hero-icon2.svg",
    "/hero-icon3.svg",
    "/hero-icon4.svg",
    "/hero-icon5.svg",
  ];
  return (
    <>
      <Navbar />
      <HeroSection
        heading={"Find your Dream Remote Job Today!"}
        paragraph={`Experience a guided process that helps you land a job that propels your career forward.`}
        videoImageSrc={`/tracher-img.svg`}
        iconImages={iconImages}
        showIconImages="false"
      />
        <Features />
      {/*<StatsComponent />*/}
      <Assessments
        heading1={`Find jobs that match your career tragetory`}
        paragraph1={`Utilize our AI-driven skill assessment tools to gain insights into your strengths and areas for growth. Our platform provides personalized suggestions for skill development, helping you stay competitive and ready for new challenges.`}
        img1={`/assessment-img.svg`}
        heading2={`Shortlist jobs using keywords and smart guides`}
        paragraph2={`With our real-time application tracking system, you’ll always know the status of your job applications. Get instant updates and feedback, so you’re never left wondering where you stand.`}
        img2={`/assessment-page-img2.svg`}
      />
        <ContactUs />
      <About height="473px" backgroundImage="" />
      <Footer />
    </>
  );
};

export default page;
