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

  return (
    <div className="auth-page">
        <div className="auth-card">
            <h1 className="auth-logo">JourneyLedger</h1>
            <h1 className="auth-title">Register</h1>
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
                    <div className="input-form-group">
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
                        <option value='USD'>USD</option>
                        <option value='VND'>VND</option>
                        <option value='EUR'>EUR</option>
                        <option value='JPY'>JPY</option>
                        <option value='THB'>THB</option>
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