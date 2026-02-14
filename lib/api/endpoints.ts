export const API ={
    AUTH:{
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        LOGOUT: "/api/auth/logout",
        WHOAMI: "/api/auth/whoami",
        UPDATEPROFILE: "/api/users/profile",
        FORGOT_PASSWORD: "/api/auth/forgot-password",
        RESET_PASSWORD: "/api/auth/reset-password",
    },

    PRODUCT: {
      CREATE: "/api/products",
      LIST: "/api/products",
      GET_ONE: (id: string) => `/api/products/${id}`,
      DELETE: (id: string) => `/api/products/${id}`,
    },
    ADMIN:{
        USER:{
            LIST: "/api/admin/users",
            GET: (id: string) => `/api/admin/users/${id}`,
            CREATE: "/api/admin/users",
            UPDATE: (id: string) => `/api/admin/users/${id}`,
            DELETE: (id: string) => `/api/admin/users/${id}`,
        }
    }   
};