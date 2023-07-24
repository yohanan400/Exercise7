import { useState, useEffect } from "react";

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
                        <label>{category.category_name}</label>
                    </div>
                )
            )}
        </>
    )
}