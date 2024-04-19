import React from "react";

const specialization = () => {
  const array = ["Technology", "Tourism", "Hospitality"];
  return (
    <div>
      <section className="my-8">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:pb-16 lg:px-6">
          <div className="mb-8 lg:mb-4 w-[100%]">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center">
              Our &nbsp; Specializations
            </h2>
            <div className="text-gray-500 sm:text-xl dark:text-gray-400 flex justify-center items-center">
              <p className="lg:w-[75%] text-gray-500 sm:text-xl dark:text-gray-400 text-center lg:my-[20px]">
                Online Remote Recruiting stands at the forefront of innovation,
                serving as a conduit between top-tier talent & leading companies
                in different sectors. We expertly navigate dynamic industries to
                connect you with opportunities that propel your career or
                business to new heights.
              </p>
            </div>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 lg:w-[50%] lg:mx-auto">
            {array?.map((item: any, index: any) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col"
              >
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900 text-orange">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white text-orange"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold mb-[10px]">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default specialization;
