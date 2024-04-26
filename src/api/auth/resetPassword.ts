import client from "../axiox.config";

export const ResetPassword = (token: string, newPassword: string) => {
  return client.post<any, any>("/auth/changePassword", {
    token,
    newPassword,
  });
};
