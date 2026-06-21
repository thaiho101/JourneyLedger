import { API_BASE_URL } from "../config";

export async function getCurrentUser() {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `${API_BASE_URL}/api/auth/me`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        console.log("Get current user info failed", response.status);
        throw new Error(response.status.toString());
    }

    return response.json();
}