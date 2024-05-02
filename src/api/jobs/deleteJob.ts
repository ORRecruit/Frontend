import client from "../axiox.config";

export const DeleteJob = (id: any) => {
  return client.delete<any, any>(`/jobs/${id}`);
};
