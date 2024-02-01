import React from "react";

export const page = () => {
  return (
    <div className="bg-footer h-footer w-full">
      <div className="w-4/5 mx-auto h-full flex flex-col justify-center items-center xl:w-4/6">
        <img className="my-3 w-16 h-16" src="/ORR-logo.svg" alt="" />
        <p className="text-center my-3 text-xl	font-normal text-gray-400">
          4k+ Recruiters with 50k+ Talented individuals. ORR thrives on its on
          point AI based precise recruitment process. It’s tailored to modern Ai
          needs.{" "}
        </p>
        <div className="w-1/2 flex justify-between my-3 text-base	font-normal">
          <a href="#">Jobs</a>
          <a href="#">Recruiters</a>
          <a href="#">Talent</a>
          <a href="#">Blog</a>
          <a href="#">About</a>
          <a href="#">How It Works</a>
        </div>
        <p className="my-3 text-gray-400">
          © 2022 ORR, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default page;
