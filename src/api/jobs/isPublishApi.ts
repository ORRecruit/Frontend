import client from "../axiox.config";

export const jobPublishApi = (data: any) => {
  const { jobId, isPublished } = data;
  return client.patch<any, any>(`/jobs/${jobId}/publish`, { isPublished });
};
