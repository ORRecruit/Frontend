"use client";
import axios, {AxiosResponse} from "axios";

function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
}

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
// Set the AUTH token for any request
client.interceptors.request.use(function (config) {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const onSuccess = function (response: AxiosResponse) {
  console.debug("Request Successful", response);
  return response.data;
};
client.interceptors.response.use(onSuccess, function (error) {
  if (error?.response?.status === 401) {
    localStorage.clear();
  }
  if (error?.response?.status === 500) {
    console.log("internal server error");
  }
  return Promise.reject(error);
});

export default client;
