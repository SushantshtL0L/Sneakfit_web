import { getAuthToken } from "../cookie";

const API_URL = "http://localhost:5050/api/orders";

export async function handleCreateOrder(orderData: any) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetMyOrders() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/my-orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleGetAllOrders() {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleUpdateOrderStatus(orderId: string, status: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function handleDeleteOrder(orderId: string) {
  try {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
