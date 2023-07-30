import { useContext, useEffect, useState } from "react";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import UserDetailes from "./UserDetailes";
import { userContext } from "../../../App";


export default function Post() {

    const { postId } = useParams();
    const [postData, setPostData] = useState([]);
    const user = useContext(userContext);

    async function postDataFetch() {
        const fechedData = await fetch(`http://localhost:3001/posts/byId/${postId}`);
        const postObject = await fechedData.json();
        setPostData(postObject[0]);
    }

    async function addComment(event) {
        event.preventDefault();

        //get fildes values
        const title = event.target["title"].value;
        const body = event.target["body"].value;

        // //preper data
        let formData = new FormData();
        formData.append('postId', postId);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('username', user.username);

        const response = await fetch(`http://localhost:3001/comments/new`, {
            method: "post",
            body: formData
        });

        if (response.ok) {
            alert("תגובתך נקלטה בהצלחה.");
        event.target["title"].value = "";
        event.target["body"].value = "";
        }else{
            alert("תגובתך לא נקלטה, אנא נסה שוב.");
        }
    }

        useEffect(
            () => {
                postDataFetch();
            }, []
        )

        return (
            <>
                <UserDetailes username={postData.username} />
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


                {user ?
                    <>
                        <form onSubmit={addComment}>
                            <div>
                                <input type="text" placeholder="כותרת" name="title" required />
                            </div>
                            <div>
                                <textarea placeholder="Your message" name="body" required />
                            </div>
                            <div>
                                <button type="submit">
                                    הוסף תגובה
                                </button>
                            </div>
                        </form>
                    </>
                    : " "}

                <br /><br />
                <label><i><b>תגובות:</b></i></label>
                <br /><br />
                <Comments postId={postData.Id} />
            </>
        )
    }