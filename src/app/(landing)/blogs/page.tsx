import React from "react";
import Navbar from "../../../components/landing/navbar/navbar";
import Footer from "../../../components/landing/footer/footer";
import BlogGrid from "@/components/landing/blogs/BlogGrid/BlogGrid";
import BlogHeader from "@/components/landing/blogs/BlogHeader/BlogHeader";

const page = () => {
  const articles = [
    {
      image: "/blog-no1.png",
      title: "Cost-Effective Hiring Solutions",
      description:
        "Recruitment agencies offer cost-effective hiring solutions that enable companies to streamline their recruitment processes & make strategic hiring decisions.",
      author: "shan",
      date: "February 23, 2024",
    },
    {
      image: "/blog-no2.png",
      title: "Prioritize Recruitment Agency Partnerships",
      description:
        "Online Remote Recruiting offers tailored solutions and expertise to empower small businesses in their quest for top talent. Embrace the opportunity to transform your recruitment efforts.",
      author: "shan",
      date: "February 19, 2024",
    },
    {
      image: "/blog-no3.png",
      title: "Strategic Recruitment Partnerships",
      description:
        "By leveraging the expertise, resources, and network of a trusted recruitment partner like Online Remote Recruiting, businesses can gain a competitive edge, accelerate growth that drive innovation and success",
      author: "shan",
      date: "February 6, 2024",
    },
    {
      image: "/blog-no4.png",
      title: "Navigating Career Transitions",
      description:
        "Our team of experienced recruiters specializes in helping job seekers navigate career transitions, identify exciting opportunities, and achieve their professional goals.",
      author: "shan",
      date: "March 4, 2024",
    },
    {
      image: "/blog-no5.png",
      title: "Impact of AI on Recruitment",
      description:
        "Ready to revolutionize your recruitment processes with AI-driven solutions? Partner with us at Online Remote Recruiting to unlock the full potential of AI in talent acquisition.",
      author: "shan",
      date: "March 1, 2024",
    },
    {
      image: "/blog-no6.png",
      title: "Job Search 101",
      description:
        "Ready to take your job search to the next level? Partner with Online Remote Recruiting and gain access to exclusive job opportunities and strategic insights to accelerate your career growth",
      author: "shan",
      date: "February 9, 2024",
    },
  ];
  return (
    <>
      <Navbar />
      <BlogHeader />
      <BlogGrid articles={articles} />
      <Footer />
    </>
  );
};

export default page;
