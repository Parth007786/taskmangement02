// src/features/authService.js
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Set base URL for axios
axios.defaults.baseURL = "http://localhost:6565/api"; // Update to your backend API

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
