import { useState } from "react"
import {Link, Outlet} from "react-router-dom"

export default function NavBar(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <div>
                {console.log("in NavBar")}
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

                {isLoggedIn? <Link to="/info">פורום</Link> :<> <Link to="/login">התחבר</Link> / <Link to="/register">הרשם</Link></>}
            </div>
            <Outlet/>
        </>
    )
}