import { API_BASE_URL } from "../config";

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getSharedJourneys() {
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/shared`, {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response) {
        throw new Error("Failed to load shared journeys");
    }

    return response.json();
}

export async function getJourneyShares(journeyId) {
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/shares`, {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to load journey shares");
    }

    return response.json();
}

export async function shareJourney(journeyId, email, permission) {
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/shares`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                email,
                permission,
            }),
        }
    );

    if (!response) {
        throw new Error("Failed to share journey");
    }

    return response.json();
}

export async function updateJourneyPermission(journeyId, userId, permission) {
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/shares/${userId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                permission,
            }),
        }
    );

    if (!response) {
        throw new Error("Failed to update permission");
    }

    return response.json();
}

export async function removeJourneyShare(journeyId, userId) {
    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}/shares/${userId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response) {
        throw new Error("Failed to remove shared user");
    }
}