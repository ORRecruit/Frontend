import client from "../axiox.config";

export const aiMatchingAllTalents = (id: any) => {
  return client.post<any, any>(
    `/applicants/calculate-matching-scores?jobId=${id}`
  );
};
