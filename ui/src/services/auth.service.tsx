import axios from "axios";
import useApi from "../context/useApi";
import type { AuthService as AuthServiceType, RegisterService } from "../types/auth.types";

const API_BASE_URL = process.env.API_ENDPOINT;
const AUTH_API_URL = process.env.AUTH_API_ENDPOINT;

const login = async (data: AuthServiceType) => {
  try{
    const { authApiClient } = useApi();
    const response = await authApiClient.post(`${AUTH_API_URL}login`, {data});
    return response;
  } catch (error){
    throw error;
  }
}

const logout = async () => {
    try{
        const { authApiClient } = useApi();
        await authApiClient.post(`${AUTH_API_URL}logout`, {});
        return "Logout successful";
    } catch (error) {
        throw error;
    }
}

const register = async (data: RegisterService) => {
  try{
    const { authApiClient } = useApi();
    await authApiClient.post(`${AUTH_API_URL}register`, {data});
    return "Registration successful";
  } catch(error){
    throw error;
  }
}

const changePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const { authApiClient } = useApi();
    await authApiClient.post(`${AUTH_API_URL}change-password`, {
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
    const { authApiClient } = useApi();
    await authApiClient.post(`${AUTH_API_URL}reset-password`, { email });
    return "Password reset email sent";
  } catch (error) {
    throw error;
  }
}

const getUser = async (id: number) => {
  try {
    const { authApiClient } = useApi();
    const response = await authApiClient.get(`${API_BASE_URL}profile/${id}`);
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