import React from 'react';
import { motion } from 'framer-motion';
import { usePageLoader } from '../../context/LoadingContext';
import { Award, Gift, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const RewardsSection = () => {
  const { startPageTransition } = usePageLoader();

  const tiers = [
    {
      name: 'STARTER',
      points: '0 - 499 PTS',
      perks: ['Earn 10 Shake Points per $1 spent', 'Digital Order Ahead access', 'Birthday beverage gift'],
    },
    {
      name: 'BREWER',
      points: '500 - 1,499 PTS',
      perks: ['Free botanical flavor customization', 'Exclusive seasonal tasting previews', 'Double points bonus days'],
      highlight: false,
    },
    {
      name: 'CREATOR',
      points: '1,500 - 2,999 PTS',
      perks: ['Complimentary vessel upgrades', 'Free monthly cold foam float', 'VIP roastery event invitations'],
      highlight: true,
    },
    {
      name: 'SIGNATURE',
      points: '3,000+ PTS',
      perks: ['Unlimited customization lab access', 'Private harvest micro-lot shipments', 'Dedicated concierge dispatch'],
    },
  ];

  return (
    <section className="py-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden border-t border-[#EEDCC6]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
            <Award className="w-4 h-4 text-[#EEDCC6]" />
            <span>HOT COOL REWARDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            EARN <span className="text-brand-gradient">SHAKE POINTS.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Every sip unlocks elevated privileges, bespoke bottle customizations, and private harvest lots.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? 'bg-[#3C2A21] border-2 border-[#EEDCC6] shadow-cream-glow transform lg:-translate-y-2'
                  : 'bg-[#3C2A21]/70 border border-[#EEDCC6]/20 hover:border-[#EEDCC6]/50 shadow-coffee-card'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase">
                    TIER 0{idx + 1}
                  </span>
                  {tier.highlight && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-gradient text-[#2A1B16] text-[9px] font-mono font-black uppercase">
                      MOST POPULAR
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                  {tier.name}
                </h3>
                <div className="text-xs font-mono font-bold text-[#EEDCC6] mt-1 mb-6">
                  {tier.points}
                </div>

                <ul className="space-y-2.5 text-xs text-[#EEDCC6]/80 font-sans">
                  {tier.perks.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#EEDCC6] flex-shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#2A1B16]">
                <button
                  onClick={() => startPageTransition('/rewards', 'HOT COOL REWARDS')}
                  className="w-full py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-[#EEDCC6]/30 hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#F4E8D1] transition-all"
                >
                  VIEW TIER DETAILS
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rewards Footer Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => startPageTransition('/rewards', 'HOT COOL REWARDS')}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs sm:text-sm font-black tracking-widest uppercase shadow-cream-glow hover:brightness-105 transition-all"
          >
            <span>JOIN REWARDS & CLAIM 250 PTS WELCOME BONUS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
