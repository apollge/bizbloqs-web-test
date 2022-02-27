import axios from "axios";

export const ACCESS_TOKEN =
  typeof window !== "undefined" ? localStorage.getItem("access_token") : "";

export const USER_TOKEN =
  typeof window !== "undefined" ? localStorage.getItem("user_token") : "";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
});

export default axiosInstance;
