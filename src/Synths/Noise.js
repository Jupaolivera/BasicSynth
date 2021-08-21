import * as Tone from "tone";

export const noiseVolume = new Tone.Volume(-30).toDestination();

export const noiseTremolo = new Tone.Tremolo({
    frequency: 0,
    depth: 0,
    spread: 0,
}).connect(noiseVolume);

export const noise = new Tone.Noise("pink").connect(noiseTremolo);
