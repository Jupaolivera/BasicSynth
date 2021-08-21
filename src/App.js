import "./App.css";
import { Microphone } from "./Components/Microphone";
import React from "react";
import * as Tone from "tone";
import { useRef, useEffect } from "react";
import {
    Analyzer_One,
    Analyzer_Two,
    WaveformRender,
} from "./Analyzers/Analyzers";

import { sineVolume, sineTremolo, sineVibrato, sine } from "./Synths/Sine";
import {
    squareVolume,
    squareTremolo,
    squareVibrato,
    square,
} from "./Synths/Square";
import {
    sawToothVolume,
    sawToothTremolo,
    sawToothVibrato,
    sawTooth,
} from "./Synths/Sawtooth";

import {
    triangleVolume,
    triangleTremolo,
    triangleVibrato,
    triangle,
} from "./Synths/Triangle";

import { noiseVolume, noiseTremolo, noise } from "./Synths/Noise";
import { mic, filter } from "./Synths/Microphone";
import { Oscillator } from "./Synths/Oscillator";
import { LFOController } from "./Synths/LFOController";

function App() {
    const ACTX = Tone.context; //setting up Tone.js + Web Audio API
    const Waveform = useRef(null);
    const AnalyzerTwo = useRef(null);
    const Analyzer_Two_WA = ACTX.createAnalyser();
    const waveformAnalyzer = new Tone.Analyser("waveform", 2048);

    useEffect(() => {
        Analyzer_One("SPECTRO_ONE", waveformAnalyzer);
        Analyzer_Two(Analyzer_Two_WA, Tone.Destination, AnalyzerTwo);
        WaveformRender(waveformAnalyzer, Tone.Destination, Waveform);
    });

    return (
        <div className="container">
            <div className="OSCIS">
                <Oscillator
                    type={"SINE"}
                    synthVolume={sineVolume}
                    synth={sine}
                />
                <Oscillator
                    type={"SQR"}
                    synthVolume={squareVolume}
                    synth={square}
                />
                <Oscillator
                    type={"SAW"}
                    synthVolume={sawToothVolume}
                    synth={sawTooth}
                />
                <Oscillator
                    type={"TRI"}
                    synthVolume={triangleVolume}
                    synth={triangle}
                />
                <Oscillator
                    type={"NOISE"}
                    synthVolume={noiseVolume}
                    synth={noise}
                />
                <Microphone
                    analyzerOne={waveformAnalyzer}
                    analyzerTwo={Analyzer_Two_WA}
                    mic={mic}
                    filter={filter}
                />
            </div>
            <div className="LFO">
                <LFOController
                    type={"SINE"}
                    sineTremolo={sineTremolo}
                    sineVibrato={sineVibrato}
                />
                <LFOController
                    type={"SQR"}
                    sineTremolo={squareTremolo}
                    sineVibrato={squareVibrato}
                />
                <LFOController
                    type={"SAW"}
                    sineTremolo={sawToothTremolo}
                    sineVibrato={sawToothVibrato}
                />
                <LFOController
                    type={"TRI"}
                    sineTremolo={triangleTremolo}
                    sineVibrato={triangleVibrato}
                />
                <LFOController type={"NOISE"} sineTremolo={noiseTremolo} />
            </div>
            <div className="SPECTRO_ONE" id="SPECTRO_ONE"></div>
            <div className="SPECTRO_TWO">
                <canvas
                    ref={AnalyzerTwo}
                    style={{ width: "100%", height: "90%" }}
                />
            </div>
            <div className="WAVEFORM">
                <canvas
                    ref={Waveform}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                    width={window.innerWidth}
                    height={window.innerHeight * 2}
                />
            </div>
        </div>
    );
}

export default App;
