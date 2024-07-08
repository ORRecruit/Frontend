import client from "../axiox.config";

export const jobsTiers = () => {
  return client.get<JobStatisticsByTierResponse, JobStatisticsByTierResponse>(
    `/statistics/tiers-jobs`
  );
};

interface JobStatisticsByTierResponse {
  success: boolean;
  message: string;
  data: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
}
