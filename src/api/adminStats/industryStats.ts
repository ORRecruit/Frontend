import client from "../axiox.config";

export const getIndustryStats = () => {
  return client.get<IndustryStats, IndustryStats>(
    `/statistics/industry-stats-last-month`
  );
};

interface IndustryStats {
  Tourism: number;
  Other: number;
  Technology: number;
  Hospitality: number;
}
