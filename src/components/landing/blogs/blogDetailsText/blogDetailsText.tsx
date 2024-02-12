import React from "react";
import Image from "next/image";

const blogDetailsText = () => {
  return (
    <>
      <div className="w-11/12 mx-auto mb-4 2xl:mb-20 xl:w-4/5 2xl:w-4/6">
        <div>
          <h1 className="text-4xl font-bold mb-4">Header 1</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
            massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
            purus. Non massa enim vitae duis mattis. Vel in ultricies vel
            fringilla.
          </p>
          <div className="w-11/12 ml-8 py-4 my-12 border-l-4 border-x-fuchsia-800 pl-8">
            <p className="text-2xl font-semibold mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
              massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
              purus.
            </p>
            <p className="text-lg font-medium text-text-gray">
              — Zeeshan, CEO & Founder
            </p>
          </div>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
            massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
            purus. Non massa enim vitae duis mattis. Vel in ultricies vel
            fringilla.
          </p>
          <div className="w-full flex justify-center">
            <Image
              src="/blog-text-img.svg"
              width={2000}
              height={1000}
              alt="Picture of office"
            />
          </div>
        </div>
        <div className="my-8">
          <h1 className="text-4xl font-bold mb-4">Header 2</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet consectetur. Nisl diam malesuada congue
            adipiscing sit dictumst sed faucibus. Cursus a mi pharetra sem.
            Suscipit massa tincidunt sit magna in praesent. Integer eget mattis
            nibh egestas sed tellus et ultricies. Ipsum volutpat sagittis sapien
            vitae integer vel. Sit dignissim vitae diam laoreet velit odio.
            Ornare aliquet laoreet vitae natoque a volutpat vitae. Imperdiet non
            proin cursus auctor fames ac erat elementum curabitur. Bibendum duis
            odio turpis elementum justo turpis.
          </p>
          <p className="text-lg mb-4">
            Cras volutpat tempor vel mus diam condimentum. Feugiat tincidunt
            dignissim ac ut aenean. In posuere aliquet malesuada faucibus
            convallis senectus ullamcorper viverra. Risus rutrum vestibulum
            adipiscing nunc sed. Dignissim nisi mattis placerat odio nisl
            habitant. Volutpat fames ac sit tristique aliquam. Id eu diam morbi
            vel amet et scelerisque nibh. Lacus amet malesuada bibendum volutpat
            commodo viverra. A aliquet augue varius diam auctor augue. Viverra
            ac nibh vestibulum imperdiet a. In mauris lorem sed nunc
            pellentesque aliquet suspendisse. Dictum tellus proin felis quis at
            magna. Quam enim quis convallis est pharetra. Quisque leo auctor
            placerat amet aliquet. Risus in nec dignissim tempus sed est.
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Why is Data Streaming Important?
          </h1>
          <p className="text-lg mb-4">
            Data streaming allows data processing in real-time, allowing
            organizations to make fast data-driven and actionable decisions.
            This helps companies make predictions and take proactive measures to
            prevent issues before they occur.
          </p>
          <p className="text-lg mb-4">
            Data streaming has a lot of beneficial use cases. These include:
          </p>

          <ul className="space-y-1 list-disc list-inside">
            <li className="pl-5 relative py-2">
              Fraud detection: A bank or an e-commerce application needs to
              capture fraud and block a fraudulent transaction the moment it
              happens. It is quite irrelevant for a system to detect a
              fraudulent transaction three days after it happens.With data
              streaming, fraudulent or suspicious transactions are either
              blocked or flagged the moment they occur.
            </li>
            <li className="pl-5 relative py-2">
              Healthcare: With data streaming, you can monitor your patients in
              real time and also alert staff to any changes in their condition.
              Also, wearing devices such as smart watches can monitor your vital
              organs in real time and alert you if there is any change in
              condition.
            </li>
            <li className="pl-5 relative py-2">
              Logistics: With data streaming, users can monitor their goods and
              shipments in real time. This can also drive them to make informed
              decisions about the best routes to take, inventory management, and
              so on.This can help forecast accurate estimated time of arrival of
              goods and boost customer satisfaction.
            </li>
            <li className="pl-5 relative py-2">
              From these examples, you can see that the importance of data
              streaming in the modern era cannot be overemphasized. Data
              streaming is important in the health industry, finance industry,
              electronics industry, retail, construction, and logistics
              industry, amongst others.
            </li>
            <li className="pl-5 relative py-2">
              Since data streaming is paramount for organizations, it is very
              important for data engineers to make use of data streaming tools
              that ensure low latency and high throughput. In this article, you
              will learn how to stream data from Postgres to Snowflake using
              Estuary Flow.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default blogDetailsText;
