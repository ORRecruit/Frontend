import client from "../axiox.config";
import { AllJobsInterface } from "@/interfaces/allJobsInterface";

export const getAllJobs = (
  title: any = "",
  contractType: any = "",
  jobType: any = ""
) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/getAllJobs?${title}&${contractType}&${jobType}`
  );
};

export const getAllJobsForAdmin = (title: any) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/admin/getAllJobs?${title}`
  );
};
