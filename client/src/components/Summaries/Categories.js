import { useState, useEffect } from "react";

export default function Categories() {

    const [categories, setCategories] = useState([])

    useEffect(
        async () => {
            const fetchedData = await fetch("http://localhost:3001/categories");
            const dataObject = fetchedData.json();

            setCategories(dataObject);
        }, []
    )

    return (
        <>
            <h1> נושאי סיכומים</h1>
            {categories.map(
                (category) => (
                    <div>
                        <lable>{category.category_name}</lable>
                    </div>
                )
            )}
        </>
    )
}