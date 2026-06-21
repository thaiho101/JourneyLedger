import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { changePassword } from "../services/settingsService";
import "../styles/SettingsPage.css";
import "../styles/journeyForm.css";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";




function SettingsPage() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("❗ Warning: Passwords do not match! Please try again.");
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);

            alert("🎉 Congratulations! Password changed successfully");

            setConfirmPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            alert("❌ Error: Failed to change password! Please try again.");
        }
    }

    return (
        <AppLayout title="Settings">
            <div className="page-container">

                <div className="settings-card">

                    <h2 className="settings-title">
                        Change Password
                    </h2>

                    <form
                        className="settings-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="settings-row auth-form-group">
                            <label>Current Password</label>

                            <div className="input-form-group">
                                <div className="input-icon"><TbLockPassword /></div>
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={(e) =>
                                        setCurrentPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter current password"
                                    required
                                />
                                <div className="eye-icon" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    {showCurrentPassword ? <PiEyeClosedDuotone /> : <FaRegEye />}
                                </div>
                            </div>

                        </div>

                        <div className="settings-row auth-form-group">
                            <label>New Password</label>

                            <div className="input-form-group">
                                <div className="input-icon"><TbLockPassword /></div>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter new password"
                                    required
                                />
                                <div className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <PiEyeClosedDuotone /> : <FaRegEye />}
                                </div>
                            </div>
                        </div>

                        <div className="settings-row auth-form-group">
                            <label>Confirm Password</label>

                            <div className="input-form-group">
                                <div className="input-icon"><TbLockPassword /></div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Enter confirm password"
                                    required
                                />
                                <div className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <PiEyeClosedDuotone /> : <FaRegEye />}
                                </div>
                            </div>
                        </div>

                        <div className="settings-actions">
                            <button
                                className="btn-primary"
                                type="submit"
                            >
                                Change Password
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </AppLayout>
    );
}

export default SettingsPage;