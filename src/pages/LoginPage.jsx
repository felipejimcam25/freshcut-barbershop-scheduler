import { useState } from "react";
import { login } from "../services/authService";

import '../styles/Auth.css'
import Logo from '../assets/images/Logo.png';
import AuthBtn from "../components/AuthBtn";
import useAppNavigate from "../hooks/useNavigate";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";


function LoginPage() {
    const { goToDashboard, goToAdminDashboard } = useAppNavigate();

    const [form, setForm] = useState({
        identifier: '',
        password: '',
    });

    const handleOnChange = (e) => {
        

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault(e);

        console.log(form);
        
        try {
            const response = await login(form);

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("user", response.data.data.user.name);
            localStorage.setItem("userID", response.data.data.user.id);

            console.log(response);
            if(response.data.data.user.role === 'user') {
                goToDashboard();
            } else if(response.data.data.user.role === 'admin' || response.data.data.user.role === 'barber') {
                goToAdminDashboard();
            }

        } catch (err) {
            console.log(err.response);
        }

    }

    return (
        <header className="loginContainer container">

            <div className="loginContent">

            <div className="LoginHead">
                <img src={Logo} alt="Logo Freshcut" className="logo" />
                <span>Modern FreshCut</span>
                <h2 className="headTitle">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="formContainer">
                <div className="formControl">
                    <AuthInput 
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder="Enter Email or Username"
                        labelText='Username or email'
                        forHtml="identifier"
                        value={form.identifier}
                        onChange={handleOnChange}
                    />
                </div>

                <div className="formControl">
                    <AuthInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        labelText='Password'
                        forHtml="password"
                        value={form.password}
                        onChange={handleOnChange}
                    />
                    <Link href="" className="passwordResetLink">Forgot Password?</Link>
                </div>
                <AuthBtn text={'Sign In FreshCut'} />
            </form>
            <div className="account">
                <span>Don't have an account? <Link to="/register" className="linkAccount">Register</Link> now</span>
                
            </div>
            </div>
        </header>
    )

}


export default LoginPage;