import { useState, useEffect } from "react";
import "./summaries.css"
import { useParams } from "react-router-dom";


export default function Summaries() {

    const [summaries, setSummaries] = useState([])
    const { category } = useParams();

    useEffect(() => {
        async function fetchSummary() {
            const fetchedData = await fetch(`http://localhost:3001/summaries/byCategory/${category}`);
            const dataObject = await fetchedData.json();
            setSummaries(dataObject);
        }

        fetchSummary();
    }, []
    )

    return (
        <>
            <h1> נושאי סיכומים</h1>
            {summaries.length ?
                <table>
                    <tr>
                        <td>כותרת</td>
                        <td>משתמש מפרסם</td>
                        <td>קישור להורדה</td>
                    </tr>
                    {summaries.map(
                        (summary) => (
                            <tr>
                                <td>{summary.title}</td>
                                <td>{summary.username}</td>
                                <a href={summary.path} download="file.txt" target="_blank">הורדה</a>
                                {console.log("path", summary.path)}
                            </tr>
                        )
                    )}
                </table>
                : <label>אין סיכומים בנושא זה להצגה, עמכם הסליחה.</label>}
        </>
    )
}