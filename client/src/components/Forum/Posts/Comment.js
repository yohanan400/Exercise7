export default function Comment(props){

    const commentData = props.commentData;
    let userData;

    useEffect(
        () => {
            async function userDataFetch() {
                const fechedData = await fetch(`http://localhost:3001/users/info/${commentData.username}`);
                userData = await fechedData.json();
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