import client from "../axiox.config";

export const getIndeedJobs = (obj: any) => {
  return client.get<any, any>(
    `/scraping/indeed-jobs?jobTitle=${obj?.field}&location=${obj?.location}&page=${obj?.page}`
  );
};
