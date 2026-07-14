import { useState, useEffect } from "react";
import { deleteJourney, getJourneys } from "../services/journeyService";
import { getSharedJourneys } from "../services/journeyShareService";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

import "../styles/JourneyPage.css";
import "../styles/Common.css";
import "../styles/MobileDevice.css";

import { FaTrash, FaCarSide, FaUmbrellaBeach } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { GiAirplaneDeparture, GiPalmTree } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { FaCartFlatbedSuitcase, FaHotel, FaEllipsisVertical } from "react-icons/fa6";
import { PiBeachBallDuotone } from "react-icons/pi";
import { GoSun } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";
import { FaEarthAmericas, FaXmark, FaPen, FaShareNodes } from "react-icons/fa6";





function checkJourneyStatus(fromDateStr, toDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(fromDateStr);
    startDate.setHours(0, 0, 0, 0);

    const lastDate = new Date(toDateStr);
    lastDate.setHours(0, 0, 0, 0);

    if (startDate > today) {
        return "Upcoming";
    } else if (today >= startDate && today <= lastDate) {
        return "Ongoing";
    } else {
        return "Past";
    }
};

function sortJourneys(journeyData) {
    const statusPriority = {
        "Ongoing": 1,
        "Upcoming": 2,
        "Past": 3
    };

    return [...journeyData].sort((a, b) => {
        const statusA = checkJourneyStatus(a.fromDate, a.toDate);
        const statusB = checkJourneyStatus(b.fromDate, b.toDate);

        if (statusPriority[statusA] !== statusPriority[statusB]) {
            return statusPriority[statusA] - statusPriority[statusB];
        }

        return new Date(b.fromDate) - new Date(a.fromDate);
    });
}


function JourneyPage() {
    const [journeys, setJourneys] = useState([]);
    const [sharedJourneys, setSharedJourneys] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        async function loadJourneys() {
            try {
                const [journeyData, sharedJourneyData] = await Promise.all([
                    getJourneys(),
                    getSharedJourneys()
                ]);

                setJourneys(sortJourneys(journeyData));
                setSharedJourneys(sortJourneys(sharedJourneyData));
            } catch (error) {
                console.error(error);
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        }

        loadJourneys();
    }, [navigate]);

    async function handleLogout(event) {
        localStorage.removeItem('authToken');
        navigate("/login");
    }

    async function handleDeleteJourney(journeyId) {
        try {
            const confirmed = confirm("🗑️ Are you sure you want to delete this journey?");
            if (!confirmed) {
                return;
            }

            await deleteJourney(journeyId);

            setJourneys(journeys.filter(journey => journey.id !== journeyId));
            alert("✅ Journey deleted successfully!");
        } catch (error) {
            console.log(error);
            alert("❌ Delete failed! Please try again.");
        }

        
    }

    function handleMenuClick(journeyId) {
        if (openMenuId === journeyId) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(journeyId);
        }
    }

    return (
        <AppLayout title="My Journeys">
            <div className="page-container">
                <div>
                    <button className="create-journey-bttn" onClick={() => navigate("/journeys/createjourney")}><FaPlus style={{ fontSize: '15px' }}/> New Journey</button>  
                </div>
                <div className="journey-list">
                    

                    {journeys.map((journey) => {
                            const diffTime = Math.abs(new Date(journey.toDate) - new Date(journey.fromDate));
                            const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                            const journeyStatus = checkJourneyStatus(journey.fromDate, journey.toDate);
                            let journeyStatusClass = "";
                            if (journeyStatus === "Ongoing") {
                                journeyStatusClass = "ongoing";
                            } else if (journeyStatus === "Upcoming") {
                                journeyStatusClass = "upcoming";
                            } else {
                                journeyStatusClass = "past";
                            }
                        
                            return (
                        <div key={journey.id}>
                            <div className="journey-card" onClick={() => navigate(`/journeys/${journey.id}/transactions`)}>

                                <div className="journey-card-header">
                                    <div className="journey-card-title">{journey.journeyName}</div>

                                    <div className="journey-time-currency">
                                        <div className={"journey-time" + " " + journeyStatusClass}>{journeyStatus}</div>
                                        <div className="journey-currency">{journey.defaultCurrency}</div>
                                    </div>

                                </div>



                                <div className="journey-route">
                                    <FaEarthAmericas /> {journey.originCountry} <GiAirplaneDeparture /> {journey.destinationCountry}
                                </div>

                                <div className="journey-dates">
                                    <CiCalendarDate style={{ fontSize: '20px'}}/> {journey.fromDate} - {journey.toDate}
                                </div>

                                <div className="journey-date-and-share">
                                    <div className="journey-total-days">
                                        <FaCartFlatbedSuitcase style={{ color: "#a9a9a9", marginRight: "6px", fontSize: "18px" }} /> 
                                        {totalDays} {totalDays > 1 ? "days" : "day"}
                                    </div>
                                    
                                    {journey.shared && (
                                        <div className="journey-share" onClick={(e) => {e.stopPropagation(); navigate(`/journeys/${journey.id}/shares`);}}>
                                            <FaShareNodes /> Shared with {journey.sharedUserCount} {journey.sharedUserCount === 1 ? ("person") : ("people")}
                                        </div>
                                    )}
                                </div>

                                <div className="journey-card-footer">
                                    <div className="journey-duration">
                                        <GiPalmTree style={{ color: "#00a141", marginRight: "6px", fontSize: "20px" }} /> 
                                        <FaCarSide  className="hide-on-mobile" style={{ color: "crimson", marginRight: "8px", fontSize: "20px" }} />
                                        <PiBeachBallDuotone style={{ color: "#e74c3c", marginRight: "6px", fontSize: "20px" }} />
                                        <GoSun style={{ color: "#f39c12", marginRight: "8px", fontSize: "20px" }} />

                                    </div>

                                    <div className="journey-actions">
                                        {openMenuId === journey.id && (
                                            <div className="inline-actions">
                                                <button className="share-button" onClick={(e) => {e.stopPropagation(); navigate(`/journeys/${journey.id}/shares`)}}> <FaShareNodes /> Share</button>
                                                <button className="btn-primary edit-button" onClick={(e) => {e.stopPropagation(); navigate(`/journeys/${journey.id}/edit`);}}> <FaPen /> Edit</button>
                                                <button className="btn-danger" onClick={(e) => {e.stopPropagation(); handleDeleteJourney(journey.id);}}><FaTrash /></button>
                                            </div>
                                        )}

                                        {openMenuId === journey.id ? (
                                            <button className="menu-button" onClick={(e) => { e.stopPropagation();
                                                    handleMenuClick(openMenuId === journey.id ? null : journey.id);}}>
                                                <FaXmark />
                                            </button>
                                        ) : (
                                            <button className="menu-button" onClick={(e) => { e.stopPropagation();
                                                    handleMenuClick(openMenuId === journey.id ? null : journey.id);}}>
                                                <FaEllipsisVertical />
                                            </button>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>);
                    })}
                </div>

            {sharedJourneys.length > 0 && (
    <>
        <h2 className="journey-section-title">Shared With Me</h2>

        <div className="journey-list">
            {sharedJourneys.map((journey) => {
                const diffTime = Math.abs(
                    new Date(journey.toDate) - new Date(journey.fromDate)
                );

                const totalDays =
                    Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                const journeyStatus = checkJourneyStatus(
                    journey.fromDate,
                    journey.toDate
                );

                let journeyStatusClass = "";

                if (journeyStatus === "Ongoing") {
                    journeyStatusClass = "ongoing";
                } else if (journeyStatus === "Upcoming") {
                    journeyStatusClass = "upcoming";
                } else {
                    journeyStatusClass = "past";
                }

                return (
                    <div key={journey.journeyId}>
                        <div
                            className="journey-card"
                            onClick={() =>
                                navigate(
                                    `/journeys/${journey.journeyId}/transactions`,
                                    {
                                        state: {
                                            permission: journey.permission,
                                            ownerEmail: journey.ownerEmail
                                        }
                                    }
                                )
                            }
                        >
                            <div className="journey-card-header">
                                <div className="journey-card-title">
                                    {journey.journeyName}
                                </div>

                                <div className="journey-time-currency">
                                    <div
                                        className={
                                            "journey-time " +
                                            journeyStatusClass
                                        }
                                    >
                                        {journeyStatus}
                                    </div>

                                    <div className="journey-currency">
                                        {journey.defaultCurrency}
                                    </div>
                                </div>
                            </div>

                            <div className="journey-route">
                                {journey.originCountry}
                                <GiAirplaneDeparture />
                                {journey.destinationCountry}
                            </div>

                            <div className="journey-dates">
                                <CiCalendarDate
                                    style={{ fontSize: "20px" }}
                                />
                                {journey.fromDate} - {journey.toDate}
                            </div>

                            <div className="journey-total-days">
                                <FaCartFlatbedSuitcase style={{ color: "#a9a9a9", marginRight: "6px", fontSize: "18px" }} /> 
                                    {totalDays} {totalDays > 1 ? "days" : "day"}
                            </div>

                            <div className="shared-journey-info">
                                <span className="shared-by">
                                    <FaUserGroup style={{color: "#a3a2a2"}}/> Shared by: {journey.ownerEmail}
                                </span>

                                <span
                                    className={`permission-badge ${journey.permission.toLowerCase()}`}
                                >
                                    {journey.permission === "READ"
                                        ? "READ ONLY"
                                        : "CAN EDIT"}
                                </span>
                            </div>

                            <div className="journey-card-footer">
                                <div className="journey-duration">
                                    <GiPalmTree style={{ color: "#00a141", marginRight: "6px", fontSize: "20px" }} /> 
                                    <FaCarSide  className="hide-on-mobile" style={{ color: "crimson", marginRight: "8px", fontSize: "20px" }} />
                                    <PiBeachBallDuotone style={{ color: "#e74c3c", marginRight: "6px", fontSize: "20px" }} />
                                    <GoSun style={{ color: "#f39c12", marginRight: "8px", fontSize: "20px" }} />
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    </>
)}

            </div>



            
        </AppLayout>

    );

}

export default JourneyPage;