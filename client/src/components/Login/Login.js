import React, { useContext, useEffect, useState } from "react";

import "./Login.css";
import {userContext} from "../../App"
import { useNavigate } from "react-router-dom";

export default function Login({setuserData}) {

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const userData = useContext(userContext);
    const navigate = useNavigate();

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

        if (status !== 200) {
            const res = await response.text();
            setErrorMessages({name: "uname", message: res});
        }else{
            const res = await response.json();
            setuserData(res);
            gotoInfo();
        }
    }

   const gotoInfo = ()=>{
        navigate(`/info/`);
    }

    useEffect(()=>{
        if (userData && userData[0]) {
            setIsSubmitted(true);
        }
    }, []);

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
                {renderForm}
            </div>
        </div>
    );
}