import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "bg-service": "#FAFAFA",
        footer: "#F3F5F7",
        about: "#1D2939",
        "light-gray": "#F3F5F7",
      },
      height: {
        footer: "460px",
      },
      width: {
        "w-24": "24%",
        "w-38": "38%",
      },
      textColor: {
        "primary-color": "#FF6800",
        "text-gray": "#788596",
      },
    },
  },
  plugins: [],
};
export default config;
