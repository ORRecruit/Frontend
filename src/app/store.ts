import create from "zustand";

interface Step1Data {
  firstName: string;
  lastName: string;
  country: string;
  industry: string;
  about: string;
}

interface Experience {
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorking: boolean;
}

interface Education {
  school: string;
  degree: string;
  startYear: string;
  endYear: string;
  description: string;
  currentlyStudying: boolean;
}

interface SocialMedia {
  website: string;
  linkedIn: string;
  github: string;
  twitter: string;
}

interface StepData {
  step1: Step1Data;
  step2: {
    skills: string[];
    tools: string[];
  };
  step3: Experience[];
  step4: Education[];
  step5: SocialMedia;
}

interface StoreState {
  stepData: StepData;
  setStepData: (step: keyof StepData, value: any) => void;
  resetData: () => void;
  submitData: () => Promise<void>;
}

const useStore = create<StoreState>((set, get) => ({
  stepData: {
    step1: {
      firstName: "",
      lastName: "",
      country: "United States",
      industry: "Tourism",
      about: "",
    },
    step2: {
      skills: [],
      tools: [],
    },
    step3: [
      {
        companyName: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      },
    ],
    step4: [
      {
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
        description: "",
        currentlyStudying: false,
      },
    ],
    step5: {
      website: "",
      linkedIn: "",
      github: "",
      twitter: "",
    },
  },
  setStepData: (step, value) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [step]: Array.isArray(state.stepData[step])
          ? value
          : { ...state.stepData[step], ...value },
      },
    })),
  resetData: () =>
    set({
      stepData: {
        step1: {
          firstName: "",
          lastName: "",
          country: "",
          industry: "",
          about: "",
        },
        step2: {
          skills: [],
          tools: [],
        },
        step3: [
          {
            companyName: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
            currentlyWorking: false,
          },
        ],
        step4: [
          {
            school: "",
            degree: "",
            startYear: "",
            endYear: "",
            description: "",
            currentlyStudying: false,
          },
        ],
        step5: {
          website: "",
          linkedIn: "",
          github: "",
          twitter: "",
        },
      },
    }),
  submitData: async () => {
    const state = get().stepData;
    const response = await fetch("/api/saveData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    if (response.ok) {
      set({
        stepData: {
          step1: {
            firstName: "",
            lastName: "",
            country: "",
            industry: "",
            about: "",
          },
          step2: {
            skills: [],
            tools: [],
          },
          step3: [
            {
              companyName: "",
              role: "",
              startDate: "",
              endDate: "",
              description: "",
              currentlyWorking: false,
            },
          ],
          step4: [
            {
              school: "",
              degree: "",
              startYear: "",
              endYear: "",
              description: "",
              currentlyStudying: false,
            },
          ],
          step5: {
            website: "",
            linkedIn: "",
            github: "",
            twitter: "",
          },
        },
      });
    }
  },
}));

export default useStore;
