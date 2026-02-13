import axios from "./axios";
import { API } from "./endpoints";

export const createProduct = async (formData: FormData) => {
  try {
    const response = await axios.post(API.PRODUCT.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Product Creation Failed"
    );
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API.PRODUCT.LIST);
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Products Failed"
    );
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(API.PRODUCT.GET_ONE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Fetching Product Failed"
    );
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(API.PRODUCT.DELETE(id));
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || err.message || "Product Deletion Failed"
    );
  }
};
