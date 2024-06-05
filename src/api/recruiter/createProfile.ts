import client from "../axiox.config";

export const createClient = (data: any) => {
  return client.post<any, any>("/clients/create-client", data);
};
