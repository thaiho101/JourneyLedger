import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosedDuotone } from "react-icons/pi";

import "../styles/Auth.css";
import "../styles/LoginPage.css";





function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        const data = await login(email, password);


        console.log(data);

        if (data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('lastName', data.lastName);
            console.log("Token saved");
            navigate("/journeys");
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-logo-nav">
                
                <div className="auth-logo">
                    <img src="../../public/logo/logo.png" alt="Journey Ledger Logo" className="logo-img" />
                    <p>Journey Ledger</p>
                </div>
            </div>
            
            <div className="auth-card">
                <div className="greeting-nav">
                    <p className="greeting">WELCOME BACK!</p>
                </div>
                <h2 className="auth-title">Login</h2>

                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="auth-form-group">
                        <label>Email address</label>
                        <div className="input-form-group">
                            <span className="input-icon"><MdOutlineMailOutline /></span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required placeholder="Enter email"/>
                        </div>
                    </div>

                    <div className="auth-form-group">
                        <label>Password</label>
                        <div className="input-form-group">
                            <div className="input-icon"><TbLockPassword /></div>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type={showPassword ? 'text' : 'password'} 
                                required 
                                placeholder="Enter password"/>
                            <div className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <PiEyeClosedDuotone /> : <FaRegEye />}
                            </div>
                        </div>
                    </div>

                    <button className="btn-primary auth-submit" type='submit'>
                        Login
                    </button>
                </form>
                
                <div className="auth-footer">
                    <div className="auth-register">
                        Don't have an account? {" "}
                        <Link className="custom-link" to="/register">Register</Link>
                    </div>


                    <div className="auth-reset-password">
                        Forgot your password? {" "}
                        <Link className="custom-link" to="/register">Reset Password</Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;