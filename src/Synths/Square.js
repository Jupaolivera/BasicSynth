import * as Tone from "tone";

export const squareVolume = new Tone.Volume(-30).toDestination();
export const squareTremolo = new Tone.Tremolo({
    frequency: 0,
    depth: 1,
    spread: 0,
}).connect(squareVolume);

export const squareVibrato = new Tone.Vibrato({
    frequency: 0,
    depth: 1,
    wet: 0,
}).connect(squareTremolo);

export const square = new Tone.MonoSynth({
    volume: -8,
    oscillator: {
        type: "square",
        frequency: 150,
    },
    envelope: {
        attack: 0.6,
        decay: 0.0,
        sustain: 1,
        release: 0.1,
    },
}).connect(squareVibrato);
