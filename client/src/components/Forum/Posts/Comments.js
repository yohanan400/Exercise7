import { useContext, useEffect, useState } from "react";
import Comment from "./Comment"

export default function Comments(props) {

    const [comments, setComments] = useState([]);
    const [offset, setOffset] = useState(0);

    async function commentsFetch(offset) {
        const fechedData = await fetch(`http://localhost:3001/comments/byPostId/2?limit=10&offset=${offset}`);
        const newComments = await fechedData.json();
        setComments((prev) => [...prev, ...newComments]);
    }

    useEffect(
        () => {
            commentsFetch(offset);
        }, [offset]
    )

    return (
        <>
            {comments.map((c) => (
                <>
                {c ? 
                    <Comment commentData={c} />
                    : <></>
                }
                    <br />
                </>
            ))}
        <button onClick={()=>setOffset((prev)=>prev+10)}>טען עוד</button>
        </>
    )
}