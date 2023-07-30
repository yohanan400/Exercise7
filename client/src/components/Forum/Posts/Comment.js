import { useEffect, useState } from "react";

export default function Comment(props){

    const commentData = props.commentData;
    const [userData, setUserData] = useState([]);

    useEffect(
        () => {
            async function userDataFetch() {
                const fechedData = await fetch(`http://localhost:3001/users/info/${commentData.username}`);
                const userDataObject = await fechedData.json();
                setUserData(userDataObject);
            }
            userDataFetch();
        },[]
    )

    return(
        <>
            <div>
                <div>
                    <lable>שם משתמש:</lable>
                    {commentData.username}
                </div>
                <div>
                    <lable>תאריך הצטרפות:</lable>
                    {userData.register_date}
                </div>
            </div>

            <div>
                <div>
                    <p>{commentData.title}</p>
                </div>
                <div>
                    <p>{commentData.body}</p>
                </div>
            </div>

            <div>
                <label>זמן פרסום:</label>
                {commentData.publish_date}
            </div>
        </>
    )
}