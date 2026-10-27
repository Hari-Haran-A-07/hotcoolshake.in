import React, { useState } from 'react';
import { isValidEmail } from '../../utils/validation';

/**
 * Newsletter subscription modal with reward perk incentive
 * @param {{ isOpen: boolean, onClose: () => void }} props
 */
export default function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setMessage('Welcome to the Secret Society! Your 15% voucher: BREWVIBE15');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 bg-gradient-to-b from-stone-900 to-black border border-amber-500/30 rounded-3xl shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="text-center space-y-3">
          <span className="text-3xl">☕</span>
          <h3 className="text-2xl font-serif font-bold text-amber-300">Join the Coffee Club</h3>
          <p className="text-sm text-stone-300">
            Get exclusive secret menu drops, early tastings, and a 15% welcome voucher on your next brew.
          </p>

          {status === 'success' ? (
            <div className="p-4 mt-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 text-sm">
              <p className="font-semibold">{message}</p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Start Brewing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-amber-400 text-sm"
              />

              {status === 'error' && (
                <p className="text-xs text-rose-400 text-left">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Claim 15% Voucher'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
