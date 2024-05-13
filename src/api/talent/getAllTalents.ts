import client from "../axiox.config";

export const getAllTalents = (name: any) => {
  return client.get<any, any>(`/candidates/getAllCandidates?${name}`);
};
