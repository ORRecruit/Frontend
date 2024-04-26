import client from "../axiox.config";

export const ResetPassToken = (email: string) => {
  return client.post<any, any>("/auth/forgotPassword", {
    email,
  });
};
