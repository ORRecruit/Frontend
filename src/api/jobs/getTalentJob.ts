import client from "../axiox.config";

export const getCandidateJobs = (id: string) => {
  return client.post<any, any>("/jobs/candidate/appliedJobs/" + id);
};
