import client from "../axiox.config";

export const aiJobMatching = (id: any) => {
  return client.get<any, any>(`/applicants/matching-scores?jobId=${id}`);
};
