import client from "../axiox.config";

export const filterJobs = (text: string) => {
  return client.get<any, any>(`/jobs/search/${text}`);
};
