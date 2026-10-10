import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export const EditorialStoriesSection = () => {
  const { startPageTransition } = usePageLoader();

  const articles = [
    {
      id: 'sub-zero-science',
      category: 'TECHNOLOGY',
      title: 'The Thermodynamics of 04°C Cryo Flash Extraction',
      description: 'How rapid nitrogen pressure locking eliminates flavor oxidation without ice dilution.',
      date: 'OCTOBER 2026',
      readTime: '4 MIN READ',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'madagascar-sourcing',
      category: 'FLAVOR',
      title: 'Hunting Bourbon Vanilla Caviar in Sava, Madagascar',
      description: 'The meticulous hand-pollination process behind our flagship natural latte essence.',
      date: 'SEPTEMBER 2026',
      readTime: '6 MIN READ',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'circular-vessels',
      category: 'DESIGN',
      title: 'Ergonomic Geometry: Crafting the 100-Year Coffee Vessel',
      description: 'Inside the engineering behind our aerospace-grade titanium and double-wall borosilicate bottles.',
      date: 'SEPTEMBER 2026',
      readTime: '5 MIN READ',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30">
              <BookOpen className="w-3.5 h-3.5 text-[#EEDCC6]" />
              <span>EDITORIAL & JOURNAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
              STORIES FROM THE <span className="text-brand-gradient">ROASTERY.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans max-w-lg">
              Perspectives on global agronomy, sensory extraction, thermal design, and coffee culture.
            </p>
          </div>

          <button
            onClick={() => startPageTransition('/stories', 'EDITORIAL STORIES')}
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] hover:text-[#F4E8D1] uppercase group"
          >
            <span>VIEW ALL STORIES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => startPageTransition('/stories', art.title)}
              className="group bg-[#3C2A21]/80 hover:bg-[#3C2A21] rounded-[32px] overflow-hidden border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 shadow-coffee-card cursor-pointer flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#2A1B16]/90 text-[#EEDCC6] border border-[#EEDCC6]/30">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#EEDCC6]/60">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#F4E8D1] group-hover:text-[#EEDCC6] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#EEDCC6]/75 font-sans line-clamp-2 leading-relaxed">
                    {art.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center space-x-2 text-xs font-mono text-[#EEDCC6] font-bold group-hover:underline">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialStoriesSection;
