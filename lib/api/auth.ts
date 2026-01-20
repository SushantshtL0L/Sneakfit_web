import { LoginData, RegisterData } from "@/app/(auth)/schema"
import axios from "axios";
import { API } from "./endpoints";


//registrationData: any -> can be RegistrationType from schema
export const register = async (RegisterData: any) => {
    try{
        const response = await axios.post(API.AUtH.REGISTER, RegisterData)
        return response.data; //response ko body
    }catch(err: Error | any){
        //4xx - 5xx fails in catch
        throw new Error(
            err.response?.data?.message //message from backend
            || err.message //general exception message
            || 'Registration Failed' //fallback message
        )
    }
};

export const login = async (LoginData: LoginData) => {
    try{
        const response = await axios.post(API.AUtH.LOGIN, LoginData)
        return response.data; //response ko body
    }catch(err: Error | any){
        //4xx - 5xx fails in catch
        throw new Error(
            err.response?.data?.message //message from backend
            || err.message //general exception message
            || 'login Failed' //fallback message
        )
    }
}