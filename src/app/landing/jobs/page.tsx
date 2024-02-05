import React from "react";
import Navbar from "../../../components/landing/navbar/page";
import HeroSection from "../../../components/landing/heroSection/page";
import StatsComponent from "./statsComponent/statsComponent";

const page = () => {
  return (
    <>
      <Navbar />
      <HeroSection
        heading={"Craft Your Professional Story"}
        paragraph={`Experience a guided process that helps you create a resume reflecting your true professional self.`}
        videoImageSrc={`/hero-section-img-job.svg`}
        iconImages={[]}
        showIconImages="false"
      />
      <StatsComponent />
    </>
  );
};

export default page;
