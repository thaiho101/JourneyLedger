import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../components/AppLayout";

import {
    getJourneyShares,
    shareJourney,
    updateJourneyPermission,
    removeJourneyShare
} from "../services/journeyShareService";

import "../styles/ShareJourneyPage.css";
import "../styles/Common.css";

function ShareJourneyPage() {
    const { journeyId } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [permission, setPermission] = useState("READ");
    const [shares, setShares] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        async function loadShares() {
            try {
                setLoading(true);
                setErrorMessage("");

                const data = await getJourneyShares(journeyId);
                setShares(data);
            } catch (error) {
                console.error(error);
                setErrorMessage("Unable to load shared users.");
            } finally {
                setLoading(false);
            }
        }

        loadShares();
    }, [journeyId]);

    async function handleShareJourney(event) {
        event.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setErrorMessage("Please enter an email address.");
            return;
        }

        try {
            setSubmitting(true);
            setErrorMessage("");
            setSuccessMessage("");

            const newShare = await shareJourney(
                journeyId,
                trimmedEmail,
                permission
            );

            setShares((currentShares) => [
                ...currentShares,
                newShare
            ]);

            setEmail("");
            setPermission("READ");
            setSuccessMessage("Journey shared successfully.");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message || "Unable to share journey.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handlePermissionChange(userId, newPermission) {
        try {
            setErrorMessage("");
            setSuccessMessage("");

            const updatedShare = await updateJourneyPermission(
                journeyId,
                userId,
                newPermission
            );

            setShares((currentShares) =>
                currentShares.map((share) =>
                    share.userId === userId
                        ? updatedShare
                        : share
                )
            );

            setSuccessMessage("Permission updated successfully.");
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error.message || "Unable to update permission."
            );
        }
    }

    async function handleRemoveShare(userId, sharedEmail) {
        const confirmed = window.confirm(
            `Remove access for ${sharedEmail}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setErrorMessage("");
            setSuccessMessage("");

            await removeJourneyShare(journeyId, userId);

            setShares((currentShares) =>
                currentShares.filter(
                    (share) => share.userId !== userId
                )
            );

            setSuccessMessage("Shared access removed.");
        } catch (error) {
            console.error(error);
            setErrorMessage(
                error.message || "Unable to remove shared access."
            );
        }
    }

    return (
        <AppLayout title="Share Journey">
            <div className="share-page-container">
                <button
                    type="button"
                    className="share-back-button"
                    onClick={() => navigate("/journeys")}
                >
                    ← Back to journeys
                </button>

                <section className="share-form-card">
                    <div className="share-form-header">
                        <h2>Share this journey</h2>

                        <p>
                            Invite another registered user using their
                            email address.
                        </p>
                    </div>

                    <form
                        className="share-form"
                        onSubmit={handleShareJourney}
                    >
                        <div className="share-form-group">
                            <label htmlFor="shared-user-email">
                                Email address
                            </label>

                            <input
                                id="shared-user-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="friend@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="share-form-group">
                            <label htmlFor="journey-permission">
                                Permission
                            </label>

                            <select
                                id="journey-permission"
                                value={permission}
                                onChange={(event) =>
                                    setPermission(event.target.value)
                                }
                            >
                                <option value="READ">
                                    Read only
                                </option>

                                <option value="EDIT">
                                    Can edit transactions
                                </option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="share-submit-button"
                            disabled={submitting}
                        >
                            {submitting
                                ? "Sharing..."
                                : "Share Journey"}
                        </button>
                    </form>

                    {errorMessage && (
                        <div className="share-message error">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="share-message success">
                            {successMessage}
                        </div>
                    )}
                </section>

                <section className="shared-users-card">
                    <div className="shared-users-header">
                        <div>
                            <h2>People with access</h2>

                            <p>
                                Manage permissions or remove access.
                            </p>
                        </div>

                        <span className="shared-user-count">
                            {shares.length}
                        </span>
                    </div>

                    {loading ? (
                        <p className="shared-users-empty">
                            Loading shared users...
                        </p>
                    ) : shares.length === 0 ? (
                        <p className="shared-users-empty">
                            This journey has not been shared yet.
                        </p>
                    ) : (
                        <div className="shared-users-list">
                            {shares.map((share) => (
                                <div
                                    className="shared-user-row"
                                    key={share.userId}
                                >
                                    <div className="shared-user-details">
                                        <div className="shared-user-avatar">
                                            {share.email
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <div className="shared-user-email">
                                                {share.email}
                                            </div>

                                            <div className="shared-user-description">
                                                Shared journey access
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shared-user-actions">
                                        <select
                                            className="shared-permission-select"
                                            value={share.permission}
                                            onChange={(event) =>
                                                handlePermissionChange(
                                                    share.userId,
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="READ">
                                                Read only
                                            </option>

                                            <option value="EDIT">
                                                Can edit
                                            </option>
                                        </select>

                                        <button
                                            type="button"
                                            className="remove-share-button"
                                            onClick={() =>
                                                handleRemoveShare(
                                                    share.userId,
                                                    share.email
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}

export default ShareJourneyPage;