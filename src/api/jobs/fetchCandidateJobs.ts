import client from "../axiox.config";

export const fetchCandidateJobs = (candidateId: string) => {
  return client.get<any, any>(`/jobs/applied/${candidateId}`);
};
