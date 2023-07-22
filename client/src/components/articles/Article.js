export default function Article(props) {

    const article = props.article;

    return (
        <>
            <div>
                <h1>{article.title}</h1>
                <div>
                    <h6>
                        {article.username}
                        {article.publish_date}
                    </h6>
                </div>
            </div>
            <div><h3>{article.body}</h3></div>
        </>
    )
}