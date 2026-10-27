import React from 'react';

/**
 * Shimmering skeleton loader placeholder
 * @param {{
 *   variant?: 'text'|'card'|'avatar'|'button'|'rect',
 *   width?: string|number,
 *   height?: string|number,
 *   className?: string
 * }} props
 */
export default function SkeletonLoader({
  variant = 'text',
  width,
  height,
  className = ''
}) {
  const baseClasses = 'animate-pulse bg-white/5 rounded';

  const variantClasses = {
    text: 'h-4 w-full rounded',
    card: 'h-64 w-full rounded-2xl border border-white/5',
    avatar: 'w-10 h-10 rounded-full',
    button: 'h-10 w-28 rounded-xl',
    rect: 'rounded-xl'
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
