// page.tsx
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SkillsInput from "@/components/dashboard/skillsInput/SkillsInput";
import { FiArrowLeft } from "react-icons/fi";
import useStore from "@/app/store";

const Page = () => {
  const { skills, tools } = useStore((state) => state.stepData.step2);
  const setStepData = useStore((state) => state.setStepData);
  const [skillsRequired, setSkillsRequired] = useState<string[]>(skills);
  const [techRequired, setTechRequired] = useState<string[]>(tools);

  useEffect(() => {
    setStepData("step2", { skills: skillsRequired, tools: techRequired });
  }, [skillsRequired, techRequired, setStepData]);

  const handleSkillsChange = (newSkills: string[]) => {
    setSkillsRequired(newSkills);
  };
  const handleTechChange = (newTechs: string[]) => {
    setTechRequired(newTechs);
  };

  const router = useRouter();
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/talentForm/experience-info");
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center">
        <button
          className="absolute top-10 left-10 flex items-center mb-4 text-[#FF6800]"
          onClick={() => router.back()}
        >
          <FiArrowLeft className="mr-2" size={24} color="#FF6800" />
          Back
        </button>
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
                  <div key={techRequired.length} className="mb-2 w-[100%]">
                    <SkillsInput
                      onSkillsChange={handleTechChange}
                      initialSkills={techRequired}
                    />
                  </div>
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

export default Page;
