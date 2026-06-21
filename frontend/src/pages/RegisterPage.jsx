import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";
import "../styles/RegisterPage.css";

function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [preferredCurrency, setPreferredCurrency] = useState("USD");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();

        const data = await register(firstName, lastName, email, password, preferredCurrency);

        console.log(data);

        navigate("/login");
    }

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

  return (
    <div className="auth-page">
        <div className="auth-logo-nav">
            <div className="auth-logo">
                <img src="/logo/logo.png" alt="Journey Ledger Logo" className="logo-img" />
                <p>Journey Ledger</p>
            </div>
        </div>
        <div className="auth-card-register"> 
            <h2 className="auth-title">Register</h2>
            <form className="auth-form auth-form-grid" onSubmit={handleRegister}>
                <div className="auth-form-group">
                    <label >First Name</label>
                    <div className="input-form-group">
                        <span className="input-icon"><IoPersonOutline /></span>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type='text' required placeholder="Enter your first name"/>
                    </div>
                </div>

                <div className="auth-form-group">
                    <label >Last Name</label>
                    <div className="input-form-group input-form-group-register">
                        <span className="input-icon"><IoPersonOutline /></span>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' required placeholder="Enter your last name"/>
                    </div>
                </div>

                <div className="auth-form-group full-width">
                    <label >Email</label>
                    <div className="input-form-group">
                        <span className="input-icon"><MdOutlineMailOutline /></span>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required placeholder="Enter your email"/>
                    </div>
                </div>

                <div className="auth-form-group">
                    <label >Password</label>
                    <div className="input-form-group">
                        <div className="input-icon"><TbLockPassword /></div>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            type={showPassword ? 'text' : 'password'} 
                            required
                            placeholder="Enter your password"/>
                        <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <PiEyeClosedDuotone /> : <FaRegEye />}
                        </div>
                    </div>
                </div>

                <div className="auth-form-group">
                    <label >Preferred Currency</label>
                    <select value={preferredCurrency} onChange={(e) => setPreferredCurrency(e.target.value)} >
                        {Object.entries(countryCurrencies).map(([country, code]) => 
                            <option key={country} value={code} > {country} {code}</option>
                        )}
                    </select>
                </div>

                <button className="btn-primary auth-submit" type='submit'>
                    Register
                </button>

            </form>
            <div class="auth-footer">
                Already have an account? <Link className="custom-link" to="/login">Login</Link>
            </div>

        </div>
    </div>
    
  )
}

export default RegisterPage;