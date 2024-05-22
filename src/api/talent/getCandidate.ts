import client from "../axiox.config";

export const getCandidate = (id: any) => {
  return client.get<any, any>(`/candidates/getCandidate/${id}`);
};
