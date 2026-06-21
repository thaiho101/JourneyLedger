import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import JourneyPage from "./pages/JourneyPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import CreateJourneyPage from "./pages/CreateJourneyPage";
import UpdateJourneyPage from "./pages/UpdateJourneyPage";
import TransactionPage from "./pages/TransactionPage";
import SettingsPage from "./pages/SettingsPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/journeys" element={<JourneyPage />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/journeys/createjourney" element={<CreateJourneyPage />}></Route>
        <Route path="/journeys/:journeyId/edit" element={<UpdateJourneyPage />}></Route>
        <Route path="/journeys/:journeyId/transactions" element={<TransactionPage />}></Route>

        <Route path="/settings" element={<SettingsPage />}></Route>

        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;