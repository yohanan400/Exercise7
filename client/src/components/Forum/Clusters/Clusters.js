import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

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
    },
        []
    )

    return (
        <>
            <h1>נושאי פורום</h1>
            <div>
                {categoriesData.map((category) => (
                    <ol>
                        <br />
                        <div>
                            <label><b><u>{category.category_name}</u></b> </label>
                            <br />
                            {clustersData.filter(x => x.category == category.category_name).map(
                                (cluster) => (
                                    <>
                                        <Link to={`/forum/${cluster.cluster_name}`}>
                                            {cluster.cluster_name}
                                        </Link>
                                        <br />
                                    </>
                                ))}
                        </div>
                    </ol>
                ))}
            </div>
        </>
    )
}