import client from "../axiox.config";

export const easyApply = (formData: FormData, jobId: string | null) => {
  return client.post<any, any>(`/applicants/create-applicant?jobId=${jobId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
