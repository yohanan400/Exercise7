import { useEffect, useState } from "react";

export default function UserDetails(props) {

    const [userData, setUserData] = useState([]);


    async function userDataFetch() {
        const fechedData = await fetch(`http://localhost:3001/users/info/${props.username}`);
        const userObject = await fechedData.json();
        setUserData(userObject);
    }

    useEffect(
        () => {
            userDataFetch();
        }, []
    )

    return (
        <>
            <div>
                <div>
                    <lable>שם משתמש:</lable>
                    {props.username}
                </div>
                {/* <div>
                    <lable>תאריך הצטרפות:</lable>
                    {userData[0] !== undefined ? userData[0].register_date : "unknown"}
                </div> */}
            </div>
        </>
    )
}