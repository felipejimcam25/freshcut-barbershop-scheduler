

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../services/authService";
import Logo from '../assets/images/Logo.png';
import AuthBtn from "../components/AuthBtn";
import AuthInput from "../components/AuthInput";




function RegisterPage() {

    const navigate = useNavigate();


    const [form, setForm] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log({form});
            
            const response = await register(form);

            console.log(response.data);

            navigate('/login')
            
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <header className="registerContainer">
            <div className="registerHead">
                <img className="registerLogo" src={Logo} alt="Freshcut Logo" />
                <span>FreshCut</span>
            </div>
            <form className="formContainer container" onSubmit={handleSubmit}>
                <div class="createAccount">
                    <span className="createTitle">Create an Account</span>
                    <span className="createtext">Enter your details to join the Freshcut mood</span>
                </div>
                <div className="formControl">
                    <AuthInput 
                        type="text" 
                        id="name" 
                        placeholder="Enter your Name"
                        labelText="Name"
                        forHtml="name"
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />
                </div>
                <div className="formControl">
                    <AuthInput 
                        type="text" 
                        id="username" 
                        placeholder="Enter your username"
                        labelText="Username"
                        forHtml="Username"
                        name="username"
                        value={form.username}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                username: e.target.value
                            })
                        }
                    />
                </div>
                <div className="formControl">
                    <AuthInput 
                        type="email" 
                        id="email" 
                        placeholder="Enter your email"
                        labelText="Email"
                        forHtml="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />
                </div>
                <div className="formControl">
                    <AuthInput 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password"
                        labelText="Password"
                        forHtml="password"
                        name="password"
                        value={form.password}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                    />
                </div>
                <div className="formControl">
                    <AuthInput 
                        type="text" 
                        id="phone" 
                        placeholder="Enter your Phone Number"
                        labelText="phone"
                        forHtml="phone"
                        name="phone"
                        value={form.phone}
                        onChange={(e) => 
                            setForm({
                                ...form,
                                phone: e.target.value
                            })
                        }
                    />
                </div>
                <AuthBtn text="Register FreshCut" />
            </form>
            <div class="account">
                <span>Already have an account? <Link to="/login" className="linkAccount">Back to Login</Link></span>
            </div>
        </header>
    )

}


export default RegisterPage;