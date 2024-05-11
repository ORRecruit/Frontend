import client from "../axiox.config";

export const getAllTalents = () => {
  return client.get<any, any>(`/candidates/all`);
};
