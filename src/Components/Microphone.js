import { useState } from "react";
import "./Microphone.css";

export function Microphone({ analyzerOne, analyzerTwo, mic, filter }) {
    const [micStatus, setMicStatus] = useState(false);

    const showStatus = () => {
        if (micStatus) {
            return (
                <div className="containerStatus">
                    ON
                    <div id="circleOn"></div>
                </div>
            );
        } else {
            return (
                <div className="containerStatus">
                    OFF
                    <div id="circleOff"></div>
                </div>
            );
        }
    };

    const micHandler = () => {
        // MIC INPUT SETUP //
        if (!micStatus) {
            setMicStatus(true);
            mic.open()
                .then(() => {
                    filter.connect(analyzerOne);
                    filter.connect(analyzerTwo);
                })
                .catch((e) => {
                    console.log("mic not open");
                });
        } else {
            setMicStatus(false);
            mic.close();
            /*
            filter.disconnect(analyzerOne);
            filter.disconnect(analyzerTwo);
            */
        }
    };
    return (
        <div className="MICRO">
            <button onClick={micHandler}> MIC {showStatus()}</button>
        </div>
    );
}
