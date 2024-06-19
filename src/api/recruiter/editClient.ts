import client from "../axiox.config";

export const editClient = (clientId: any, data: any) => {
  return client.patch<any, any>(`/clients/update-client/${clientId}`, data);
};
