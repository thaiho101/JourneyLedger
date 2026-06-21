import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/userService";

import "../styles/AccountPage.css";

function AccountPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser() {
            try {
                const userData = await getCurrentUser();

                if (!userData) {
                    localStorage.removeItem("authToken");
                    navigate("/login");
                    return;
                }

                setUser(userData);
            } catch (error) {
                localStorage.removeItem("authToken");
                navigate("/login");
            }
        }

        loadUser();
    }, [navigate]);

    if (!user) {
        return (
            <AppLayout title="Personal Information">
                <div className="page-container">
                    <div className="form-card">
                        <p style={{ textAlign: "center", color: "#6b7280" }}>Loading user information...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Personal Information">
            <div className="page-container">
                <div className="form-card">
                    <div className="account-card">
                        <div className="account-row">
                            <span className="account-label">First Name</span>
                            <span className="account-value">{user.firstName}</span>
                        </div>

                        <div className="account-row">
                            <span className="account-label">Last Name</span>
                            <span className="account-value">{user.lastName}</span>
                        </div>

                        <div className="account-row">
                            <span className="account-label">Email</span>
                            <span className="account-value">{user.email}</span>
                        </div>

                        <div className="account-row">
                            <span className="account-label">Preferred Currency</span>
                            <span className="account-value">{user.preferredCurrency}</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

export default AccountPage;