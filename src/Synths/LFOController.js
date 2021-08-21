import { useRef, Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";
import "./LFOController.css";

export function LFOController({ type, sineVibrato, sineTremolo }) {
    const status = useRef(false);
    const [freqAM, setFreqAM] = useState(0);
    const [freqFM, setFreqFM] = useState(0);
    const [statusLFO, setStatusLFO] = useState(false);

    const showStatus = () => {
        if (statusLFO) {
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

    const changeAM = (e) => {
        sineTremolo.frequency.value = e;
        setFreqAM(e);
    };

    const changeFM = (e) => {
        sineVibrato.frequency.value = e;
        setFreqFM(e);
    };

    const handleOnOff = () => {
        if (type !== "NOISE") {
            if (status.current === false) {
                sineTremolo.start();
                sineTremolo.wet.linearRampTo(1, 0.1, Tone.now());
                sineVibrato.wet.linearRampTo(1, 0.1, Tone.now());
                sineTremolo.depth.linearRampTo(1, 0.1, Tone.now());
                sineVibrato.depth.linearRampTo(1, 0.1, Tone.now());
                status.current = true;
                setStatusLFO(true);
            } else {
                sineTremolo.wet.linearRampTo(0, 0.1, Tone.now());
                sineVibrato.wet.linearRampTo(0, 0.1, Tone.now());
                sineTremolo.depth.linearRampTo(0, 0.1, Tone.now());
                sineVibrato.depth.linearRampTo(0, 0.1, Tone.now());
                sineTremolo.stop();
                status.current = false;
                setStatusLFO(false);
            }
        } else {
            if (status.current === false) {
                sineTremolo.start();
                sineTremolo.wet.linearRampTo(1, 0.1, Tone.now());
                sineTremolo.depth.linearRampTo(1, 0.1, Tone.now());
                status.current = true;
                setStatusLFO(true);
            } else {
                sineTremolo.wet.linearRampTo(0, 0.1, Tone.now());
                sineTremolo.depth.linearRampTo(0, 0.1, Tone.now());
                sineTremolo.stop();
                status.current = false;
                setStatusLFO(false);
            }
        }
    };

    const handleReset = () => {
        if (type !== "NOISE") {
            setFreqAM(0);
            setFreqFM(0);
            sineTremolo.wet.linearRampTo(0, 0.1, Tone.now());
            sineVibrato.wet.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.depth.linearRampTo(0, 0.1, Tone.now());
            sineVibrato.depth.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.frequency.linearRampTo(0, 0.1, Tone.now());
            sineVibrato.frequency.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.stop();
            status.current = false;
            setStatusLFO(false);
        } else {
            setFreqAM(0);
            setFreqFM(0);
            sineTremolo.wet.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.depth.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.frequency.linearRampTo(0, 0.1, Tone.now());
            sineTremolo.stop();
            status.current = false;
            setStatusLFO(false);
        }
    };
    return (
        <Fragment>
            <div
                className={`${type}_LFO`}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <button onClick={handleOnOff}>
                    {type} LFO {showStatus()}
                </button>
                <button
                    className="reset"
                    onClick={handleReset}
                    style={{ height: "45px" }}
                >
                    RESET
                </button>
            </div>
            <div className={`${type}_LFO_FREQ`}>
                <CircleSlider
                    size={90}
                    knobRadius={7}
                    progressWidth={10}
                    circleWidth={9}
                    onChange={changeAM}
                    value={freqAM}
                    min={0}
                    max={100}
                    showTooltip={true}
                />
            </div>
            <div className={`${type}_AMW`}>{type} AMP LFO</div>
            {type === "NOISE" || (
                <div className={`${type}_LFOF_FREQW`}>{type} FREQ LFO</div>
            )}
            {type === "NOISE" || (
                <div className={`${type}_LFOF_FREQ`}>
                    <CircleSlider
                        size={90}
                        knobRadius={7}
                        progressWidth={10}
                        circleWidth={9}
                        onChange={changeFM}
                        min={0}
                        max={100}
                        value={freqFM}
                        showTooltip={true}
                    />
                </div>
            )}
        </Fragment>
    );
}
