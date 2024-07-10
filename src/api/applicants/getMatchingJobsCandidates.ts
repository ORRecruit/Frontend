import client from "../axiox.config";

export const getMatchingJobsCandidate = (candidateId: any) => {
  return client.post<any, any>(
    `applicants/calculate-candidate-matching-scores?candidateId=${candidateId}`
  );
};
