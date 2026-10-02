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
        className={`w-full h-full ${animate ? 'hover:rotate-12 transition-transform duration-500' : ''}`}
      >
        <defs>
          <linearGradient id="steamGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3C2A21" />
            <stop offset="50%" stopColor="#EEDCC6" />
            <stop offset="100%" stopColor="#F4E8D1" />
          </linearGradient>
          <linearGradient id="iceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4E8D1" />
            <stop offset="60%" stopColor="#EEDCC6" />
            <stop offset="100%" stopColor="#3C2A21" />
          </linearGradient>
          <linearGradient id="vortexGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2A1B16" />
            <stop offset="50%" stopColor="#3C2A21" />
            <stop offset="100%" stopColor="#EEDCC6" />
          </linearGradient>
        </defs>

        {/* Outer Circular Badge */}
        <circle cx="50" cy="50" r="46" fill="#2A1B16" stroke="#EEDCC6" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#3C2A21" strokeWidth="1" strokeDasharray="3,3" />

        {/* Ribbon 1: Rising Steam (HOT) */}
        <path
          d="M 38 72 C 34 62, 36 50, 48 44 C 58 38, 54 28, 48 20 C 56 24, 62 34, 54 44 C 44 54, 46 64, 52 70 Z"
          fill="url(#steamGradient)"
          opacity="0.95"
        />

        {/* Ribbon 2: Ice Crystal (COOL) */}
        <path
          d="M 50 20 L 68 34 L 62 56 L 48 44 L 58 36 Z"
          fill="url(#iceGradient)"
          opacity="0.9"
        />

        {/* Ribbon 3: Vortex Wave (SHAKE) */}
        <path
          d="M 32 40 C 40 32, 60 30, 68 46 C 74 58, 62 74, 46 76 C 34 78, 24 64, 30 52 C 34 44, 44 42, 50 48 C 42 50, 36 56, 38 64 C 42 70, 56 68, 60 58 C 64 48, 50 40, 38 46 Z"
          fill="url(#vortexGradient)"
        />

        {/* Focal Fusion Center */}
        <circle cx="50" cy="48" r="3.5" fill="#F4E8D1" stroke="#2A1B16" strokeWidth="1" />
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
    md: 42,
    lg: 56,
    xl: 72,
  };

  const emblemSize = emblemSizes[size] || 42;
  const isDark = theme === 'dark';

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
          <span className={`font-display font-extrabold tracking-tight text-sm leading-none ${isDark ? 'text-[#F4E8D1]' : 'text-[#2A1B16]'}`}>
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
          <span className={`font-display font-black tracking-widest text-base sm:text-lg leading-tight uppercase ${isDark ? 'text-[#F4E8D1]' : 'text-[#2A1B16]'}`}>
            HOT COOL SHAKE
          </span>
        </div>
        
        {showEndorsement && (
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className={`text-[9px] font-mono tracking-widest uppercase font-semibold opacity-75 ${isDark ? 'text-[#EEDCC6]' : 'text-[#3C2A21]'}`}>
              POWERED BY IBM DESIGN
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TripleWaveLogo;
