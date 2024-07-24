import client from "../axiox.config";

export const scrapMatchResume = (formData: FormData) => {
  return client.post<any, any>(`/scraping/upload-and-match-resumes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
