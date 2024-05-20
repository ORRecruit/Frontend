import client from "../axiox.config";

export const createProfile = (data: any) => {
  return client.post<any, any>("/candidates/createProfile", data);
};

export const uploadAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return client.post<any, any>("/applicants/upload-avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadResume = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return client.post<any, any>("/applicants/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};