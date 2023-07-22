import { useEffect, useState } from "react"

export default function Clusters() {

    const [clustersData, setClustersData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        async function fetchClustersData() {
            const fetchedData = await fetch("http://localhost:3001/Clusters/");
            const fetchedDataJson = await fetchedData.json();

            await setClustersData(fetchedDataJson);
        }

        fetchClustersData();

        async function fetchCategoriesData() {
            const fetchedData = await fetch("http://localhost:3001/Categories/");
            const fetchedDataJson = await fetchedData.json();

            await setCategoriesData(fetchedDataJson);
        }

        fetchCategoriesData();

        console.log(clustersData);
        console.log(categoriesData);
    },
        []
    )

    return (
        <>
            <h1>Categories</h1>
            <div>
                {categoriesData.map((category) => (
                    <ol>
                        <br />
                        <div>
                            <label>{category.category_name} </label>
                            {clustersData.filter(x => x.category == category.category_name).map(
                                (cluster) => (
                                    <li>
                                        {cluster.cluster_name}
                                    </li>
                                ))}
                        </div>
                    </ol>
                ))}
            </div>
        </>
    )
}