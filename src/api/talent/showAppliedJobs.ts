import client from "../axiox.config";

export const appliedJobs = (data: any) => {
  return client.post<responsetyps, responsetyps>(
    "/jobs/candidate/appliedJobs/" + data
  );
};
interface responsetyps {
  success: boolean;
}
