import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { api } from '../../services/api';
import { ArrowRight, Flame, Snowflake, Sparkles } from 'lucide-react';

export const PromotionalEditorialBlocks = () => {
  const { startPageTransition } = usePageLoader();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const res = await api.getCampaigns();
        if (res.success && res.campaigns?.length > 0) {
          setCampaigns(res.campaigns);
        }
      } catch (err) {
        console.warn('Campaign fetch fallback', err);
      }
    };
    loadCampaigns();
  }, []);

  // Default campaign blocks if API returns empty
  const defaultBlocks = [
    {
      _id: 'season-creation',
      badge: 'FEATURED CREATION OF THE SEASON',
      title: 'THE CREATION OF THE SEASON',
      headline: 'Smoked Sea Salt Caramel & Cryo Cloud',
      description:
        'Harvest-grade micro-lot espresso blended with raw Madagascar vanilla bean, French Brittany sea salt caramel, and crowned with a sub-zero cryo cold foam.',
      ctaText: 'ORDER NOW',
      ctaLink: '/menu',
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
      imagePosition: 'right',
      icon: Sparkles,
    },
    {
      _id: 'cool-series',
      badge: '04°C NITRO CHILL',
      title: 'COOL CRYO COLLECTION',
      headline: 'Cold-crafted for every moment.',
      description:
        'Sub-zero nitrogen cold brews, iced pistachio clouds, and velvety espresso shakes locked in our double-wall cryogenic flasks at an exact 04°C with zero ice dilution.',
      ctaText: 'EXPLORE COOL',
      ctaLink: '/menu',
      image:
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
      imagePosition: 'left',
      icon: Snowflake,
    },
    {
      _id: 'hot-series',
      badge: '68°C THERMAL EXTRACTION',
      title: 'HOT THERMAL COLLECTION',
      headline: 'Slow down. Sip something exceptional.',
      description:
        'High-elevation volcanic roasts extracted at 11 bars of pressure and thermal-bloomed at 68°C to release uncompromised cocoa, honey, and warm spice aromatics.',
      ctaText: 'EXPLORE HOT',
      ctaLink: '/menu',
      image:
        'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
      imagePosition: 'right',
      icon: Flame,
    },
  ];

  const displayBlocks = campaigns.length > 0 ? campaigns : defaultBlocks;

  return (
    <section className="space-y-12 sm:space-y-16 py-12 bg-[#2A1B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {displayBlocks.map((block, idx) => {
          const isImageLeft = block.imagePosition === 'left' || idx % 2 === 1;
          const Icon = block.icon || Sparkles;

          return (
            <motion.div
              key={block._id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="rounded-[40px] overflow-hidden bg-[#3C2A21] text-[#F4E8D1] shadow-coffee-card border-2 border-[#EEDCC6]/20 grid grid-cols-1 lg:grid-cols-12 items-center"
            >
              {/* Image Section */}
              <div
                className={`lg:col-span-6 relative h-80 sm:h-96 lg:h-[480px] overflow-hidden ${
                  isImageLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={block.image}
                  alt={block.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B16]/80 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-md bg-[#2A1B16]/90 text-[#F4E8D1] border border-[#EEDCC6]/30">
                    {block.badge || 'SPECIALTY COLLECTION'}
                  </span>
                </div>
              </div>

              {/* Text & Editorial CTA Section */}
              <div
                className={`lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6 ${
                  isImageLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase font-bold px-3.5 py-1.5 rounded-full border border-[#EEDCC6]/20 bg-[#2A1B16]/80 text-[#EEDCC6]">
                  <Icon className="w-3.5 h-3.5 text-[#EEDCC6]" />
                  <span>{block.title || 'FEATURED CREATION'}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase leading-tight text-[#F4E8D1]">
                  {block.headline}
                </h3>

                <p className="text-sm sm:text-base font-sans leading-relaxed text-[#EEDCC6]/85">
                  {block.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => startPageTransition(block.ctaLink || '/menu', block.title || 'EXPLORE')}
                    className="inline-flex items-center space-x-3 px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all duration-300 transform hover:-translate-y-1 bg-brand-gradient text-[#2A1B16]"
                  >
                    <span>{block.ctaText || 'ORDER NOW'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => startPageTransition('/menu', 'EXPLORE MENU')}
                    className="inline-flex items-center space-x-2 px-6 py-4 rounded-full font-mono text-xs font-bold tracking-widest uppercase border border-[#EEDCC6]/30 hover:border-[#EEDCC6] text-[#F4E8D1] transition-colors"
                  >
                    <span>EXPLORE</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PromotionalEditorialBlocks;
