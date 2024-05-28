import client from "../axiox.config";

export const jobsPubClosThreeMonths = () => {
  return client.get<JobStatisticsResponse, JobStatisticsResponse>(
    `/statistics/jobs-published-closed-three-months`
  );
};

interface JobStatistics {
  publishedJobs: number;
  completedJobs: number;
}

interface JobStatisticsResponse {
  success: boolean;
  message: string;
  data: {
    [month: string]: JobStatistics;
  };
}
