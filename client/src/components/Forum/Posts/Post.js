import { useEffect } from "react/cjs/react.production.min";
import Comments from "./Comments";

export default function Post(props) {

    const postData = props.postData;
    let userData;

    useEffect(
        () => {
            async function userDataFetch() {
                const fechedData = await fetch(`http://localhost:3001/users/info/${postData.username}`);
                userData = await fechedData.json();
            }
            userDataFetch();
        }, []
    )

    return (
        <>
            <div>
                <div>
                    <lable>שם משתמש:</lable>
                    {postData.username}
                </div>
                <div>
                    <lable>תאריך הצטרפות:</lable>
                    {userData.register_date}
                </div>
            </div>

            <div>
                <div>
                    <p>{postData.title}</p>
                </div>
                <div>
                    <p>{postData.body}</p>
                </div>
            </div>

            <div>
                <label>זמן פרסום:</label>
                {postData.publish_date}
            </div>

            <br />

            <Comments postId={postData.Id} />
        </>
    )
}