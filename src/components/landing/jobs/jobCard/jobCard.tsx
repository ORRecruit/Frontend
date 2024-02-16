import Image from "next/image";
import Link from "next/link";
import React from "react";

interface JobCardProps {
  paragraphText: string;
  title: string;
}
const page: React.FC<JobCardProps> = ({ paragraphText, title }) => {
  return (
    <div className="max-w-sm p-6 bg-transparent lg:w-1/2 xl:w-w-24 2xl:w-w-24">
      <Image
        width={30}
        height={30}
        className="mb-4"
        src="/dot-icon-job.svg"
        alt=""
      />
      <Link href="#">
        <h5 className="mb-2 text-xl font-semibold text-black font-sm 2xl:text-xl">
          {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-base">{paragraphText}</p>
    </div>
  );
};

export default page;
