import client from "../axiox.config";

export const easyApply = (body: any) => {
  const { jobId, ...rest } = body;
  return client.post<any, any>(
    `/applicants/create-applicant?jobId=${jobId}`,
    rest
  );
};
