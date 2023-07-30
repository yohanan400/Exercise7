import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Categories() {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        async function fetchData(){
            const fetchedData = await fetch("http://localhost:3001/categories");
            const dataObject = await fetchedData.json();

            setCategories(dataObject);
        }

        fetchData();
    }, []
    )

    return (
        <>
            <h1> נושאי סיכומים</h1>
            {categories.map(
                (category) => (
                    <div>
                        <Link to={`/summaries/${category.category_name}`}><label>{category.category_name}</label></Link>
                    </div>
                )
            )}
        </>
    )
}