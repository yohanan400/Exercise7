import { useState } from "react"
import {Link, Outlet, useNavigate} from "react-router-dom"

export default function NavBar({userData, setuserData}){

    const navigate = useNavigate();

    const logout = ()=>{
        setuserData();
        navigate(`/login`);
    }

    return (
        <>
            <div>
                <Link to="/forum">פורום</Link>
                <span style={{padding:"10px"}}/>
                <Link to="/articles">מאמרים</Link>
                <span style={{padding:"10px"}}/>

                <Link to="/summaries">סיכומים</Link>
                <span style={{padding:"10px"}}/>

                <Link to="/videos">סרטונים</Link>
                <span style={{padding:"10px"}}/>

                <Link to="/contact">צור קשר</Link>
                <span style={{padding:"10px"}}/>

                {userData ? <><Link to="/info">פרופיל אישי</Link><button onClick={()=>logout()}>התנתק</button></> :
                    <><Link to="/login">התחבר</Link> / <Link to="/register">הרשם</Link></>}
            </div>
            <Outlet/>
        </>
    )
}