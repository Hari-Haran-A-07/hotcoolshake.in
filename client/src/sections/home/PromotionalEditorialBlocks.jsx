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
        'Layered single-origin espresso with whipped velvet crema, infused with Madagascar bourbon vanilla and smoked Brittany sea salt caramel.',
      ctaText: 'EXPLORE NOW',
      ctaPath: '/menu?category=signature-drinks',
      ctaTitle: 'SIGNATURE CREATIONS',
      theme: 'dark', // #3C2A21 background
      bgColor: 'bg-[#3C2A21]',
      textColor: 'text-[#F4E8D1]',
      accentColor: 'text-[#EEDCC6]',
      buttonBg: 'bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16]',
      image:
        'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Signature Coffee',
      imagePosition: 'right',
      badge: 'LIMITED RESERVE',
    },
    {
      id: 'cool',
      tag: 'COOL COLLECTION',
      tagIcon: Snowflake,
      headline: 'Cold-crafted for every kind of day.',
      description:
        'Sub-zero nitrogen cold brews, iced pistachio clouds, and velvety espresso shakes locked in our double-wall cryogenic flasks at an exact 04°C.',
      ctaText: 'DISCOVER COOL',
      ctaPath: '/menu?category=cool-coffee',
      ctaTitle: 'COOL COLLECTION',
      theme: 'light', // #EEDCC6 background
      bgColor: 'bg-[#EEDCC6]',
      textColor: 'text-[#2A1B16]',
      accentColor: 'text-[#3C2A21]',
      buttonBg: 'bg-[#2A1B16] hover:bg-[#3C2A21] text-[#F4E8D1]',
      image:
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Cool Collection',
      imagePosition: 'left',
      badge: '04°C NITRO CHILL',
    },
    {
      id: 'hot',
      tag: 'HOT COLLECTION',
      tagIcon: Flame,
      headline: 'Slow down. Sip something exceptional.',
      description:
        'High-elevation volcanic roasts extracted at 9 bars of pressure and thermal-bloomed at 68°C to release uncompromised cocoa, honey, and spice aromatics.',
      ctaText: 'EXPLORE HOT',
      ctaPath: '/menu?category=hot-coffee',
      ctaTitle: 'HOT COLLECTION',
      theme: 'espresso', // #2A1B16 background
      bgColor: 'bg-[#2A1B16]',
      textColor: 'text-[#F4E8D1]',
      accentColor: 'text-[#EEDCC6]',
      buttonBg: 'bg-[#EEDCC6] hover:bg-[#F4E8D1] text-[#2A1B16]',
      image:
        'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
      imageAlt: 'HOT COOL SHAKE Hot Collection',
      imagePosition: 'right',
      badge: '68°C THERMAL BLOOM',
    },
  ];

  return (
    <section className="space-y-12 sm:space-y-16 py-8 bg-[#F4E8D1]">
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
              className={`rounded-[36px] overflow-hidden ${block.bgColor} ${block.textColor} shadow-2xl border border-[#3C2A21]/15 grid grid-cols-1 lg:grid-cols-12 items-center`}
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
                <div
                  className={`absolute inset-0 ${
                    block.theme === 'light'
                      ? 'bg-gradient-to-t from-[#EEDCC6]/40 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-[#2A1B16]/60 via-transparent to-transparent'
                  }`}
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase shadow-md ${
                      block.theme === 'light'
                        ? 'bg-[#2A1B16] text-[#F4E8D1]'
                        : 'bg-[#EEDCC6] text-[#2A1B16]'
                    }`}
                  >
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
                <div
                  className={`inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase font-bold px-3.5 py-1.5 rounded-full border ${
                    block.theme === 'light'
                      ? 'bg-[#F4E8D1] text-[#2A1B16] border-[#3C2A21]/20'
                      : 'bg-[#2A1B16] text-[#EEDCC6] border-[#EEDCC6]/20'
                  }`}
                >
                  <TagIcon className="w-3.5 h-3.5" />
                  <span>{block.tag}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight uppercase leading-tight">
                  {block.headline}
                </h3>

                <p className="text-sm sm:text-base font-sans leading-relaxed opacity-90">
                  {block.description}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => startPageTransition(block.ctaPath, block.ctaTitle)}
                    className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-coffee-glow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${block.buttonBg}`}
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
