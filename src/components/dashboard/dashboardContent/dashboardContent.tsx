import Image from "next/image";
import React from "react";

interface overviewInterface {
  details: any[];
}

const dashboardContent: React.FC<overviewInterface> = ({ details }) => {
  return (
    <div className="fixed top-[60px] left-[272px] w-[-webkit-fill-available]">
      <div className="flex w-[99%] gap-4">
        {details.map((item: any, index: any) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-1"
          >
            <Image
              width={30}
              height={30}
              src={item.iconUrl}
              alt="icon"
              className="mb-4"
            />
            <a href="#">
              <p>{item.heading}</p>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.rating}
              </h5>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default dashboardContent;
