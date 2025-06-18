import axios from "axios";
import type { AuthService as AuthServiceType, RegisterService } from "../types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_ENDPOINT;

// Environment variables configured

// Create axios instances directly
const authApiClient = axios.create({
  baseURL: AUTH_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add response interceptors for error handling
authApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Auth API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const login = async (data: AuthServiceType) => {
  try{
    const response = await authApiClient.post(`login`, data);
    return response;
  } catch (error){
    throw error;
  }
}

const logout = async () => {
    try{
        await authApiClient.post(`logout`, {});
        return "Logout successful";
    } catch (error) {
        throw error;
    }
}

const register = async (data: RegisterService) => {
  try{
    const response = await authApiClient.post(`register`, data);
    return "Registration successful";
  } catch(error){
    throw error;
  }
}

const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    await authApiClient.post(`change-password`, {
      currentPassword,
      newPassword
    });
    return "Password changed successfully";
  } catch (error) {
    throw error;
  }
}

const resetPassword = async (email: string) => {
  try {
    await authApiClient.post(`reset-password`, { email });
    return "Password reset email sent";
  } catch (error) {
    throw error;
  }
}

const getUser = async (id: number) => {
  try {
    const response = await apiClient.get(`user/profile/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const AuthService = {
  login,
  logout,
  register,
  changePassword,
  resetPassword,
  getUser
};