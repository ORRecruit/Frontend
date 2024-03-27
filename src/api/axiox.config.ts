"use client";
import axios, { AxiosResponse } from "axios";

function getAuthToken() {
  if (typeof window !== "undefined") {
    // Safe to use window.localStorage (API Integration Started)
    return localStorage.getItem("authToken");
  }
  return null;
}

const client = axios.create({
  baseURL: "http://localhost:8000/api",
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
