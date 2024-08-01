import client from "../axiox.config";

export const isWinStatus = (obj: any) => {
  const { jobId, isWin, reason } = obj;

  return client.patch<any, any>(`/jobs/${jobId}/status`, { isWin, reason });
};
