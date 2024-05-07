import client from "../axiox.config";
import { PositionCountResponseInterface } from "@/interfaces/positionsCount";

export const jobOverview = () => {
  return client.get<
    PositionCountResponseInterface,
    PositionCountResponseInterface
  >(`/jobs/Jobsoverview`);
};
