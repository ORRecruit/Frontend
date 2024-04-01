"use client";
import axios, { AxiosResponse } from "axios";

function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: "Bearer" + getAuthToken(),
  },
});

const onSuccess = function (response: AxiosResponse) {
  console.debug("Request Successful", response);
  return response.data;
};
client.interceptors.response.use(onSuccess, async function (error) {
  if (error?.response?.status === 401) {
    localStorage.clear();
  }
  if (error?.response?.status === 500) {
    console.log("internal server error");
  }
});

export default client;
