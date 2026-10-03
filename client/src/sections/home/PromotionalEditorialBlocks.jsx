import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { ArrowRight, Flame, Snowflake, Sparkles } from 'lucide-react';

export const PromotionalEditorialBlocks = () => {
  const { startPageTransition } = usePageLoader();

  const promoBlocks = [
    {
      id: 'signature',
      tag: 'NEW SIGNATURE COFFEE',
      tagIcon: Sparkles,
      headline: 'Meet your next coffee obsession.',
      description:
        'Layered single-origin espresso with whipped velvet crema, infused with Madagascar bourbon vanilla and smoked Brittany sea salt caramel, sealed in our signature thermal vessel.',
      ctaText: 'EXPLORE CREATION',
      ctaPath: '/menu?category=signature-drinks',
      ctaTitle: 'SIGNATURE CREATIONS',
      theme: 'bronze',
      bgColor: 'bg-[#0B2538]',
      textColor: 'text-[#F7FAF9]',
      accentColor: 'text-[#D6A06A]',
      buttonBg: 'bg-brand-gradient text-[#071A2B]',
      borderStyle: 'border-[#B8783E]/40',
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Signature Coffee',
      imagePosition: 'right',
      badge: 'LIMITED RESERVE',
    },
    {
      id: 'cool',
      tag: 'COOL CRYO COLLECTION',
      tagIcon: Snowflake,
      headline: 'Cold-crafted for every moment.',
      description:
        'Sub-zero nitrogen cold brews, iced pistachio clouds, and velvety espresso shakes locked in our double-wall cryogenic flasks at an exact 04°C.',
      ctaText: 'DISCOVER COOL',
      ctaPath: '/menu?category=cool-coffee',
      ctaTitle: 'COOL COLLECTION',
      theme: 'teal',
      bgColor: 'bg-[#071A2B]',
      textColor: 'text-[#F7FAF9]',
      accentColor: 'text-[#67D9D0]',
      buttonBg: 'bg-[#67D9D0] hover:bg-[#67D9D0]/90 text-[#071A2B]',
      borderStyle: 'border-[#67D9D0]/40',
      image:
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Cool Collection',
      imagePosition: 'left',
      badge: '04°C NITRO CHILL',
    },
    {
      id: 'hot',
      tag: 'HOT THERMAL COLLECTION',
      tagIcon: Flame,
      headline: 'Slow down. Sip something exceptional.',
      description:
        'High-elevation volcanic roasts extracted at 11 bars of pressure and thermal-bloomed at 68°C to release uncompromised cocoa, honey, and spice aromatics.',
      ctaText: 'EXPLORE HOT',
      ctaPath: '/menu?category=hot-coffee',
      ctaTitle: 'HOT COLLECTION',
      theme: 'warm',
      bgColor: 'bg-[#0B2538]',
      textColor: 'text-[#F7FAF9]',
      accentColor: 'text-[#D6A06A]',
      buttonBg: 'bg-[#B8783E] hover:bg-[#D6A06A] text-[#071A2B]',
      borderStyle: 'border-[#B8783E]/40',
      image:
        'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Hot Collection',
      imagePosition: 'right',
      badge: '68°C THERMAL BLOOM',
    },
  ];

  return (
    <section className="space-y-12 sm:space-y-16 py-12 bg-[#071A2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {promoBlocks.map((block, idx) => {
          const TagIcon = block.tagIcon;
          const isImageLeft = block.imagePosition === 'left';

          return (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className={`rounded-[40px] overflow-hidden ${block.bgColor} ${block.textColor} shadow-2xl border-2 ${block.borderStyle} grid grid-cols-1 lg:grid-cols-12 items-center`}
            >
              {/* Image Section */}
              <div
                className={`lg:col-span-6 relative h-80 sm:h-96 lg:h-[480px] overflow-hidden ${
                  isImageLeft ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={block.image}
                  alt={block.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B]/80 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-md bg-[#071A2B]/90 text-[#F7FAF9] border border-white/20">
                    {block.badge}
                  </span>
                </div>
              </div>

              {/* Text & Editorial CTA Section */}
              <div
                className={`lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6 ${
                  isImageLeft ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase font-bold px-3.5 py-1.5 rounded-full border border-white/15 bg-[#071A2B]/80">
                  <TagIcon className="w-3.5 h-3.5 text-[#67D9D0]" />
                  <span>{block.tag}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase leading-tight text-[#F7FAF9]">
                  {block.headline}
                </h3>

                <p className="text-sm sm:text-base font-sans leading-relaxed text-[#A8B0B4]">
                  {block.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => startPageTransition(block.ctaPath, block.ctaTitle)}
                    className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all duration-300 transform hover:-translate-y-1 ${block.buttonBg}`}
                  >
                    <span>{block.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
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
