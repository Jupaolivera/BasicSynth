import * as Tone from "tone";

export const filter = new Tone.Filter(300, "highpass", -24);
export const mic = new Tone.UserMedia(-10).connect(filter);
