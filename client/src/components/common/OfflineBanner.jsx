import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

export default function OfflineBanner() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#3C2A21]/95 text-[#F4E8D1] border border-[#EEDCC6]/30 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 transition-all duration-300 animate-bounce"
    >
      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
        <WifiOff className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-wider uppercase text-[#EEDCC6]">Network Disconnected</p>
        <p className="text-[11px] text-[#F4E8D1]/80">Operating in offline mode. Cached coffee lab remains accessible.</p>
      </div>
    </div>
  );
}
