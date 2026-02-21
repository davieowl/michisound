// src/components/Visualizer.tsx
import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined); // Especificamos el tipo y valor inicial

  useEffect(() => {
    const analyser = new Tone.Analyser("fft", 64);
    Tone.getDestination().connect(analyser);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      animRef.current = requestAnimationFrame(draw);

      const values = analyser.getValue() as Float32Array;

      ctx.clearRect(0, 0, width, height);

      // Fondo con degradado
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#0a0a0f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const barWidth = width / values.length;

      values.forEach((v, i) => {
        // Normalizar el valor (típicamente entre -100 y 0 para FFT)
        const percent = Math.min(1, Math.max(0, (v + 100) / 100));
        const barHeight = Math.max(2, percent * height * 0.8);

        const x = i * barWidth;
        const y = height - barHeight;

        // Color basado en la frecuencia
        const hue = (i / values.length) * 360;
        const lightness = 50 + percent * 30;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;

        // Dibujar barra
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight - 2);
      });
    };

    draw();

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
      analyser.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1024}
      height={200}
      className="w-full max-w-4xl h-32 rounded-xl border border-[#1a1a28] shadow-2xl"
    />
  );
}