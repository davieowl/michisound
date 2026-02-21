import * as Tone from "tone";

export const recorder = new Tone.Recorder();

export const connectRecorder = (node: Tone.ToneAudioNode) => {
  node.connect(recorder);
};

export const startRecording = async () => {
  await Tone.start();
  recorder.start();
};

export const stopRecording = async () => {
  const recording = await recorder.stop();
  const url = URL.createObjectURL(recording);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pattern.wav";
  a.click();
};