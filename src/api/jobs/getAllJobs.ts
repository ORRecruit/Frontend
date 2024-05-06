import client from "../axiox.config";
import { AllJobsInterface } from "@/interfaces/allJobsInterface";

export const getAllJobs = (title: any) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/getAllJobs?${title}`
  );
  
};

export const getAllJobsForAdmin = (title: any) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/admin/getAllJobs?${title}`
  );
  
};
