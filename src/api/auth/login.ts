import { LoginResponse } from "@/interfaces/loginInterface";
import client from "../axiox.config";

export const loginUser = (email: string, password: string) => {
  return client.post<LoginResponse, LoginResponse>("/auth/login", {
    email,
    password,
  });
};
