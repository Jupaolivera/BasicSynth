import { useRef, Fragment, useState } from "react";
import { CircleSlider } from "react-circle-slider";
import * as Tone from "tone";
import "./Oscillator.css";

export function Oscillator({ type, synth, synthVolume }) {
    const dialVolSynth = useRef(-30);
    const playingSynth = useRef(false);
    const freqSynth = useRef(150);
    const [status, setStatus] = useState(false);

    const showStatus = () => {
        if (status) {
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

    const handleChange = (e) => {
        dialVolSynth.current = e;
        synthVolume.volume.linearRampTo(e, 0.1, Tone.now());
    };

    const handleChangeFreq = (e) => {
        freqSynth.current = e;
        synth.frequency.value = e;
    };

    const handlePlay = () => {
        if (type !== "NOISE") {
            if (!playingSynth.current) {
                synth.triggerAttack(synth.frequency.value);
                playingSynth.current = true;
                setStatus(true);
            } else {
                const now = Tone.now();
                synth.triggerRelease(now);
                playingSynth.current = false;
                setStatus(false);
            }
        } else {
            if (!playingSynth.current) {
                synth.start();
                playingSynth.current = true;
                setStatus(true);
            } else {
                synth.stop();
                playingSynth.current = false;
                setStatus(false);
            }
        }
    };

    return (
        <Fragment>
            <div className={type}>
                <button onClick={handlePlay}>
                    {type}
                    {showStatus()}
                </button>
            </div>
            <div className={`${type}_VOL`}>
                <CircleSlider
                    value={dialVolSynth.current}
                    onChange={handleChange}
                    min={-30}
                    max={-5}
                    size={90}
                    knobRadius={7}
                    progressWidth={10}
                    circleWidth={9}
                />
            </div>
            <div className={`${type}_VOLW`}>{`${type} VOLUME`}</div>

            {type === "NOISE" || (
                <Fragment>
                    <div className={`${type}_FREQ`}>
                        <CircleSlider
                            onChange={handleChangeFreq}
                            min={50}
                            max={4000}
                            value={freqSynth.current}
                            showTooltip={true}
                            stepSize={10}
                            size={90}
                            knobRadius={7}
                            progressWidth={10}
                            circleWidth={9}
                        />
                    </div>
                    <div className={`${type}_FREQW`}>{`${type} FREQUENCY`}</div>
                </Fragment>
            )}
        </Fragment>
    );
}
