import client from "../axiox.config";

export const contactUsApi = (data: any) => {
  return client.post<any, any>("/contacts/createContact", data);
};
