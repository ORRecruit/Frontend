import client from "../axiox.config";

export const getAllClients = () => {
  return client.get<any, any>(`/clients/get-all-clients`);
};
