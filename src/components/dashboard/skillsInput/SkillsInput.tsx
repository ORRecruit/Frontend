import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { IoCloseSharp } from "react-icons/io5";
interface SkillsInputProps {
  onSkillsChange: (skills: string[]) => void;
  initialSkills: string[]; // Added to receive initial skills from the parent component
}

const SkillsInput: React.FC<SkillsInputProps> = ({
  onSkillsChange,
  initialSkills,
}) => {
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(initialSkills); // Initializes state with initialSkills

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentSkill.trim()) {
      event.preventDefault();
      const newSkills = [...skills, currentSkill.trim()];
      setSkills(newSkills);
      onSkillsChange(newSkills);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onSkillsChange(updatedSkills);
  };

  return (
    <div>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={currentSkill}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCurrentSkill(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
      />
      <div className="mt-2">
        {skills?.map((skill, index) => (
          <div
            key={index}
            className="inline-block bg-gray-200 text-gray-900 text-sm rounded px-6 py-2 mr-2 mb-2 relative"
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 text-red-500 hover:text-red-700 absolute top-[2px] right-[2px]"
            >
              <IoCloseSharp />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
