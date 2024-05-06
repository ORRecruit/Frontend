import client from "../axiox.config";

export const postJob = (data: any) => {
  return client.post<any, any>("/jobs/createJobs", data);
};

export const publishJob = (jobId:string, data: any) => {
  return client.post<any, any>(`/jobs/${jobId}/publish`, data);
};