import * as Tone from "tone";

export const triangleVolume = new Tone.Volume(-30).toDestination();
export const triangleTremolo = new Tone.Tremolo({
    frequency: 0,
    depth: 0,
    spread: 0,
}).connect(triangleVolume);

export const triangleVibrato = new Tone.Vibrato({
    frequency: 0,
    depth: 0,
    wet: 0,
}).connect(triangleTremolo);

export const triangle = new Tone.MonoSynth({
    volume: -8,
    oscillator: {
        type: "triangle",
        frequency: 150,
    },
    envelope: {
        attack: 0.6,
        decay: 0.0,
        sustain: 1,
        release: 0.1,
    },
}).connect(triangleVibrato);
