import client from "../axiox.config";

export const totalCandidates = () => {
  return client.get<ITotalCandidates, ITotalCandidates>(
    `/statistics/total-candidates`
  );
};

interface ITotalCandidates {
  totalCandidates: number;
}
