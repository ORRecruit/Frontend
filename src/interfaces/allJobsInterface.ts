export interface AllJobsInterface {
  message: string;
  data: JobDetail[];
}

interface JobDetail {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  industry: string;
  companyName: string;
  qualification: string;
  salaryOffered: string; // Consider using "salaryOffered" if "saleryOffered" is a typo
  requirements: string;
  responsibilities: string;
  skillsRequired: string;
  experienceRequired: string;
  jobStatus: string;
  createdAt: string;
  updatedAt: string;
  recruiter_id: number | null;
  user_id: number | null;
}
