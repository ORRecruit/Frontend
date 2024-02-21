import React from "react";
import Navbar from "../../../components/landing/navbar/navbar";
import HeroSection from "../../../components/landing/heroSection/heroSection";
import StatsComponent from "../../../components/landing/jobs/statsComponent/statsComponent";
import Assessments from "../../../components/landing/assessments/assessments";
import Footer from "../../../components/landing/footer/footer";
import About from "../../../components/landing/about/about";

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
        heading={"Match with top Canadian Firms"}
        paragraph={`Experience a guided process that helps you create a resume reflecting your true professional self.`}
        videoImageSrc={`/hero-section-img-job.svg`}
        iconImages={iconImages}
        showIconImages="false"
      />
      <StatsComponent />
      <Assessments
        heading1={`Hire Quality Talent using AI`}
        paragraph1={`Utilize our AI-driven skill assessment tools to gain insights into your strengths and areas for growth. Our platform provides personalized suggestions for skill development, helping you stay competitive and ready for new challenges.`}
        img1={`/assessment-page-img1.svg`}
        heading2={`Application Tracker`}
        paragraph2={`With our real-time application tracking system, you’ll always know the status of your job applications. Get instant updates and feedback, so you’re never left wondering where you stand.`}
        img2={`/assessment-page-img2.svg`}
      />
      <Assessments
        heading1={`Hire Quality Talent using AI`}
        paragraph1={`Join our community of like-minded professionals. Participate in discussions, share experiences, and gain insights from others who have navigated the job-seeking journey. At Online Remote Recruiting, you're not just finding a job; you're joining a community.`}
        img1={`/assessment-page-img3.svg`}
        heading2={`Smart Job Matching`}
        paragraph2={`No more endless scrolling through irrelevant job listings. Our AI analyzes your profile and preferences to bring you job opportunities that genuinely fit your skills and career aspirations. Realize your worth in a marketplace that values your unique capabilities.`}
        img2={`/assessment-page-img4.svg`}
      />
      <About height="473px" backgroundImage="" />
      <Footer />
    </>
  );
};

export default page;
