import { useState, useEffect } from "react";
import { getStorage, ref } from "firebase/storage";

export default function Summaries() {

    const [summaries, setSummaries] = useState([])

    useEffect(
        async () => {
            const fetchedData = await fetch("http://localhost:3001/categories");
            const dataObject = fetchedData.json();

            setSummaries(dataObject);
        }, []
    )

    downloadSummary = (path)=>{

        // Create a reference with an initial file path and name
        const storage = getStorage();
        const pathReference = ref(storage, path);
        getDownloadURL(pathReference);
    }

    return (
        <>
            <h1> נושאי סיכומים</h1>
            {summaries.map(
                (summary) => (
                    <div>
                        <lable>{summary.title}</lable>
                        <lable>{summary.username}</lable>
                        <lable>{summary.category}</lable>
                        <button onClick={downloadSummary(summary.path)}>הורדה</button>
                    </div>
                )
            )}
        </>
    )
}