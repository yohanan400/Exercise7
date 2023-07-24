import { useEffect, useState } from "react";
import Comment from "./Comment"

export default function Comments(props) {

    const [comments, setComments] = useState([]);
    const [importOffsetCounter, setImportOffsetCounter] = useState(0);

    useEffect(
        () => {
            async function commentsFetch(offset) {
                const fechedData = await fetch(`http://localhost:3001/comments/byPostId/${props.postId}?limit=10&offset=${offset}`);
                const newComments = await fechedData.json();
                setComments((prev) => [...prev, ...newComments]);
            }
            commentsFetch(importOffsetCounter);
        }, [importOffsetCounter]
    )

    return (
        <>
            {comments.map((c) => (
                <>
                    <Comment commentData={c} />
                    <br />
                </>
            ))}
            <button onClick={() => setImportOffsetCounter((prev) => prev + 10)}>טען עוד</button>
        </>
    )
}