import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, X, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const CustomerFeedbackModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [npsScore, setNpsScore] = useState(10);
  const [aromaRating, setAromaRating] = useState(5);
  const [flavorRating, setFlavorRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('hcs_open_feedback', handleOpen);
    window.addEventListener('hcs_close_modals', handleClose);

    return () => {
      window.removeEventListener('hcs_open_feedback', handleOpen);
      window.removeEventListener('hcs_close_modals', handleClose);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          npsScore,
          aromaRating,
          flavorRating,
          comment,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null); // Graceful fallback if backend offline
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
        setComment('');
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#0F0B08]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            className="relative w-full max-w-lg rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/25 p-6 sm:p-8 shadow-2xl z-10 text-[#F4E8D1]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/15">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-[#3C2A21] border border-[#EEDCC6]/20">
                  <MessageSquare className="w-5 h-5 text-[#C49A45]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F4E8D1]">
                    Tasting & Sensory Feedback
                  </h3>
                  <p className="text-xs font-mono text-[#EEDCC6]/60">Share your palate experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#EEDCC6]/60 hover:text-[#F4E8D1] hover:bg-[#3C2A21] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-serif text-xl font-bold text-[#F4E8D1]">Thank You, Connoisseur!</h4>
                <p className="text-xs font-mono text-[#EEDCC6]/70">
                  Your sensory ratings refine our master extraction curve.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                {/* NPS Rating */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#EEDCC6]/80 mb-2">
                    Likelihood to recommend (0 - 10 NPS)
                  </label>
                  <div className="grid grid-cols-11 gap-1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNpsScore(num)}
                        className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                          npsScore === num
                            ? 'bg-[#C49A45] border-[#EEDCC6] text-[#2A1B16] scale-105 shadow-md'
                            : 'bg-[#3C2A21]/50 border-[#EEDCC6]/15 text-[#EEDCC6]/70 hover:bg-[#3C2A21]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Aroma & Flavor Star Sliders */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-[#3C2A21]/30 border border-[#EEDCC6]/10">
                    <span className="block text-xs font-mono text-[#EEDCC6]/70 mb-1.5">Aroma Clarity</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => setAromaRating(star)}
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= aromaRating ? 'text-[#C49A45] fill-[#C49A45]' : 'text-[#EEDCC6]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#3C2A21]/30 border border-[#EEDCC6]/10">
                    <span className="block text-xs font-mono text-[#EEDCC6]/70 mb-1.5">Flavor Complexity</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          onClick={() => setFlavorRating(star)}
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= flavorRating ? 'text-[#C49A45] fill-[#C49A45]' : 'text-[#EEDCC6]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment Box */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#EEDCC6]/80 mb-2">
                    Tasting Notes & Observations
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the crema, body, temperature, or suggestions for our master baristas..."
                    className="w-full px-4 py-3 rounded-xl bg-[#1C120C]/80 border border-[#EEDCC6]/20 text-[#F4E8D1] placeholder-[#EEDCC6]/30 text-xs focus:outline-none focus:border-[#C49A45] resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#C49A45] to-[#EEDCC6] text-[#2A1B16] font-mono font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting Notes...' : 'Submit Tasting Review'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomerFeedbackModal;
