import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //  needed if using cookies
});

//  Attach token automatically
axiosInstance.interceptors.request.use(
  async (config) => {
    let token: string | undefined;

    if (typeof window !== "undefined") {
      // Client-side: use localStorage
      token = localStorage.getItem("token") || undefined;
    } else {
      // Server-side: use Next.js cookies
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        token = cookieStore.get("auth_token")?.value;
      } catch (error) {
        console.error("Error reading cookies in axios interceptor:", error);
      }
    }

    if (token) {
      console.log(`[Axios] Found token for ${typeof window !== "undefined" ? "Client" : "Server"} request`);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(`[Axios] NO token found for ${typeof window !== "undefined" ? "Client" : "Server"} request`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
