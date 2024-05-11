import client from "../axiox.config";

export const easyApply = (data: any) => {
  return client.post<any, any>("/applicants/create-applicant", data);
};
