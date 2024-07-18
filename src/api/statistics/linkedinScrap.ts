import client from "../axiox.config";

export const getLinkedinJobs = (
  field: any,
  geoId: any,
  page: any,
  sortBy: any,
  jobType: any,
  expLevel: any,
  workType: any
) => {
  return client.get<any, any>(
    `/scraping/jobs?field=${field}&geoid=${geoId}&page=${page}&sortBy=${sortBy}&jobType=${jobType}&expLevel=${expLevel}&workType=${workType}`
  );
};
