import { API_BASE_URL } from "../config";

export async function changePassword(currentPassword, newPassword) {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
        `${API_BASE_URL}/api/settings/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        }
    );

    if (!response.ok) {
        console.log("Change password failed", response.status);
        throw new Error(response.status.toString());
    }

    return await response.text();
}