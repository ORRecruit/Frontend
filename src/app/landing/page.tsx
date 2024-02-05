import React from "react";
import Navbar from "./../../components/landing/navbar/page";
import HeroSection from "./../../components/landing/heroSection/page";
import Service from "./../../components/landing/services/page";
import Footer from "./../../components/landing/footer/page";
import About from "./../../components/landing/about/page";
import Jobs from "./../../components/landing/jobs/page";
import FAQs from "./../../components/landing/faqs/page";
import Assessments from "./../../components/landing/assessments/page";
import ContactUs from "./../../components/landing/contactUs/contactUs";
import CarouselComponent from "../../components/landing/carouselComponent/page";

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
      <Navbar />
      <HeroSection
        heading={"Revolutionize Your Remote Hiring"}
        paragraph={`Empower your business with our AI-driven platform, specifically
              designed for the dynamic world of remote work. Connect with
              exceptional talent, streamline your recruitment process, and build
              a successful remote team effortlessly.`}
        videoImageSrc={`/demo-video.svg`}
        iconImages={iconImages}
        showIconImages="true"
      />
      <Service />
      <Assessments
        heading1={`Dynamic Skill Assessment`}
        paragraph1={`Utilize our AI-driven skill assessment tools to gain insights
                into your strengths and areas for growth. Our platform provides
                personalized suggestions for skill development, helping you stay
                competitive and ready for new challenges.`}
        img1={`/assessment-img.svg`}
        heading2={`Application Tracker`}
        paragraph2={`With our real-time application tracking system, you’ll always
                know the status of your job applications. Get instant updates
                and feedback, so you’re never left wondering where you stand.`}
        img2={`/tracher-img.svg`}
      />
      <Jobs />
      <CarouselComponent />
      <ContactUs />
      <FAQs />
      <About height="473px" backgroundImage="" />
      <Footer />
    </div>
  );
};

export default page;
