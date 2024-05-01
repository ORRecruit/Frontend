export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserInfo;
}

interface UserInfo {
  userId: string;
  roles: string;
  email: string;
  isProfile: boolean;
}
