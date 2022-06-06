import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/login", user, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log("err while logging in the user in client", err);
  }
});

const register = createAsyncThunk("user/register", async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/register", user, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log("err while registering in the user in client", err);
  }
});

const logout = createAsyncThunk("user/logout", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log("err while logging in the user in client", err);
  }
});

export { login, logout, register };
