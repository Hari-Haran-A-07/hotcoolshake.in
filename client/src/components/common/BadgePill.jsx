import React from 'react';

const BADGE_PRESETS = {
  vegan: {
    label: 'Vegan',
    icon: '🌱',
    styles: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
  },
  organic: {
    label: '100% Organic',
    icon: '🌿',
    styles: 'bg-green-500/10 text-green-300 border-green-500/30'
  },
  fairtrade: {
    label: 'Fair Trade Certified',
    icon: '🤝',
    styles: 'bg-blue-500/10 text-blue-300 border-blue-500/30'
  },
  sugarfree: {
    label: 'Zero Sugar',
    icon: '✨',
    styles: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  },
  chefChoice: {
    label: "Master Barista's Pick",
    icon: '⭐',
    styles: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  seasonal: {
    label: 'Limited Edition',
    icon: '🔥',
    styles: 'bg-rose-500/10 text-rose-300 border-rose-500/30'
  }
};

/**
 * Reusable badge pill for tags, dietary labels, and seasonal highlights
 * @param {{
 *   type?: keyof typeof BADGE_PRESETS,
 *   label?: string,
 *   icon?: string,
 *   className?: string
 * }} props
 */
export default function BadgePill({ type, label, icon, className = '' }) {
  const preset = type ? BADGE_PRESETS[type] : null;
  const displayLabel = label || (preset && preset.label) || '';
  const displayIcon = icon || (preset && preset.icon) || '';
  const styles = preset ? preset.styles : 'bg-white/10 text-neutral-300 border-white/20';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md transition-transform hover:scale-105 ${styles} ${className}`}
    >
      {displayIcon && <span className="text-sm leading-none">{displayIcon}</span>}
      <span>{displayLabel}</span>
    </span>
  );
}
