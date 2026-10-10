import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { Sparkles, ShieldCheck, Wifi, Award, Crown, Zap } from 'lucide-react';

export const HolographicCard = ({
  tier = 'SOVEREIGN_CIRCLE',
  userName = 'ALEXANDER STERLING',
  memberNumber = 'HCS-0001-999',
  points = '124,500',
  tierName = '$1B SOVEREIGN CIRCLE',
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isNfcActive, setIsNfcActive] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  const simulateNfcTap = () => {
    setIsNfcActive(true);
    setTimeout(() => setIsNfcActive(false), 2000);
  };

  return (
    <div className="perspective-1000 flex flex-col items-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={simulateNfcTap}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
        className="relative w-80 sm:w-96 h-52 sm:h-60 rounded-[28px] p-6 text-[#F4E8D1] shadow-2xl cursor-pointer select-none overflow-hidden border-2 border-[#EEDCC6]/40 bg-gradient-to-br from-[#2A1B16] via-[#3C2A21] to-[#1E120E] group"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Rainbow Holographic Iridescent Glare */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 235, 205, 0.9) 0%, rgba(212, 185, 150, 0.4) 30%, rgba(60, 42, 33, 0) 70%)`,
          }}
        />

        {/* Micro-mesh luxury laser texture background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Diagonal metallic brushed shimmer strip */}
        <div className="absolute -inset-x-20 top-0 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-25 pointer-events-none group-hover:translate-x-full transition-transform duration-1000" />

        {/* Card Content Top Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/50 shadow-md">
              <TripleWaveEmblem size={24} />
            </div>
            <div>
              <span className="font-display font-black text-xs tracking-widest text-[#F4E8D1] block">
                HOT COOL SHAKE
              </span>
              <span className="text-[8px] font-mono text-[#EEDCC6] font-bold tracking-widest">
                QUANTUM VAULT CARD
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 text-[#EEDCC6]">
            <Wifi className={`w-4 h-4 ${isNfcActive ? 'text-green-400 animate-ping' : 'opacity-80'}`} />
            <Crown className="w-4 h-4 text-[#EEDCC6]" />
          </div>
        </div>

        {/* Chip & Tier Badge */}
        <div className="relative z-10 mt-5 flex items-center justify-between">
          {/* Smart Card EMV Golden Chip */}
          <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-[#FFE4A0] via-[#D4B996] to-[#996515] border border-[#EEDCC6] shadow-md relative overflow-hidden flex items-center justify-center p-1">
            <div className="w-full h-full border border-black/20 rounded-sm grid grid-cols-2 grid-rows-2" />
          </div>

          <div className="px-3 py-1 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/60 shadow-cream-glow">
            <span className="text-[9px] font-mono font-black text-[#EEDCC6] tracking-widest uppercase">
              {tierName}
            </span>
          </div>
        </div>

        {/* Member Name & Points Bottom */}
        <div className="relative z-10 mt-6 flex items-end justify-between">
          <div>
            <div className="text-[8px] font-mono text-[#EEDCC6]/70 uppercase tracking-widest">
              BIOMETRIC HOLDER
            </div>
            <div className="font-display font-black text-sm tracking-wider text-[#F4E8D1]">
              {userName}
            </div>
            <div className="text-[9px] font-mono text-[#EEDCC6]/90 tracking-widest mt-0.5">
              {memberNumber}
            </div>
          </div>

          <div className="text-right">
            <div className="text-[8px] font-mono text-[#EEDCC6]/70 uppercase tracking-widest">
              SHAKE POINTS
            </div>
            <div className="font-mono font-black text-base text-[#EEDCC6]">
              {points} PTS
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tap NFC Hint */}
      <div className="mt-3 flex items-center space-x-2 text-[10px] font-mono text-[#EEDCC6]/70">
        <Sparkles className="w-3 h-3 text-[#EEDCC6]" />
        <span>Hover for 3D gyro tilt • Click to simulate NFC terminal tap</span>
      </div>
    </div>
  );
};

export default HolographicCard;
