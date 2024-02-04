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

const page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Service />
      <Assessments />
      <Jobs />
      <About />
      <ContactUs />
      <FAQs />
      <Footer />
    </div>
  );
};

export default page;
