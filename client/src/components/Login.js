import React, { useState } from "react";

import "./Login.css";

export default function Login() {

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userData, setuserData] = useState([]);

    async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();
        var { uname, pass } = document.forms[0];
        
        // Find user login info
        setuserData( (await fetch("http://localhost:3001/users/admin/all")).json());
        console.log(userData);
        if (userData) {
            setIsSubmitted(true);
        }

    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
                <button onClick={() => setIsSubmitted(false)}>log out</button>
            </div>
        </div>
    );
}