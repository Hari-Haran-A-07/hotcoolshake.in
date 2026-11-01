import React, { useState } from 'react';

/**
 * Interactive or read-only star rating component with customizable styling
 * @param {{
 *   value?: number,
 *   maxStars?: number,
 *   interactive?: boolean,
 *   onChange?: (rating: number) => void,
 *   size?: 'sm' | 'md' | 'lg',
 *   showScore?: boolean,
 *   totalReviews?: number,
 *   className?: string
 * }} props
 */
export default function RatingStars({
  value = 5,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md',
  showScore = false,
  totalReviews,
  className = ''
}) {
  const [hoverValue, setHoverValue] = useState(null);

  const activeValue = hoverValue !== null ? hoverValue : value;

  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };

  const handleMouseEnter = (index) => {
    if (interactive) setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (interactive) setHoverValue(null);
  };

  const handleClick = (index) => {
    if (interactive && onChange) {
      onChange(index);
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={`Rating: ${value} out of ${maxStars} stars`}
    >
      <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxStars }, (_, i) => {
          const starIndex = i + 1;
          const isFilled = activeValue >= starIndex;
          const isHalf = !isFilled && activeValue >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(starIndex)}
              onMouseEnter={() => handleMouseEnter(starIndex)}
              className={`transition-transform duration-150 focus:outline-none ${
                interactive
                  ? 'cursor-pointer hover:scale-110 focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm'
                  : 'cursor-default'
              }`}
              aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
            >
              <svg
                className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} ${
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-neutral-600 fill-transparent stroke-neutral-500'
                } transition-colors`}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className={`font-mono font-medium text-amber-300 ml-1 ${sizeClasses[size].split(' ')[2]}`}>
          {Number(value).toFixed(1)}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-neutral-400 text-xs font-sans">
          ({totalReviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
