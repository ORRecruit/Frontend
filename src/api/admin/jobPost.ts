import client from "../axiox.config";

export const jobPost = (
  title: any,
  description: any,
  location: any,
  type: any,
  industry: any,
  skillsRequired: any,
  experienceRequired: any
) => {
  return client.post<any, any>("/jobs/createJobs", {
    title,
    description,
    location,
    type,
    industry,
    skillsRequired,
    experienceRequired,
  });
};
