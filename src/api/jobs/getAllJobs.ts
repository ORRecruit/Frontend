import client from "../axiox.config";
import { AllJobsInterface } from "@/interfaces/allJobsInterface";

export const getAllJobs = (
  title: any = "",
  contractType: any = "",
  jobType: any = "",
  location: any = ""
) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/getAllJobs?${title}&${contractType}&${jobType}&${location}`
  );
};

export const getAllJobsForAdmin = (
  title: any,
  contractType: any = "",
  jobType: any = "",
  location: any = ""
) => {
  return client.get<AllJobsInterface, AllJobsInterface>(
    `/jobs/admin/getAllJobs?${title}&${contractType}&${jobType}&${location}`
  );
};
