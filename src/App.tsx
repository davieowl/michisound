// src/App.tsx
import Grid from "./components/Grid";
import Visualizer from "./components/Visualizer";

export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center gap-8 py-12 px-4 bg-[#0a0a0f]">
      <Visualizer />
      <Grid />
    </main>
  );
}