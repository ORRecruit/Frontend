import client from "../axiox.config";
import { AllJobsInterface } from "@/interfaces/allJobsInterface";

export const getAllJobs = () => {
  return client.get<AllJobsInterface, AllJobsInterface>("/jobs/getAllJobs");
};
