import { useState, useEffect } from "react";

export default function Info(props) {

    const userDetails = props.user;

    const [roles, setRoles] = useState([])
    const [accessLevel, setaccessLevel] = useState([])

    useEffect(
        async () => {
            const fetchedData = await fetch("http://localhost:3001/roles/");
            const dataObject = fetchedData.json();

            setRoles(dataObject);

            const fetchedData2 = await fetch("http://localhost:3001/accessLevel/");
            const dataObject2 = fetchedData2.json();

            setaccessLevel(dataObject2);
        }, []
    )

    return (
        <>
            <div>
                <img src={userDetails.profile_image_url} alt="profile image" />;
            </div>

            <div>
                <div>
                    <lable>שם מלא:</lable>
                    <input type="text" name="fullName" readonly="readonly">{userDetails.full_name}</input>
                </div>
                <div>
                    <lable>שם משתמש:</lable>
                    <input type="text" name="username" readonly="readonly">{userDetails.username}</input>
                </div>
                <div>
                    <lable>דוא"ל:</lable>
                    <input type="text" name="email" readonly="readonly">{userDetails.email}</input>
                </div>
                <div>
                    <lable>תפקיד:</lable>
                    <input type="text" name="role" readonly="readonly">{roles[userDetails.role_id]}</input>
                </div>
                <div>
                    <lable>רמה:</lable>
                    <input type="text" name="access_level_id" readonly="readonly">{accessLevel[userDetails.full_name]}</input>
                </div>
            </div>
        </>
    )
}