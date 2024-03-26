import client from "../axiox.config";

export const registerUser = (email: any, password: any, role: any) => {
  return client.post<any, any>("/auth/register", { email, password, role });
};
