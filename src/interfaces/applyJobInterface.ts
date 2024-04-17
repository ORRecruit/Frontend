export interface ApplyJobInterface {
  success: boolean;
  message: string;
  application: ApplicationDetails;
}

interface ApplicationDetails {
  jobId: number;
  candidateId: number;
  createdAt: string;
  updatedAt: string;
}
