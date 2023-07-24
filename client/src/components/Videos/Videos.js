import { useEffect, setState } from "react";
import "node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

export default function Videos(props) {

    const [videos, setVideos] = setState([]);

    useEffect(
        async () => {
            const fetchedData = await fetch(`http://localhost:3001/viseos/byCategory/${props.category}`);
            const dataObject = fetchedData.json();

            setVideos(dataObject);
        }
    )

    return (
        <>
            <h1>סרטונים</h1>
            {videos.map(
                (video) => (
                    <div>
                        <Player
                            playsInline
                            poster="/res/video-icon.png"
                            src={video.path}
                        />
                        <label>{video.title}</label>
                        <label>{video.username}</label>
                        <label>{video.publish_date}</label>
                    </div>
                )
            )}
        </>
    )
}