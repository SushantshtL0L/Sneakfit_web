"use server";

import { createProduct, getAllProducts, deleteProduct } from "../api/product";
import { revalidatePath } from "next/cache";

export async function handleCreateProduct(formData: FormData) {
  try {
    const result = await createProduct(formData);
    revalidatePath("/dashboard");
    return {
      success: true,
      message: result.message || "Product created successfully",
      data: result.product,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleGetAllProducts() {
  try {
    const products = await getAllProducts();
    return {
      success: true,
      data: products,
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function handleDeleteProduct(id: string) {
  try {
    const result = await deleteProduct(id);
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/thrifts");
    return {
      success: true,
      message: result.message || "Product deleted successfully",
    };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
