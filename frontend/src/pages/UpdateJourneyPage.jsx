import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getJourneyById, updateJourney } from "../services/journeyService";
import AppLayout from "../components/AppLayout";

function UpdateJourneyPage() {
    const [journeyName, setJourneyName] = useState("");
    const [originCountry, setOriginCountry] = useState("");
    const [destinationCountry, setDestinationCountry] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [defaultCurrency, setDefaultCurrency] = useState("");
    const navigate = useNavigate();
    const { journeyId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(!token) {
            navigate("/login");
            return;
        }
        async function loadJourney() {
            const journey = await getJourneyById(journeyId);

            setJourneyName(journey.journeyName);
            setOriginCountry(journey.originCountry);
            setDestinationCountry(journey.destinationCountry);
            setFromDate(journey.fromDate);
            setToDate(journey.toDate);
            setDefaultCurrency(journey.defaultCurrency);
        }

        loadJourney();

    }, []);

    async function handleUpdateJourney(event) {
        try {
            event.preventDefault();

            const data = await updateJourney(journeyId, journeyName, originCountry, destinationCountry, fromDate, toDate, defaultCurrency);
            console.log(data);
            if (data) {
                alert("✅ Your journey updated successfully!");
                navigate("/journeys");
                return;
            }
        } catch (error) {
            console.log(error);
            alert("❌ Error: Update journey failed! Please try again.");
        }

    }

    const countries = [
    "Argentina", "Australia", "Austria", "Belgium", "Brazil", 
    "Canada", "Chile", "China", "Colombia", "Czech Republic", 
    "Denmark", "Egypt", "Finland", "France", "Germany", 
    "Greece", "Hungary", "Iceland", "India", "Indonesia", 
    "Ireland", "Italy", "Japan", "Malaysia", "Maldives", 
    "Mexico", "Morocco", "New Zealand", "Norway", "Philippines", 
    "Portugal", "Qatar", "Russia", "Saudi Arabia", "Singapore", 
    "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", 
    "Taiwan", "Thailand", "Turkey", "United Arab Emirates", "United Kingdom", 
    "United States", "Vietnam"
    ];

    const countryCurrencies = {
    "Argentina": "ARS",
    "Australia": "AUD",
    "Austria": "EUR",
    "Belgium": "EUR",
    "Brazil": "BRL",
    "Canada": "CAD",
    "Chile": "CLP",
    "China": "CNY",
    "Colombia": "COP",
    "Czech Republic": "CZK",
    "Denmark": "DKK",
    "Egypt": "EGP",
    "Finland": "EUR",
    "France": "EUR",
    "Germany": "EUR",
    "Greece": "EUR",
    "Hungary": "HUF",
    "Iceland": "ISK",
    "India": "INR",
    "Indonesia": "IDR",
    "Ireland": "EUR",
    "Italy": "EUR",
    "Japan": "JPY",
    "Malaysia": "MYR",
    "Maldives": "MVR",
    "Mexico": "MXN",
    "Morocco": "MAD",
    "New Zealand": "NZD",
    "Norway": "NOK",
    "Philippines": "PHP",
    "Portugal": "EUR",
    "Qatar": "QAR",
    "Russia": "RUB",
    "Saudi Arabia": "SAR",
    "Singapore": "SGD",
    "South Africa": "ZAR",
    "South Korea": "KRW",
    "Spain": "EUR",
    "Sweden": "SEK",
    "Switzerland": "CHF",
    "Taiwan": "TWD",
    "Thailand": "THB",
    "Turkey": "TRY",
    "United Arab Emirates": "AED",
    "United Kingdom": "GBP",
    "United States": "USD",
    "Vietnam": "VND"
    };

    function handleDestinationChange(e) {
        try {
            const selectedDest = e.target.value;
            setDestinationCountry(selectedDest);

            if (countryCurrencies[selectedDest]) {
                setDefaultCurrency(countryCurrencies[selectedDest]);
            }
        } catch (error) {
            console.log("Auto set currency failed");
        }

    }

    return (
        <AppLayout title="Update Journey">
            <div className="page-container">
                <div className="journey-form-card">
                    <form className="journey-form" onSubmit={handleUpdateJourney}>

                        <div className="journey-form-grid">
                            <div className="journey-form-row full-width">
                                <label>Journey Name</label>
                                <input value={journeyName} onChange={(e) => setJourneyName(e.target.value)} type="text" />
                            </div>

                            <div className="journey-form-row">
                                <label>Origin Country</label>
                                <select value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} type="text">
                                    <option value="">Select origin country</option>
                                    {
                                        countries.map((country) => 
                                            <option key={country} value={country}>{country}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="journey-form-row">
                                <label>Destination Country</label>
                                <select value={destinationCountry} onChange={handleDestinationChange} type="text">
                                    <option value="">Select destination country</option>
                                    {
                                        countries.map((country) => 
                                            <option key={country} value={country}>{country}</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="journey-form-row">
                                <label>Default Currency</label>
                                
                                <select
                                value={defaultCurrency}
                                onChange={(e) => setDefaultCurrency(e.target.value)}
                                >
                                    {Array.from(new Set(Object.values(countryCurrencies))).map((currencyCode) => 
                                        <option key={currencyCode} value={currencyCode}>{currencyCode}</option>    
                                )
                                    }
                                </select>
                            </div>

                            <div className="journey-form-row">
                                <label>From</label>
                                <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" />
                            </div>

                            <div className="journey-form-row">
                                <label>To</label>
                                <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" />
                            </div>

                        </div>

                        <div className="journey-form-actions">

                            <button type='button' className="cancel-button" onClick={() => navigate("/journeys")}>Cancel</button>

                            <button className="save-button" type='submit'>
                                Submit
                            </button>

                        </div>
                    </form>
                </div>
               
            </div>
        </AppLayout>

    );
}

export default UpdateJourneyPage;