import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './Login.css'; // Import the CSS file for styling

const Login = ({ onLogin }) => {
    const handleCallbackResponse = (response) => {
        const userObject = jwtDecode(response.credential);
        console.log(userObject);
        onLogin(userObject);
    };

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <h2 className="loginTitle">Login</h2>
                <GoogleLogin
                    onSuccess={handleCallbackResponse}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </div>
    );
};

export default Login;
