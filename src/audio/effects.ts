// src/audio/effects.ts
import * as Tone from "tone";

export const reverb = new Tone.Reverb({
  decay: 2,
  wet: 0.3
}).toDestination();

export const delay = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.25,
  wet: 0.25
}).toDestination();