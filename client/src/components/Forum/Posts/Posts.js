export default function Posts(props) {

    const [posts, setPosts] = useState([]);

    useEffect(
        () => {
            async function commentsFetch() {
                const fechedData = await fetch(`http://localhost:3001/posts/byCategory/${props.category}`);
                const newPosts = await fechedData.json();
                setPosts((prev) => [...prev, ...newPosts]);
            }
            commentsFetch();
        }, []
    )

    return (
        <>
            {posts.map((post) => (
                <div>
                    <div>
                        <h4>post.username</h4>
                    </div>
                    <div>
                        <h3>post.title</h3>
                    </div>
                </div>
            ))}
        </>
    )
}