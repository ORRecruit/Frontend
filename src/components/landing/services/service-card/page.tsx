import React from "react";

interface ServiceCardProps {
  paragraphText: string;
  title: string;
  iconUrl: string;
}
const page: React.FC<ServiceCardProps> = ({
  paragraphText,
  title,
  iconUrl,
}) => {
  return (
    <div className="max-w-sm p-6 rounded-lg shadow lg:w-1/2 xl:w-1/5	">
      <img className="mb-4" src={iconUrl} alt="" />
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold text-black font-sm">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-base">{paragraphText}</p>
    </div>
  );
};

export default page;
