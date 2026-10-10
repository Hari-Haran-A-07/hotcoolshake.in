import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundscape from '../../services/soundscapeEngine';
import {
  Volume2,
  VolumeX,
  Radio,
  Sparkles,
  Flame,
  Snowflake,
  RotateCw,
  Waves,
  ChevronUp,
  ChevronDown,
  Headphones,
} from 'lucide-react';

export const SensoryAudioPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState('MILAN_BLOOM');
  const [volume, setVolume] = useState(0.5);
  const [freqBars, setFreqBars] = useState([8, 12, 18, 14, 20, 10, 6, 16]);
  const animFrameRef = useRef(null);

  const presets = [
    {
      id: 'MILAN_BLOOM',
      name: 'Milan Steam Bloom',
      desc: '68°C Thermal extraction & espresso hum',
      temp: '68°C',
      icon: Flame,
      color: '#EEDCC6',
    },
    {
      id: 'CRYO_CHILL',
      name: 'Sub-Zero Cryo Frost',
      desc: '04°C Cryogenic mist & crystalline chimes',
      temp: '04°C',
      icon: Snowflake,
      color: '#F4E8D1',
    },
    {
      id: 'VORTEX_SHAKE',
      name: 'Sonic Vortex Swirl',
      desc: 'Kinetic micro-foam oscillation frequencies',
      temp: '08°C',
      icon: RotateCw,
      color: '#EEDCC6',
    },
    {
      id: 'BINAURAL_432HZ',
      name: '432Hz Alpha Focus',
      desc: 'Binaural wave tuned for sensory taste clarity',
      temp: 'BINAURAL',
      icon: Headphones,
      color: '#D4B996',
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      soundscape.play(activePreset);
      soundscape.setVolume(volume);

      const updateVisualizer = () => {
        const raw = soundscape.getFrequencyData();
        if (raw && raw.length >= 8) {
          const sample = [
            raw[1] / 6,
            raw[3] / 5,
            raw[5] / 4,
            raw[7] / 4.5,
            raw[9] / 5,
            raw[11] / 6,
            raw[13] / 7,
            raw[15] / 8,
          ].map((v) => Math.max(4, Math.min(26, v)));
          setFreqBars(sample);
        }
        animFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    } else {
      soundscape.stop();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setFreqBars([4, 6, 8, 6, 9, 5, 4, 7]);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, activePreset]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectPreset = (presetId) => {
    setActivePreset(presetId);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundscape.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            className="mb-3 w-80 sm:w-96 rounded-[28px] bg-[#2A1B16]/95 backdrop-blur-2xl border border-[#EEDCC6]/30 shadow-2xl p-5 text-[#F4E8D1] space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]/15">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#EEDCC6]">
                  <Waves className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-black text-[#F4E8D1] tracking-wider uppercase">
                    SENSORY ACOUSTIC STUDIO
                  </h4>
                  <p className="text-[10px] font-mono text-[#EEDCC6]/70">
                    Binaural Roastery & Thermal ASMR
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#3C2A21] text-[#EEDCC6]/70 hover:text-[#F4E8D1]"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Visualizer & Play Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#3C2A21]/80 border border-[#EEDCC6]/20">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleTogglePlay}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
                    isPlaying
                      ? 'bg-brand-gradient text-[#2A1B16] shadow-cream-glow'
                      : 'bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/40 hover:border-[#EEDCC6]'
                  }`}
                >
                  {isPlaying ? (
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2A1B16]" />
                  ) : (
                    <span className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-[#EEDCC6] ml-0.5" />
                  )}
                </button>
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-[#F4E8D1] line-clamp-1">
                    {presets.find((p) => p.id === activePreset)?.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                    {isPlaying ? 'ACTIVE REAL-TIME STREAM' : 'PAUSED'}
                  </div>
                </div>
              </div>

              {/* Live EQ Bars */}
              <div className="flex items-end space-x-1 h-7">
                {freqBars.map((height, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: isPlaying ? height : 4 }}
                    transition={{ duration: 0.1 }}
                    className="w-1 bg-[#EEDCC6] rounded-full opacity-80"
                  />
                ))}
              </div>
            </div>

            {/* Presets List */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-widest text-[#EEDCC6]/70 uppercase font-bold">
                SELECT AMBIENT SOUNDSCAPE:
              </span>
              <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {presets.map((p) => {
                  const Icon = p.icon;
                  const isCur = activePreset === p.id && isPlaying;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPreset(p.id)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-mono transition-all flex items-center justify-between ${
                        activePreset === p.id
                          ? 'bg-[#3C2A21] border border-[#EEDCC6] text-[#F4E8D1] shadow-sm'
                          : 'bg-[#2A1B16]/50 border border-[#EEDCC6]/10 text-[#EEDCC6]/70 hover:bg-[#3C2A21]/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-[#EEDCC6]" />
                        <div>
                          <div className="font-bold text-[#F4E8D1] text-[11px]">{p.name}</div>
                          <div className="text-[9px] text-[#EEDCC6]/60">{p.desc}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-[#EEDCC6] font-bold px-2 py-0.5 rounded-full bg-[#2A1B16]">
                        {p.temp}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center space-x-3 pt-2 border-t border-[#EEDCC6]/15 text-xs font-mono text-[#EEDCC6]">
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#3C2A21] rounded-lg appearance-none cursor-pointer accent-[#EEDCC6]"
              />
              <span className="text-[10px] w-8 text-right font-mono">{Math.round(volume * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Minimizable Pill Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 px-4 py-2.5 rounded-full bg-[#2A1B16]/95 backdrop-blur-xl border border-[#EEDCC6]/30 text-[#F4E8D1] shadow-2xl hover:border-[#EEDCC6] transition-all group"
      >
        <div className={`p-1.5 rounded-full ${isPlaying ? 'bg-brand-gradient text-[#2A1B16]' : 'bg-[#3C2A21] text-[#EEDCC6]'}`}>
          <Waves className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
        </div>
        <span className="text-xs font-mono font-bold tracking-wider text-[#EEDCC6] uppercase">
          {isPlaying ? 'SOUNDSCAPE LIVE' : 'SENSORY ASMR'}
        </span>
        <div className="flex items-end space-x-0.5 h-3.5">
          {[6, 12, 8, 14].map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [4, h, 6] : 4 }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
              className="w-0.5 bg-[#EEDCC6] rounded-full"
            />
          ))}
        </div>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#EEDCC6]/70" /> : <ChevronUp className="w-3.5 h-3.5 text-[#EEDCC6]/70" />}
      </motion.button>
    </div>
  );
};

export default SensoryAudioPlayer;
