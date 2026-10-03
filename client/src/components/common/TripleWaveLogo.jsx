import React from 'react';
import { Link } from 'react-router-dom';

export const TripleWaveEmblem = ({ size = 42, className = '', animate = false }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`w-full h-full ${animate ? 'hover:scale-105 transition-transform duration-500' : ''}`}
      >
        <defs>
          {/* Ribbon 1: HOT Steam Gradient (Warm Bronze -> Light Bronze) */}
          <linearGradient id="steamGradientHCS" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8783E" />
            <stop offset="60%" stopColor="#D6A06A" />
            <stop offset="100%" stopColor="#F7FAF9" />
          </linearGradient>

          {/* Ribbon 2: COOL Ice Crystal Gradient (Deep Teal -> Ice Teal) */}
          <linearGradient id="iceGradientHCS" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#168C8A" />
            <stop offset="60%" stopColor="#67D9D0" />
            <stop offset="100%" stopColor="#F7FAF9" />
          </linearGradient>

          {/* Ribbon 3: SHAKE Vortex Gradient (Bronze -> Light Bronze -> Ice Teal) */}
          <linearGradient id="vortexGradientHCS" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#B8783E" />
            <stop offset="50%" stopColor="#D6A06A" />
            <stop offset="100%" stopColor="#67D9D0" />
          </linearGradient>

          {/* Badge Radial Base */}
          <radialGradient id="badgeRadialHCS" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B2538" />
            <stop offset="100%" stopColor="#071A2B" />
          </radialGradient>
        </defs>

        {/* Outer Circular Geometric Badge */}
        <circle cx="50" cy="50" r="46" fill="url(#badgeRadialHCS)" stroke="#B8783E" strokeWidth="2" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#67D9D0" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />

        {/* Ribbon 01 — HOT: Rising Steam (Smooth, curved, fluid rising ribbon) */}
        <path
          d="M 38 72 C 32 60, 36 48, 48 42 C 58 36, 56 26, 48 18 C 56 22, 64 32, 54 44 C 44 54, 46 64, 52 70 Z"
          fill="url(#steamGradientHCS)"
          opacity="0.95"
        />

        {/* Ribbon 02 — COOL: Angular Ice Crystal (Sharp, geometric, crystalline form) */}
        <path
          d="M 50 18 L 70 32 L 64 56 L 48 42 L 60 34 Z"
          fill="url(#iceGradientHCS)"
          opacity="0.95"
        />

        {/* Ribbon 03 — SHAKE: Vortex Motion (Circular, dynamic blending spiral) */}
        <path
          d="M 30 38 C 38 28, 62 28, 70 44 C 76 56, 64 74, 46 76 C 32 78, 22 62, 28 50 C 32 42, 44 40, 50 46 C 42 48, 36 54, 38 62 C 42 68, 56 66, 60 56 C 64 46, 48 38, 36 44 Z"
          fill="url(#vortexGradientHCS)"
          opacity="0.92"
        />

        {/* Focal Fusion Center: Micro Crystal Dot */}
        <circle cx="50" cy="48" r="3.2" fill="#F7FAF9" stroke="#67D9D0" strokeWidth="1" />
      </svg>
    </div>
  );
};

export const TripleWaveLogo = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  showEndorsement = true,
  className = '',
}) => {
  const emblemSizes = {
    sm: 32,
    md: 44,
    lg: 56,
    xl: 72,
  };

  const emblemSize = emblemSizes[size] || 44;

  if (variant === 'icon-only') {
    return (
      <Link to="/" className={`inline-flex items-center group ${className}`} aria-label="HOT COOL SHAKE Home">
        <TripleWaveEmblem size={emblemSize} animate />
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to="/" className={`inline-flex items-center space-x-2.5 group ${className}`} aria-label="HOT COOL SHAKE Home">
        <TripleWaveEmblem size={emblemSize} animate />
        <div className="flex flex-col">
          <span className="font-display font-black tracking-tight text-sm leading-none text-[#F7FAF9] group-hover:text-[#67D9D0] transition-colors">
            HOT COOL SHAKE
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/" className={`inline-flex items-center space-x-3.5 group ${className}`} aria-label="HOT COOL SHAKE Home">
      <TripleWaveEmblem size={emblemSize} animate />
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5">
          <span className="font-display font-black tracking-widest text-base sm:text-lg leading-tight uppercase text-[#F7FAF9] group-hover:text-[#67D9D0] transition-colors">
            HOT COOL SHAKE
          </span>
        </div>
        
        {showEndorsement && (
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="text-[8.5px] font-mono tracking-widest uppercase font-semibold text-[#D6A06A]/85">
              POWERED BY IBM DESIGN
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TripleWaveLogo;
