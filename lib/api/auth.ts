import axios from "./axios";
import { API } from "./endpoints";

export const register = async (registrationData: any) => {
  try {
    const response = await axios.post(API.AUTH.REGISTER, registrationData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Registration Failed"
    );
  }
};

export const login = async (loginData: any) => {
  try {
    const response = await axios.post(API.AUTH.LOGIN, loginData);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Login Failed"
    );
  }
};



export const whoami = async () => {
  try {
    const response = await axios.get(API.AUTH.WHOAMI);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Fetching User Data Failed");
  }
};

export const updateProfile = async (profileData: any) => {
  try {
    const response = await axios.put(API.AUTH.UPDATEPROFILE, profileData);
    return response.data;
  } catch (err: any) {
    console.error("API Update Profile Error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message || "Updating Profile Failed");
  }
};

export const adminCreateUser = async (userData: FormData) => {
  try {
    const response = await axios.post(API.ADMIN.USER.CREATE, userData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Creating User Failed");
  }
};

export const adminGetAllUsers = async (role?: string) => {
  try {
    const url = role && role !== 'all' ? `${API.ADMIN.USER.LIST}?role=${role}` : API.ADMIN.USER.LIST;
    const response = await axios.get(url);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Fetching Users Failed");
  }
};

export const adminUpdateUser = async (id: string, userData: FormData) => {
  try {
    const response = await axios.put(API.ADMIN.USER.UPDATE(id), userData);
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Updating User Failed");
  }
};

export const adminDeleteUser = async (id: string) => {
  try {
    const response = await axios.delete(API.ADMIN.USER.DELETE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Deleting User Failed");
  }
};