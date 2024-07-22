import client from "../axiox.config";

export const createLeadOwner = (data: any) => {
  return client.post<any, any>("/leadOwners/create-leadowner", data);
};
