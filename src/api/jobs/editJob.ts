import client from "../axiox.config";

export const editJob = (id: any, data: any) => {
  return client.patch<any, any>(`/jobs/${id}`, data);
};
