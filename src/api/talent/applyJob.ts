import client from "../axiox.config";

export const applyJob = (data: any) => {
  return client.post<any, any>("/jobs/apply/" + data);
};
