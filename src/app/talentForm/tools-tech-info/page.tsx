"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";

const page = () => {
  const [skills, setSkills] = useState("Software Engineering");
  const [tools, setTools] = useState("Front end development");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);

  const handleSkillsChange = (newSkills: string[]) => {
    setSkillsRequired(newSkills);
  };

  const handleSkills = (e: any) => {
    e.preventDefault();
    setSkills(e.target.value);
  };

  const handleTools = (e: any) => {
    e.preventDefault();
    setTools(e.target.value);
  };

  const router = useRouter();
  const submitForm = (e: any) => {
    e.preventDefault();
    const candidateInfo = localStorage.getItem("candidateInfo");
    console.log(skills, tools);

    if (candidateInfo !== null) {
      const data = JSON.parse(candidateInfo);
      data.skills = [skills];
      data.tools = [tools];
      localStorage.setItem("candidateInfo", JSON.stringify(data));
      console.log("data", data);
    }
    router.push("/talentForm/experience-info");
  };
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-20 lg:py-16 lg:grid-cols-12">
          <div className="w-full p-6 mx-auto bg-white sm:max-w-xl lg:col-span-6 sm:p-8">
            <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tight text-gray-900 text-black font-sans">
              Skills & Technology
            </h1>
            <p className="text-sm lg:text-base font-light text-gray-500 dark:text-gray-300">
              Please add the skills and technologies you have worked on and
              mastered.
            </p>
            <form onSubmit={submitForm} className="mt-4" action="#">
              <div className="grid gap-6 sm:grid-cols-1">
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Skills
                  </label>
                  <div key={skillsRequired.length} className="mb-2 w-[100%]">
                    <SkillsInput
                      onSkillsChange={handleSkillsChange}
                      initialSkills={skillsRequired}
                    />
                  </div>
                </div>
                <div className="w-[100%]">
                  <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Tools & Technologies
                  </label>
                  <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handleTools}
                  >
                    <option value="Front end development">
                      Front end development
                    </option>
                    <option value="react js">react js</option>
                    <option value="Angular">Angular</option>
                    <option value="node js">node js</option>
                    <option value="docker">docker</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-orange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white mt-6"
              >
                Continue
              </button>
            </form>
          </div>
          <div className="mr-auto place-self-center lg:col-span-6">
            <Image
              width={400}
              height={400}
              className="hidden mx-auto lg:flex"
              src="/sign-up.svg"
              alt="illustration"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
