import client from "../axiox.config";

export const winLoseStatsApi = () => {
  return client.get<any, any>(`/jobs/win-lose-stats`);
};
