import client from "../axiox.config";

export const loginUser = (email: any, password: any) => {
  return client.post<any, any>("/auth/login", { email, password });
};
