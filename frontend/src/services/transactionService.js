import { API_BASE_URL } from "../config";

export async function getTransactions(journeyId) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/transactions`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        console.log("Get transactions failed:", response.status);
        return [];
    }

    return response.json();
}

export async function createTransaction(journeyId, amount, description, currency, type, transactionDate) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/transactions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount,
                description, 
                currency, 
                type, 
                transactionDate
            }),
        }
    );

    if (!response.ok) {
        console.log("Create Transaction failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}

export async function deleteTransaction(journeyId, transactionId) {
    const token = localStorage.getItem("authToken");

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/transactions/${transactionId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    if (!response.ok) {
        console.log("Delete transaction failed:", response.status);
        throw new Error(response.status.toString());
    }

    return true;
}

export async function updateTransaction(journeyId, transactionId, amount, description, currency, type, transactionDate) {
    const token = localStorage.getItem("authToken");
    
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/transactions/${transactionId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                amount, 
                description,
                currency,
                type,
                transactionDate
            })
        }
    );

    if (!response.ok) {
        console.log("Update transaction failed", response.status);
        throw new Error(response.status.toString());
    }

    return response.json();

}