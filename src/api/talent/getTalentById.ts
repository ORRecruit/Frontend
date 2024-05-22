import client from "../axiox.config";

export const getTalentById = (id: any) => {
  return client.get<any, any>(`/candidates/getCandidate/${id}`);
};
