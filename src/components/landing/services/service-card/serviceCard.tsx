import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ServiceCardProps {
  paragraphText: string;
  title: string;
  iconUrl: string;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  paragraphText,
  title,
  iconUrl,
}) => {
  return (
    <div className="max-w-sm p-6 rounded-lg shadow lg:w-[50%] xl:w-[23%]	2xl:w-[22%]">
      <Image width={50} height={50} className="mb-4" src={iconUrl} alt="" />
      <Link href="#">
        <h5 className="mb-2 text-2xl font-semibold text-black font-sm lg:my-[20px]">
          {title}
        </h5>
      </Link>
      <p className="mb-3 font-normal text-base text-justify">{paragraphText}</p>
    </div>
  );
};

export default ServiceCard;
