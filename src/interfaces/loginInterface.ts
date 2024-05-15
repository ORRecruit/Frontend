export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserInfo;
}

export interface UserInfo {
  userId: string;
  roles: string[];
  email: string;
  isProfile: boolean;
  profilePhoto?: string;
}
