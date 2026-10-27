import React from 'react';

const ROAST_CONFIGS = {
  light: {
    label: 'Light Roast',
    bg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400'
  },
  medium: {
    label: 'Medium Roast',
    bg: 'bg-amber-600/15 text-amber-200 border-amber-600/40',
    indicator: 'bg-amber-600'
  },
  'medium-dark': {
    label: 'Medium Dark',
    bg: 'bg-yellow-700/20 text-yellow-200 border-yellow-700/40',
    indicator: 'bg-yellow-800'
  },
  dark: {
    label: 'Dark Roast',
    bg: 'bg-stone-800 text-stone-200 border-stone-600/50',
    indicator: 'bg-stone-500'
  },
  nitro: {
    label: 'Nitro Infused',
    bg: 'bg-cyan-950/30 text-cyan-300 border-cyan-500/40',
    indicator: 'bg-cyan-400 animate-pulse'
  }
};

/**
 * Visual pill badge displaying roast profile
 * @param {{ roastLevel: 'light'|'medium'|'medium-dark'|'dark'|'nitro', className?: string }} props
 */
export default function CoffeeRoastBadge({ roastLevel = 'medium', className = '' }) {
  const normKey = String(roastLevel || 'medium').toLowerCase().trim();
  const config = ROAST_CONFIGS[normKey] || ROAST_CONFIGS.medium;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${config.bg} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.indicator}`} />
      {config.label}
    </span>
  );
}
