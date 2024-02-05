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
      <Assessments />
      <Jobs />
      <CarouselComponent />
      <ContactUs />
      <FAQs />
      <About />
      <Footer />
    </div>
  );
};

export default page;
