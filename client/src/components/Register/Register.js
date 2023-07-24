import { Form } from "react-router-dom";

export default function Register() {

    const handleSubmit = (event)=>{
        event.preventDefault();
        
        //TODO: VERIFAY PASSWORD AND SEND TO SERVER.
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <lable>שם מלא:</lable>
                    <input type="text" name="fullName" required/>
                </div>
                <div>
                    <lable>שם משתמש:</lable>
                    <input type="text" name="username" required/>
                </div>
                <div>
                    <lable>דוא"ל:</lable>
                    <input type="text" name="email" required/>
                </div>
                <div>
                    <lable>סיסמא:</lable>
                    <input type="text" name="password" required/>
                </div>
                <div>
                    <lable>אימות סיסמא:</lable>
                    <input type="text" name="verify-password" required/>
                </div>
                <div className="button-container">
                    <button type="submit">הרשם</button>
                </div>
            </form>
        </>
    )
}