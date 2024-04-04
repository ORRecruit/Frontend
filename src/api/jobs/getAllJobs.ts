import client from "../axiox.config";

export const getAllJobs = () => {
  return client.get<any, any>("/jobs/getAlljobs");
};
