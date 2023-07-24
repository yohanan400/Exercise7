import {useState, useEffect} from "react";


export default function Articles(){

    const [offset, setOffset] = useState(0);
    const [articlesList, setArticlesList] = useState([]);

    useEffect(
        ()=>{
            async function AtriclesFetch(){
                const fetchData = await fetch(`http://localhost:3001/articles/?limit=10&offset=${offset}`);
                const dataObject = await fetchData.json();

                setArticlesList((prev)=>[...prev, ...dataObject]);
            }

            AtriclesFetch();
        }, [offset]
    )

    return (
        <>
        <h1>מאמרים</h1>
        {articlesList.map(
            (article)=>(
                <div>
                    <label>{article.title}</label>
                </div>
            )
        )}
        <button onClick={()=>setOffset((prev)=>prev+10)}>טען עוד</button>
        </>
    )
}