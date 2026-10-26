import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer, Flame, Snowflake } from 'lucide-react';

const BREW_PRESETS = [
  { name: 'Espresso Extraction', seconds: 25, temp: '92°C', icon: Flame },
  { name: 'V60 Pour-Over Bloom', seconds: 180, temp: '94°C', icon: Flame },
  { name: 'French Press Immersion', seconds: 240, temp: '93°C', icon: Flame },
  { name: 'Cold Brew Flash Steeping', seconds: 300, temp: '04°C', icon: Snowflake },
];

export default function BrewingTimerModal({ isOpen, onClose }) {
  const [activePreset, setActivePreset] = useState(BREW_PRESETS[1]);
  const [timeLeft, setTimeLeft] = useState(activePreset.seconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(activePreset.seconds);
    setIsRunning(false);
  }, [activePreset]);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('hcs_toast', {
            detail: {
              title: 'Extraction Complete!',
              message: `${activePreset.name} is ready for sensory tasting.`,
              type: 'success',
            },
          })
        );
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, activePreset]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((activePreset.seconds - timeLeft) / activePreset.seconds) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm bg-[#2A1B16] border border-[#EEDCC6]/30 rounded-3xl p-6 shadow-2xl text-[#F4E8D1] text-center font-mono">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-[#3C2A21] text-[#EEDCC6]"
          aria-label="Close timer modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#EEDCC6]/70 mb-4">
          <Timer className="w-4 h-4 text-amber-300" /> Artisan Brewing Chrono
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-left">
          {BREW_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setActivePreset(p)}
              className={`p-2.5 rounded-xl border text-xs transition-all ${
                activePreset.name === p.name
                  ? 'bg-[#3C2A21] border-[#EEDCC6] text-[#F4E8D1]'
                  : 'bg-[#2A1B16] border-[#EEDCC6]/15 text-[#EEDCC6]/70 hover:border-[#EEDCC6]/40'
              }`}
            >
              <span className="block font-bold truncate">{p.name}</span>
              <span className="text-[10px] text-[#EEDCC6]/60">{p.temp} · {Math.floor(p.seconds / 60)}m {p.seconds % 60}s</span>
            </button>
          ))}
        </div>

        {/* Circular Display / Digital Clock */}
        <div className="py-4">
          <div className="text-5xl font-black tracking-tight text-[#EEDCC6] font-mono mb-2">
            {formattedTime}
          </div>
          {/* Progress Bar */}
          <div className="w-48 mx-auto bg-[#3C2A21] h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className="bg-brand-gradient h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#F4E8D1] transition-all"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#2A1B16]" />}
            {isRunning ? 'Pause' : 'Start Timer'}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(activePreset.seconds);
            }}
            className="p-3 rounded-full bg-[#3C2A21] text-[#EEDCC6] hover:bg-[#EEDCC6]/20 transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
