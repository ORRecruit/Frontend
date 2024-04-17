import { SignupInterface } from "@/interfaces/signupInterface";
import client from "../axiox.config";

export const registerUser = (
  email: string,
  password: string,
  role: string,
  full_name: string
) => {
  return client.post<SignupInterface, SignupInterface>("/auth/register", {
    email,
    password,
    role,
    full_name,
  });
};
