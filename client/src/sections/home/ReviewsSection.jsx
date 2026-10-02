import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { Star, Quote, CheckCircle2, MessageSquarePlus, Sparkles } from 'lucide-react';

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    role: '',
    city: '',
    rating: 5,
    comment: '',
    favoriteCreation: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await api.getReviews();
        if (res.success) {
          setReviews(res.reviews);
        }
      } catch (e) {
        console.warn('Reviews load error:', e);
      }
    };
    loadReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await api.submitReview(formData);
      if (res.success) {
        setReviews([res.review, ...reviews]);
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setIsSubmitOpen(false);
          setFormData({
            authorName: '',
            role: '',
            city: '',
            rating: 5,
            comment: '',
            favoriteCreation: '',
          });
        }, 2000);
      }
    } catch (e) {
      console.error('Submit review error:', e);
    }
  };

  return (
    <section className="py-24 bg-[#3C2A21] text-[#F4E8D1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/20">
              <Star className="w-3.5 h-3.5 fill-[#EEDCC6]" />
              <span>CONNOISSEUR TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
              CRAFTED FOR THE EXACTING PALATE.
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans max-w-lg">
              Hear from global connoisseurs, creators, and daily alchemists who design their bespoke coffee with HOT COOL SHAKE.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitOpen(!isSubmitOpen)}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#2A1B16] hover:bg-[#EEDCC6] text-[#F4E8D1] hover:text-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-bold tracking-widest uppercase transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>SUBMIT YOUR CREATION REVIEW</span>
          </button>
        </div>

        {/* Submit Review Form Box */}
        {isSubmitOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-12 p-8 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 shadow-2xl"
          >
            <h3 className="font-display font-bold text-xl text-[#F4E8D1] mb-4">
              SUBMIT A TASTING EXPERIENCE
            </h3>

            {submitSuccess ? (
              <div className="p-4 rounded-2xl bg-[#3C2A21] border border-emerald-500/40 text-[#EEDCC6] flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-sm">
                  Thank you! Your review has been broadcasted to the Connoisseur Circle.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    placeholder="Marcus Sterling"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New York, London, Tokyo..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Favorite Custom Blend
                  </label>
                  <input
                    type="text"
                    value={formData.favoriteCreation}
                    onChange={(e) => setFormData({ ...formData, favoriteCreation: e.target.value })}
                    placeholder="e.g. Signature Flask + Pistachio Nitro Chill"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs font-mono text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  >
                    <option value={5}>★★★★★ (5 Stars - Flawless Alchemy)</option>
                    <option value={4}>★★★★☆ (4 Stars - Exceptional)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] font-mono text-[#EEDCC6]/80 uppercase block mb-1">
                    Your Review & Tasting Notes *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Describe the aroma, temperature retention, and flavor balance..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/25 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16] font-mono text-xs font-bold tracking-widest uppercase shadow-coffee-glow transition-all"
                  >
                    PUBLISH REVIEW
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-[32px] bg-[#2A1B16] border border-[#EEDCC6]/20 shadow-card-lux flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#EEDCC6]">
                    {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-[#EEDCC6]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#EEDCC6]/20" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#EEDCC6]/85 font-sans leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {/* Favorite Blend Tag */}
                {rev.favoriteCreation && (
                  <div className="p-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/15">
                    <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">
                      FAVORITE ALCHEMY:
                    </span>
                    <span className="text-xs font-mono font-bold text-[#F4E8D1]">
                      {rev.favoriteCreation}
                    </span>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#EEDCC6]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-[#F4E8D1]">
                    {rev.authorName}
                  </h4>
                  <span className="text-[11px] font-mono text-[#EEDCC6]/70">
                    {rev.city} • {rev.role || 'Verified Buyer'}
                  </span>
                </div>

                <div className="p-1.5 rounded-full bg-[#3C2A21] text-emerald-400" title="Verified Customer">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
