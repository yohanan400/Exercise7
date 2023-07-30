import { useState, useEffect } from "react";

export default function Info({ userDetails }) {

    const [roles, setRoles] = useState([]);
    const [accessLevel, setaccessLevel] = useState([]);
    const userInfo = userDetails[0];

    async function fetchData() {
        const fetchedData = await fetch("http://localhost:3001/roles/");
        const dataObject = await fetchedData.json();
        setRoles(dataObject);

        const fetchedData2 = await fetch("http://localhost:3001/accessLevel/");
        const dataObject2 = await fetchedData2.json();
        setaccessLevel(dataObject2);
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <div>
                <img src={userInfo.profile_image_url} alt="profile image" />
            </div>
            <div>
                <div>
                    <label>שם מלא:</label>
                    <input type="text" name="fullName" readOnly="readonly" placeholder={userInfo.full_name} />
                </div>
                <div>
                    <label>שם משתמש:</label>
                    <input type="text" name="username" readOnly="readonly" placeholder={userInfo.username} />
                </div>
                <div>
                    <label>דוא"ל:</label>
                    <input type="text" name="email" readOnly="readonly" placeholder={userInfo.email} />
                </div>
                <div>
                    <label>תפקיד:</label>
                    <input type="text" name="role" readOnly="readonly" placeholder={roles.length ? roles[userInfo.role_id-1].role_title : " " } />
                </div>
                <div>
                    <label>רמה:</label>
                    <input type="text" name="access_level_id" readOnly="readonly" placeholder={accessLevel.length ? accessLevel[userInfo.access_level_Id-1].access_type : " "} />
                </div>
            </div>
        </>
    )
}