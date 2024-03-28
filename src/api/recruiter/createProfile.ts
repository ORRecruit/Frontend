import client from "../axiox.config";

export const createProfile = (name: any, location: any, industry: any) => {
  return client.post<any, any>("/recruiter/createProfile", {
    name,
    location,
    industry,
  });
};
