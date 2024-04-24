import client from "../axiox.config";

export const editJob = (id: any, data: any) => {
  return client.put<any, any>(`/jobs/editJob/${id}`, data);
};
