export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  User: UserInfo;
}

interface UserInfo {
  userId: string;
  role: string;
  email: string;
  isProfile: boolean;
}
