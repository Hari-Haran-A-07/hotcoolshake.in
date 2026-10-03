import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState('DEFAULT'); // 'DEFAULT' | 'LINK' | 'BUTTON' | 'PRODUCT' | 'IMAGE' | 'DRAG' | 'CLICK' | 'CREATE' | 'VIEW'
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    if (checkTouch()) {
      setIsTouchDevice(true);
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHovered(true);

      // Check hovered element
      const target = e.target;
      if (!target) return;

      const createBtn = target.closest('[data-cursor="create"]') || target.closest('a[href*="make-your-coffee"]') || (target.textContent && target.textContent.toUpperCase().includes('MAKE YOUR COFFEE'));
      const productCard = target.closest('[data-cursor="view"]') || target.closest('.product-card') || target.closest('[data-product-id]');
      const imageEl = target.closest('img') || target.closest('[data-cursor="image"]');
      const interactiveBtn = target.closest('button') || target.closest('[role="button"]');
      const interactiveLink = target.closest('a');

      if (createBtn) {
        setCursorState('CREATE');
      } else if (productCard) {
        setCursorState('VIEW');
      } else if (imageEl) {
        setCursorState('IMAGE');
      } else if (interactiveBtn) {
        setCursorState('BUTTON');
      } else if (interactiveLink) {
        setCursorState('LINK');
      } else {
        setCursorState('DEFAULT');
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseEnter = () => setIsHovered(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth trailing position loop
    let animId;
    let currX = -100;
    let currY = -100;

    const smoothTrail = () => {
      currX += (position.x - currX) * 0.18;
      currY += (position.y - currY) * 0.18;
      setTrailingPos({ x: currX, y: currY });
      animId = requestAnimationFrame(smoothTrail);
    };
    animId = requestAnimationFrame(smoothTrail);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y]);

  if (isTouchDevice || !isHovered) return null;

  const isSpecialLabel = cursorState === 'CREATE' || cursorState === 'VIEW';

  return (
    <>
      {/* Primary Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        animate={{
          scale: isClicked ? 0.7 : isSpecialLabel ? 0 : 1,
          opacity: isSpecialLabel ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#67D9D0] shadow-[0_0_10px_#67D9D0]" />
      </motion.div>

      {/* Trailing Outer Ring / Dynamic Badge */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
        animate={{
          width: isSpecialLabel ? 68 : cursorState === 'BUTTON' || cursorState === 'LINK' ? 46 : isClicked ? 52 : 32,
          height: isSpecialLabel ? 68 : cursorState === 'BUTTON' || cursorState === 'LINK' ? 46 : isClicked ? 52 : 32,
          backgroundColor: isSpecialLabel
            ? cursorState === 'CREATE'
              ? 'rgba(184, 120, 62, 0.92)'
              : 'rgba(103, 217, 208, 0.92)'
            : cursorState === 'BUTTON' || cursorState === 'LINK'
            ? 'rgba(103, 217, 208, 0.15)'
            : 'rgba(247, 250, 249, 0.05)',
          borderColor: isSpecialLabel
            ? 'transparent'
            : cursorState === 'BUTTON' || cursorState === 'LINK'
            ? '#67D9D0'
            : isClicked
            ? '#B8783E'
            : 'rgba(214, 160, 106, 0.4)',
          borderWidth: isSpecialLabel ? '0px' : '1.5px',
          backdropFilter: isSpecialLabel ? 'blur(4px)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {cursorState === 'CREATE' && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[10px] font-mono font-black tracking-widest text-[#071A2B] uppercase select-none"
          >
            CREATE
          </motion.span>
        )}
        {cursorState === 'VIEW' && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-[10px] font-mono font-black tracking-widest text-[#071A2B] uppercase select-none"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
