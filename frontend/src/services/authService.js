import { API_BASE_URL } from "../config";

export async function login(email, password) {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    if (!response.ok) {
        console.log("Login failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}

export async function register(firstName, lastName, email, password, preferredCurrency) {
    const response = await fetch(
        `${API_BASE_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                preferredCurrency
            })
        }
    );

    if (!response.ok) {
        console.log("Register failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}