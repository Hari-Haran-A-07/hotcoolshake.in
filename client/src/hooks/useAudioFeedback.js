import { useCallback } from 'react';

/**
 * Custom hook providing synthesized micro-audio feedback using Web Audio API
 */
export function useAudioFeedback() {
  const playTone = useCallback((frequency = 440, type = 'sine', duration = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy or not supported
    }
  }, []);

  const playClick = useCallback(() => playTone(600, 'sine', 0.05), [playTone]);
  const playSuccess = useCallback(() => {
    playTone(523.25, 'triangle', 0.08);
    setTimeout(() => playTone(659.25, 'triangle', 0.12), 70);
  }, [playTone]);

  return { playClick, playSuccess, playTone };
}

export default useAudioFeedback;
