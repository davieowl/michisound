import { useEffect, useState, useRef } from "react";
import * as Tone from "tone";
import { playNote, setInstrument, type OscType } from "../audio/engine";
import { startRecording, stopRecording } from "../audio/recorder";
import { reverb, delay } from "../audio/effects";

// --- IMPORTACIONES DE ICONOS ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faStop, 
  faDice, 
  faBroom, 
  faCircle, 
  faFileExport, 
  faWaveSquare,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';

const ROWS = 8;
const COLS = 16;

const colors = [
  "from-red-500 to-red-600",
  "from-orange-500 to-orange-600",
  "from-yellow-500 to-yellow-600",
  "from-green-500 to-green-600",
  "from-cyan-500 to-cyan-600",
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
];

const NOTE_NAMES = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"];

export default function Grid() {
  const [grid, setGrid] = useState(
    Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [reverbWet, setReverbWet] = useState(0.3);
  const [delayWet, setDelayWet] = useState(0.25);
  const [selectedPatternSlot, setSelectedPatternSlot] = useState(0);

  const stepRef = useRef(0);
  const gridRef = useRef(grid);
  const transportIdRef = useRef<number | null>(null);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    reverb.wet.value = reverbWet;
  }, [reverbWet]);

  useEffect(() => {
    delay.wet.value = delayWet;
  }, [delayWet]);

  useEffect(() => {
    if (transportIdRef.current) {
      Tone.Transport.clear(transportIdRef.current);
      transportIdRef.current = null;
    }

    const repeatCallback = (time: number) => {
      const step = stepRef.current;
      setCurrentStep(step);

      const currentGrid = gridRef.current;
      currentGrid.forEach((row, r) => {
        if (row[step]) {
          playNote(r, time);
        }
      });

      stepRef.current = (step + 1) % COLS;
    };

    transportIdRef.current = Tone.Transport.scheduleRepeat(repeatCallback, "8n");

    return () => {
      if (transportIdRef.current) {
        Tone.Transport.clear(transportIdRef.current);
      }
    };
  }, []);

  const toggleCell = (r: number, c: number) => {
    setGrid((prev) => {
      const copy = structuredClone(prev);
      copy[r][c] = !copy[r][c];
      return copy;
    });
  };

  // Botón único que alterna entre Play y Stop
  const togglePlayStop = async () => {
    if (isPlaying) {
      // Detener
      Tone.Transport.stop();
      Tone.Transport.position = 0;
      stepRef.current = 0;
      setCurrentStep(0);
      setIsPlaying(false);
    } else {
      // Reproducir
      await Tone.start();
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = +e.target.value;
    setBpm(newBpm);
    Tone.Transport.bpm.value = newBpm;
  };

  const savePatternToSlot = (slotIndex: number) => {
    try {
      localStorage.setItem(`pattern_slot_${slotIndex}`, JSON.stringify(grid));
      alert(`Patrón guardado en slot ${slotIndex + 1}`);
    } catch (e) {
      console.error("Error guardando patrón", e);
    }
  };

  const loadPatternFromSlot = (slotIndex: number) => {
    try {
      const data = localStorage.getItem(`pattern_slot_${slotIndex}`);
      if (data) {
        setGrid(JSON.parse(data));
        setSelectedPatternSlot(slotIndex);
      } else {
        alert(`Slot ${slotIndex + 1} está vacío`);
      }
    } catch (e) {
      console.error("Error cargando patrón", e);
    }
  };

  const generatePattern = () => {
    const newGrid = Array.from({ length: ROWS }, (_, r) =>
      Array.from({ length: COLS }, () => Math.random() > 0.85 - r * 0.04)
    );
    setGrid(newGrid);
  };

  const clearPattern = () => {
    setGrid(Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => false)));
  };

  const instruments: OscType[] = ["sine", "triangle", "square", "sawtooth"];

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-6xl px-4 py-8 mx-auto">
      {/* Título */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cyan-400">Step Sequencer</h2>
        <p className="text-zinc-500 text-sm italic">by michidev</p>
      </div>

      {/* Cuadrícula */}
      <div className="flex gap-2 w-full justify-center">
        <div className="flex flex-col gap-1 pt-1">
          {NOTE_NAMES.map((note, i) => (
            <div key={i} className="h-10 flex items-center text-xs font-mono text-zinc-500">
              {note}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS}, 2.5rem)` }}>
            {grid.map((row, r) =>
              row.map((active, c) => {
                const isCurrentStep = c === currentStep;
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => toggleCell(r, c)}
                    className={`
                      w-10 h-10 rounded-xl bg-[#14141f] border border-[#2a2a3a] 
                      transition-all duration-75 ease-in-out relative overflow-hidden
                      ${isCurrentStep ? "ring-2 ring-cyan-400 ring-opacity-50" : ""}
                      ${active ? `bg-gradient-to-br ${colors[r]} border-0 shadow-lg` : "hover:bg-[#1e1e2e]"}
                    `}
                  >
                    {active && (
                      <span className="absolute inset-0 bg-white opacity-20 group-hover:opacity-30 transition-opacity" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Botón único Play/Stop (ahora debajo de la grilla) */}
      <div className="flex justify-center w-full">
        <button 
          onClick={togglePlayStop} 
          className={`
            flex items-center justify-center gap-2 px-10 py-4 rounded-full 
            font-bold transition-all text-base w-48
            ${isPlaying 
              ? 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20' 
              : 'bg-cyan-400 text-black hover:bg-cyan-300 shadow-lg shadow-cyan-400/20'
            }
          `}
        >
          <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
          {isPlaying ? 'STOP' : 'PLAY'}
        </button>
      </div>

      {/* Panel de control */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-2 p-6 bg-[#0c0c14] rounded-2xl border border-[#1a1a28]">
        
        {/* Instrumentos */}
        <div className="space-y-3">
          <label className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase tracking-wider">
            <FontAwesomeIcon icon={faWaveSquare} className="text-cyan-400" /> Oscillator
          </label>
          <div className="flex gap-2 flex-wrap">
            {instruments.map((type) => (
              <button
                key={type}
                onClick={() => setInstrument(type)}
                className="px-3 py-1 rounded-md bg-[#1a1a2a] border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-all text-[10px] uppercase font-bold"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Efectos */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase tracking-wider">
            <FontAwesomeIcon icon={faSlidersH} className="text-pink-500" /> Effects
          </label>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
              <span>REVERB</span>
              <span>{Math.round(reverbWet * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.01"
              value={reverbWet}
              onChange={(e) => setReverbWet(+e.target.value)}
              className="w-full h-1 bg-[#1a1a2a] rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
              <span>DELAY</span>
              <span>{Math.round(delayWet * 100)}%</span>
            </div>
            <input
              type="range" min="0" max="1" step="0.01"
              value={delayWet}
              onChange={(e) => setDelayWet(+e.target.value)}
              className="w-full h-1 bg-[#1a1a2a] rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>

        {/* Patrones y BPM */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono text-zinc-500 flex items-center gap-2 uppercase tracking-wider mb-2">
              <FontAwesomeIcon icon={faDice} className="text-yellow-500" /> Slots
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((slot) => (
                <button
                  key={slot}
                  onClick={() => loadPatternFromSlot(slot)}
                  onDoubleClick={() => savePatternToSlot(slot)}
                  className={`
                    w-8 h-8 rounded-lg text-xs font-mono border transition-all
                    ${selectedPatternSlot === slot 
                      ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]' 
                      : 'bg-[#1a1a2a] border-[#2a2a3a] hover:border-zinc-500'}
                  `}
                  title={`Slot ${slot + 1} (doble clic para guardar)`}
                >
                  {slot + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mb-1">
              <span>TEMPO</span>
              <span className="text-cyan-400">{bpm} BPM</span>
            </div>
            <input
              type="range" min="60" max="200"
              value={bpm}
              onChange={handleBpmChange}
              className="w-full h-1 bg-[#1a1a2a] rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Actions</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={generatePattern} className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-[#1a1a2a] border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-all text-[10px] font-bold">
              <FontAwesomeIcon icon={faDice} /> RANDOM
            </button>
            <button onClick={clearPattern} className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-[#1a1a2a] border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-all text-[10px] font-bold">
              <FontAwesomeIcon icon={faBroom} /> CLEAR
            </button>
            <button onClick={startRecording} className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-500 transition-all text-[10px] font-bold shadow-lg shadow-pink-900/20">
              <FontAwesomeIcon icon={faCircle} className="text-[8px] animate-pulse" /> REC
            </button>
            <button onClick={stopRecording} className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-all text-[10px] font-bold">
              <FontAwesomeIcon icon={faFileExport} /> EXPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}