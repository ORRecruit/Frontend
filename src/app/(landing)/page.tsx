import React from "react";
import Navbar from "../../components/landing/navbar/navbar";
import HeroSection from "../../components/landing/heroSection/heroSection";
import Service from "./../../components/landing/services/services";
import Footer from "../../components/landing/footer/footer";
import About from "../../components/landing/about/about";
import FAQs from "../../components/landing/faqs/faqs";
import Assessments from "../../components/landing/assessments/assessments";
import ContactUs from "./../../components/landing/contactUs/contactUs";
import Features from "@/components/landing/jobs/features";
import CompanyServices from "@/components/landing/companyServices/companyServices";
import Cookie from "@/components/landing/cookie/cookie";

const page = () => {
  const iconImages = [
    "/hero-icon1.svg",
    "/hero-icon2.svg",
    "/hero-icon3.svg",
    "/hero-icon4.svg",
    "/hero-icon5.svg",
  ];
  return (
    <div>
      <div className="flex justify-center bg-blue-300 h-12 text-center text-blue-950 text-sm items-center">
        Our website is under maintenance. Please check back later.
      </div>
      <Cookie />
      <Navbar />
      <HeroSection
        heading={"Revolutionize Your Hiring"}
        paragraph={`Elevate your hiring process with our AI-powered platform tailored for work. Connect seamlessly with top talent, streamline recruitment, and effortlessly build your dream team.`}
        videoImageSrc={`/demo-video.svg`}
        iconImages={iconImages}
        showIconImages="true"
      />
      <Service />
      <CompanyServices />
      <Assessments
        heading1={`Find Quality Talent Using AI Powered ATS`}
        paragraph1={`Utilize our AI-driven skill assessment tools to gain insights
                into your strengths and areas for growth. Our platform provides
                personalized suggestions for skill development, helping you stay
                competitive and ready for new challenges.`}
        img1={`/assessment-img.svg`}
        heading2={`Track Applications From a Single Dashboard`}
        paragraph2={`With our real-time application tracking system, you’ll always
                know the status of your job applications. Get instant updates
                and feedback, so you’re never left wondering where you stand.`}
        img2={`/tracher-img.svg`}
      />
      <Features />
      <div id="contactUs">
        <ContactUs />
      </div>
      <FAQs />
      <About height="473px" backgroundImage="" />
      <Footer />
    </div>
  );
};

export default page;
