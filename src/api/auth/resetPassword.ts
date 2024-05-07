import client from "../axiox.config";

export const ResetPassword = (token: string, newPassword: string) => {
  return client.post<any, any>("/auth/verifyPassword", {
    token,
    newPassword,
  });
};
