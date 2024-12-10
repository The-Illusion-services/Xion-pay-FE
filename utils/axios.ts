import axios from "axios";
import router from "next/router";
import { deleteStore, loadStore } from "./local-storage";

export const url = "http://localhost:3001"
// export const url = "https://youchatbackend-kga1.onrender.com";
export const baseURL = `${url}/api`;

export const axiosWithoutToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const axiosWithToken = () => {
  let authData: any = loadStore();

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData?.token}`,
    },
  });
};

export const handleAxiosError = (err: any, thunkAPI: any) => {
  const { message, status } = err.toJSON();

  if (status === 401) {
    deleteStore();
    router.push("/auth/sign-in");
    // router.reload();
  }

  if (status === 403) {
    deleteStore();
    router.push("/");
    // router.reload();
  }

  if (message === "Network Error") {
    console.log("netwwork error ooo");

    // throw thunkAPI.rejectWithValue({ //TODO: whats thunkAPI
    //   status: 500,
    //   message: "You are offline", //TODO: chek tthid
    // });
  } else {
    throw new Error(err?.response?.data?.data?.message || "An error occurred");
    // throw thunkAPI.rejectWithValue({
    //   status: err.response.status || 0,
    //   message: err.response.data.message,
    // });
  }
};
