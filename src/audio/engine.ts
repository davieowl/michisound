// src/audio/engine.ts
import * as Tone from "tone";
import { reverb, delay } from "./effects";
import { connectRecorder } from "./recorder";

export type OscType = "sine" | "triangle" | "square" | "sawtooth";

let currentType: OscType = "sine";

export let synth = createSynth(currentType);

function createSynth(type: OscType) {
  const s = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 0.8,
    },
  }).chain(reverb, delay);

  connectRecorder(s);
  return s;
}

export const setInstrument = (type: OscType) => {
  currentType = type;
  synth.dispose();
  synth = createSynth(type);
};

export const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

// Reproducir nota con tiempo preciso
export const playNote = (row: number, time?: number) => {
  if (time) {
    synth.triggerAttackRelease(scale[row], "8n", time);
  } else {
    synth.triggerAttackRelease(scale[row], "8n");
  }
};