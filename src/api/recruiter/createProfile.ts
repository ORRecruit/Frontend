import client from "../axiox.config";

export const createProfile = (data: any) => {
  return client.post<any, any>("/clients/create-client", data);
};
