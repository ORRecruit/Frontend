import client from "../axiox.config";

export const jobCompleteApi = (data: any) => {
  const { jobId, isCompleted } = data;
  return client.patch<any, any>(`/jobs/${jobId}/complete`, { isCompleted });
};
