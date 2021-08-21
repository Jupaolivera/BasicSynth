import * as Tone from "tone";

export const sawToothVolume = new Tone.Volume(-30).toDestination();
export const sawToothTremolo = new Tone.Tremolo({
    frequency: 0,
    depth: 1,
    spread: 0,
}).connect(sawToothVolume);

export const sawToothVibrato = new Tone.Vibrato({
    frequency: 0,
    depth: 1,
    wet: 0,
}).connect(sawToothTremolo);

export const sawTooth = new Tone.MonoSynth({
    volume: -8,
    oscillator: {
        type: "sawtooth",
        frequency: 150,
    },
    envelope: {
        attack: 0.6,
        decay: 0.0,
        sustain: 1,
        release: 0.1,
    },
}).connect(sawToothVibrato);
