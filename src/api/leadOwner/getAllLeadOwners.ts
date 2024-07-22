import client from "../axiox.config";

export const getAllLeadOwners = () => {
  return client.get<any, any>(`/leadOwners/get-all-leadowners`);
};
