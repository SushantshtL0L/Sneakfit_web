"use server";

import { register, login, whoami, updateProfile, adminCreateUser, adminGetAllUsers, adminUpdateUser, adminDeleteUser } from "../api/auth";
import { setAuthToken, setUserData } from "../cookie";
import { revalidatePath } from "next/cache";

export async function handleRegister(formData: any) {
  try {
    const result = await register(formData);
    return {
      success: true,
      message: result.message || "Registration successful",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleLogin(formData: any) {
  try {
    const result = await login(formData);
    if (result.token) {
      await setAuthToken(result.token);
      try {
        const userResult = await whoami();
        if (userResult) {
          await setUserData(userResult);
        }
      } catch (err) {
        console.error("Failed to fetch user data after login:", err);
      }
      return {
        success: true,
        message: result.message || "Login successful",
        data: result,
      };
    }
    return { success: false, message: "Login failed" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleWhoami() {
  try {
    const result = await whoami();
    if (result) {
      return {
        success: true,
        message: "Fetched user data",
        data: result,
      };
    }
    return { success: false, message: "Failed to fetch user data" };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleUpdateProfile(formData: any) {
  try {
    const result = await updateProfile(formData);
    if (result.user) {
      await setUserData(result.user);
      revalidatePath("/profile");
      return {
        success: true,
        message: result.message || "Profile updated successfully",
        data: result.user,
      };
    }
    return {
      success: false,
      message: result.message || "Profile update failed",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminCreateUser(formData: FormData) {
  try {
    const result = await adminCreateUser(formData);
    revalidatePath("/admin/users");
    return {
      success: true,
      message: result.message || "User created successfully",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminGetAllUsers() {
  try {
    const result = await adminGetAllUsers();
    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminUpdateUser(id: string, formData: FormData) {
  try {
    const result = await adminUpdateUser(id, formData);
    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return {
      success: true,
      message: result.message || "User updated successfully",
      data: result.user,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleAdminDeleteUser(id: string) {
  try {
    const result = await adminDeleteUser(id);
    revalidatePath("/admin/users");
    return {
      success: true,
      message: result.message || "User deleted successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}