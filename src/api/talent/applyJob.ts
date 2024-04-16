import { ApplyJobInterface } from "@/interfaces/applyJobInterface";
import client from "../axiox.config";

export const applyJob = (data: any) => {
  return client.post<ApplyJobInterface, ApplyJobInterface>(
    "/jobs/apply/" + data
  );
};
