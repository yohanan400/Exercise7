import React, { useState } from "react";

import "./Login.css";

export default function Login() {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userData, setuserData] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();

        //get fildes values
        const uname = document.forms[0][0].value;
        const pass = document.forms[0][1].value;

        //preper data
        let formData = new FormData();
        formData.append('username', uname);
        formData.append('password', pass);

        const response = await fetch(`http://localhost:3001/users/login`, {
            method: "post",
            body: formData
        });

        //get response status
        let status = response.status;

        if (status != 200) {
            console.log("text!");
            const res = await response.text();
            setErrorMessages({name: "uname", message: res});
        }else{
            console.log("json!");
            const res = await response.json();
            setuserData(res);
        }

        if (userData[0]) {
            setIsSubmitted(true);
        }
    }

    // Generate error message
    const renderErrorMessage = () =>
        errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div>{renderErrorMessage()}</div>
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