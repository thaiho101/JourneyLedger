import { API_BASE_URL } from "../config";

export async function getJourneys() {
    const token = localStorage.getItem('authToken');
    // console.log("Token sent from service:", token);
    const response = await fetch(
        `${API_BASE_URL}/api/journeys`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        console.log("Get Journeys failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}

export async function createJourney(journeyName, originCountry, destinationCountry, fromDate, toDate, defaultCurrency) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                journeyName,
                originCountry,
                destinationCountry,
                fromDate,
                toDate,
                defaultCurrency
            })
        }
    );

    if (!response.ok) {
        console.log("Create new journey failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}

export async function deleteJourney(journeyId) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    );

    if (!response.ok) {
        console.log("Delete journey failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response;
}

export async function getJourneyById(journeyId) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );

    if (!response.ok) {
        console.log("Get Journey by Id failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}

export async function updateJourney(journeyId, journeyName, originCountry, destinationCountry, fromDate, toDate, defaultCurrency) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(
        `${API_BASE_URL}/api/journeys/${journeyId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                journeyName,
                originCountry,
                destinationCountry,
                fromDate,
                toDate,
                defaultCurrency
            })
        }
    );

    if (!response.ok) {
        console.log("Update failed:", response.status);
        throw new Error(response.status.toString()); 
    }

    return response.json();
}