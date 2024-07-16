import client from "../axiox.config";

export const getAllUsers = () => {
  return client.get<any, any>(`/statistics/all-users`);
};
