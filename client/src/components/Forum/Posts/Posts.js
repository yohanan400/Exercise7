import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Posts() {

    const [posts, setPosts] = useState([]);
    const { cluster } = useParams();

    useEffect(
        () => {
            async function commentsFetch() {
                const fechedData = await fetch(`http://localhost:3001/posts/byCluster/${cluster}`);
                const newPosts = await fechedData.json();
                setPosts((prev) => [...prev, ...newPosts]);
            }
            commentsFetch();
        }, []
    )

    return (
        <>
            <h1> פוסטים</h1>
            {posts.length ?
                <table>
                    <tr>
                        <td>כותרת</td>
                        <td>שם משתמש</td>
                    </tr>
                    {posts.map(
                        (post) => (
                            <tr>
                                <td><Link to={`/forum/${cluster}/${post.Id}`}>{post.title}</Link></td>
                                <td>{post.username}</td>
                            </tr>
                        )
                    )}
                </table>
                : <label>אין פוסטים בנושא זה להצגה.</label>}
        </>
    )
}