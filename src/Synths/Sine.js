import * as Tone from "tone";

export const sineVolume = new Tone.Volume(-30).toDestination();
export const sineTremolo = new Tone.Tremolo({
    frequency: 0,
    depth: 1,
    spread: 0,
}).connect(sineVolume);

export const sineVibrato = new Tone.Vibrato({
    frequency: 0,
    depth: 1,
    wet: 0,
}).connect(sineTremolo);

export const sine = new Tone.MonoSynth({
    volume: -8,
    oscillator: {
        type: "sine",
        frequency: 150,
    },
    envelope: {
        attack: 0.6,
        decay: 0.0,
        sustain: 1,
        release: 0.1,
    },
}).connect(sineVibrato);
