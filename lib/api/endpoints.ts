export const API ={
    AUTH:{
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        LOGOUT: "/api/auth/logout",
        WHOAMI: "/api/auth/whoami",
        UPDATEPROFILE: "/api/users/profile",
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