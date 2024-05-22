import client from "../axiox.config";

export const updateTalent = (id: any, data: any) => {
  return client.patch<any, any>(`/candidates/updateCandidate/${id}`, data);
};
