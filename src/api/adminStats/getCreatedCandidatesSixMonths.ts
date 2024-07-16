import client from "../axiox.config";

export const getCandidatesForLastSixMonths = () => {
  return client.get<CandidateStatisticsResponse, CandidateStatisticsResponse>(
    `/statistics/candidates-created-six-months`
  );
};

interface CandidateStatistics {
  newCandidates: number;
  newApplicants: number;
}

interface CandidateStatisticsResponse {
  success: boolean;
  message: string;
  data: {
    [month: string]: CandidateStatistics;
  };
}
