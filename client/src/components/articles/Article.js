import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Article() {

    const {title} = useParams();
    const [article, setArticle] = useState({});

    useEffect(
        ()=>{
            async function AtricleFetch(){
                const fetchData = await fetch(`http://localhost:3001/articles/byTitle/${title}`);
                const dataObject = await fetchData.json();
                setArticle(dataObject[0]);

                console.log("in Article", article);
            }

            AtricleFetch();
        }, []
    )

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