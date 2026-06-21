import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Layout.css";
import { getJourneys } from "../services/journeyService";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineTravelExplore, MdOutlineSettings } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";


function AppLayout({title, children}) {
    const navigate = useNavigate();
    const location = useLocation();

    const isJourneyActive = location.pathname.startsWith("/journeys");
    const isPersonalAccountActive = location.pathname.startsWith("/account");
    const isSettingsPageActive = location.pathname.startsWith("/settings");

    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    console.log(firstName);

  function handleLogout() {
    const confirmed = confirm("Are you sure you want to log out?!");
    if(!confirmed) {
        return;
    }

    localStorage.removeItem("authToken");
    navigate("/login");
  }


  return (
    <div className="app-layout">
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src="/logo/logo.png" alt="Journey Ledger Logo" className="logo-img" />
                <p>JourneyLedger</p>    
            </div>
           <div className="sidebar-user-wrapper">
                <FaRegUserCircle className="sidebar-user-icon" />
                <p className="sidebar-user">{firstName} {lastName}</p>
            </div>
            <nav className="sidebar-nav">
                {/* <button>Dashboard</button> */}
                <button onClick={() => navigate("/journeys")} className={isJourneyActive ? "active-nav" : ""}>Journeys</button>
                <button onClick={() => navigate("/account")} className={isPersonalAccountActive ? "active-nav" : ""}>Personal Account</button>
                <button onClick={() => navigate("/settings")} className={isSettingsPageActive ? "active-nav" : ""}>Settings</button>
                <button className="sidebar-logout" onClick={handleLogout}>Log out <IoIosLogOut size={25}/></button>
            </nav>
        </aside>

        <main className="main-area">
            <header className="topbar">
                <div className="topbar-title">
                    {title}
                </div>
                
                <button className="btn-logout" onClick={handleLogout}>Log out</button>
            </header>
            
            <div className="content-area"> {children} </div>
        </main>

        <div className="mobile-nav">
            {/* <button onClick={() => navigate("/dashboard")}>
                Dashboard
            </button> */}

            <button onClick={() => navigate("/journeys")} className={isJourneyActive ? "active-nav" : ""}>
                <MdOutlineTravelExplore style={{ fontSize: '24px' }} />
                Journeys
            </button>

            <button onClick={() => navigate("/account")} className={isPersonalAccountActive ? "active-nav" : ""}>
                <FaRegUserCircle style={{ fontSize: '24px' }} />
                User
            </button>

            <button onClick={() => navigate("/settings")} className={isSettingsPageActive ? "active-nav" : ""}>
                <MdOutlineSettings style={{ fontSize: '24px' }} />
                Settings
            </button>
        </div>

    </div>
  );
}

export default AppLayout;