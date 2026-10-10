import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import { HolographicCard } from '../components/common/HolographicCard';
import {
  Sparkles,
  Award,
  Gift,
  Zap,
  ArrowRight,
  ShieldCheck,
  Flame,
  Snowflake,
  RotateCw,
  Coffee,
  CheckCircle2,
  Lock,
  ChevronRight,
  Copy,
} from 'lucide-react';

export const Rewards = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('TIERS'); // 'TIERS' | 'REDEEM' | 'EARN' | 'HISTORY'
  const [rewardsData, setRewardsData] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await api.getRewards();
        if (res.success) {
          setRewardsData(res);
        }
      } catch (err) {
        console.warn('Rewards data fetch fallback handled:', err);
      }
    };
    fetchRewards();
  }, []);

  const tiers = [
    {
      name: 'STARTER',
      threshold: '0 Points',
      pointsReq: 0,
      badge: 'Tier 01',
      description: 'Begin your journey into sensory precision coffee.',
      perks: [
        'Earn 1 Shake Point per $1 spent',
        'Complimentary Birthday Brew of choice',
        'Mobile Order & Digital Pickup Access',
        'Exclusive Early Access to Seasonal Drops',
      ],
      current: !user || (user?.rewardsPoints || 0) < 250,
    },
    {
      name: 'BREWER',
      threshold: '250 Points',
      pointsReq: 250,
      badge: 'Tier 02',
      description: 'For dedicated coffee connoisseurs and regular creators.',
      perks: [
        'Earn 1.25 Shake Points per $1 spent',
        'Free Size & Milk Upgrades on all drinks',
        'Double Points Tuesdays',
        'Custom engraved glass sleeve with first lab order',
      ],
      current: user && (user?.rewardsPoints || 0) >= 250 && (user?.rewardsPoints || 0) < 600,
    },
    {
      name: 'CREATOR',
      threshold: '600 Points',
      pointsReq: 600,
      badge: 'Tier 03',
      description: 'Master coffee architects with bespoke flavour calibration.',
      perks: [
        'Earn 1.5 Shake Points per $1 spent',
        'Monthly free custom coffee lab formulation',
        'Priority roasting chamber batching',
        'Exclusive invitations to Virtual Cupping Sessions',
      ],
      current: user && (user?.rewardsPoints || 0) >= 600 && (user?.rewardsPoints || 0) < 1200,
    },
    {
      name: 'SIGNATURE',
      threshold: '1,200+ Points',
      pointsReq: 1200,
      badge: 'Black Tier',
      description: 'The pinnacle of the HOT COOL SHAKE ecosystem.',
      perks: [
        'Earn 2.0 Shake Points per $1 spent',
        'Unlimited custom flavour infusions & botanicals',
        'VIP concierge delivery line with zero courier fee',
        'Annual Handcrafted Titanium Thermal Vessel gift',
      ],
      current: user && (user?.rewardsPoints || 0) >= 1200,
    },
  ];

  const redemptionItems = [
    {
      title: 'Free Flavour Infusion or Botanicals',
      points: 50,
      category: 'ADD-ON',
      desc: 'Add any single-origin essence or infused caramel syrup to your next drink.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Artisan Espresso or Nitro Cold Brew',
      points: 150,
      category: 'BEVERAGE',
      desc: 'Redeem any handcrafted hot espresso beverage or sub-zero cryo cold brew.',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Signature Blended Vortex Shake',
      points: 250,
      category: 'SPECIALTY',
      desc: 'Enjoy any signature blended shake crafted with fresh velvety micro-foam.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Full Make Your Coffee Lab Experience',
      points: 400,
      category: 'BESPOKE LAB',
      desc: 'Architect a 100% custom coffee from vessel to botanicals and thermal state.',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Single-Origin Bean Box (250g Whole Bean)',
      points: 600,
      category: 'RESERVE BEANS',
      desc: 'Take home roasted Ethiopian Yirgacheffe or Colombian Geisha whole beans.',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'Hand-blown Borosilicate Glass Tumbler',
      points: 900,
      category: 'MERCHANDISE',
      desc: 'Official HOT COOL SHAKE ergonomic double-wall thermal drinking vessel.',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const currentPoints = user?.rewardsPoints || 320;
  const userTier = user?.rewardsTier || 'BREWER';
  const nextTierPoints = 600;
  const progressPercent = Math.min(100, Math.round((currentPoints / nextTierPoints) * 100));

  const handleCopyCode = () => {
    navigator.clipboard.writeText('HCS-REWARDS-VIP');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>HOT COOL REWARDS ECOSYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            EVERY CUP <span className="text-[#EEDCC6]">REWARDED</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#EEDCC6]/80 font-normal leading-relaxed">
            Earn Shake Points with every sip, unlock handcrafted tiers, and redeem bespoke laboratory experiences.
          </p>
        </div>

        {/* 3D Holographic VIP Vault Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#3C2A21] to-[#2A1B16] border border-[#EEDCC6]/30 rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#EEDCC6]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: 3D Holographic Gyro Card */}
            <div className="md:col-span-6 flex flex-col items-center">
              <HolographicCard
                tierName={userTier === 'SIGNATURE' ? '$1B SOVEREIGN CIRCLE' : `${userTier} VIP PASS`}
                userName={user?.name || 'ALEXANDER STERLING'}
                memberNumber="HCS-0001-999"
                points={currentPoints.toLocaleString()}
              />
            </div>

            {/* Right: Progression & CTA */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-mono uppercase text-[#EEDCC6] font-bold block">QUANTUM VAULT BALANCE</span>
                  <div className="text-3xl sm:text-4xl font-display font-black text-[#F4E8D1]">
                    {currentPoints} <span className="text-lg font-mono text-[#EEDCC6] font-normal">Shake Points</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#EEDCC6]/70 uppercase block">NEXT MILESTONE</span>
                  <span className="text-sm font-mono font-bold text-[#F4E8D1]">SOVEREIGN (1,200 PTS)</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-3 w-full bg-[#2A1B16] rounded-full overflow-hidden border border-[#EEDCC6]/30 p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-brand-gradient rounded-full"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#EEDCC6]/70">
                  <span>{currentPoints} Pts</span>
                  <span>{Math.max(0, nextTierPoints - currentPoints)} Points to unlock Next Sovereign Tier</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('REDEEM')}
                  className="px-6 py-2.5 rounded-full bg-brand-gradient text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider hover:brightness-105 shadow-cream-glow transition-all"
                >
                  REDEEM REWARDS
                </button>
                <button
                  onClick={handleCopyCode}
                  className="px-5 py-2.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-xs font-bold uppercase hover:bg-[#3C2A21] transition-all flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? 'COPIED VIP CODE' : 'SHARE REFERRAL'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex justify-center border-b border-[#EEDCC6]/20">
          <div className="flex space-x-4 sm:space-x-8">
            {[
              { id: 'TIERS', label: 'MEMBERSHIP TIERS' },
              { id: 'REDEEM', label: 'POINTS CATALOG' },
              { id: 'EARN', label: 'HOW TO EARN' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#EEDCC6] text-[#EEDCC6]'
                    : 'border-transparent text-[#EEDCC6]/50 hover:text-[#F4E8D1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: MEMBERSHIP TIERS */}
        {activeTab === 'TIERS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-[28px] border transition-all duration-300 flex flex-col justify-between ${
                  t.current
                    ? 'bg-[#3C2A21] border-[#EEDCC6] shadow-xl ring-2 ring-[#EEDCC6]/30'
                    : 'bg-[#3C2A21]/50 border-[#EEDCC6]/20 hover:border-[#EEDCC6]/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[10px] font-mono font-bold text-[#EEDCC6] uppercase">
                      {t.badge}
                    </span>
                    {t.current && (
                      <span className="text-[10px] font-mono font-bold text-[#EEDCC6] uppercase flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CURRENT</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-display font-black text-[#F4E8D1] uppercase">
                      {t.name}
                    </h3>
                    <div className="text-xs font-mono text-[#EEDCC6] font-bold mt-0.5">
                      {t.threshold}
                    </div>
                  </div>

                  <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                    {t.description}
                  </p>

                  <div className="border-t border-[#EEDCC6]/20 pt-4 space-y-2.5">
                    {t.perks.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2 text-xs text-[#F4E8D1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EEDCC6] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EEDCC6]/20">
                  <span className="text-[10px] font-mono uppercase text-[#EEDCC6]/60 block text-center">
                    {t.current ? 'ACTIVE TIER' : `REACH ${t.threshold}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: POINTS REDEMPTION CATALOG */}
        {activeTab === 'REDEEM' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redemptionItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-[#EEDCC6]/50 transition-all shadow-lg group"
                >
                  <div className="relative h-48 overflow-hidden bg-[#2A1B16]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/40 text-[#EEDCC6] font-mono text-xs font-black shadow-md">
                      {item.points} PTS
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-[#3C2A21]/80 backdrop-blur-sm border border-[#EEDCC6]/20 text-[#EEDCC6] font-mono text-[9px] font-bold uppercase">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#F4E8D1]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#EEDCC6]/70 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`Reward "${item.title}" redeemed for ${item.points} points!`)}
                      disabled={currentPoints < item.points}
                      className={`w-full py-3 rounded-full font-mono text-xs font-black tracking-widest uppercase transition-all mt-4 flex items-center justify-center space-x-2 ${
                        currentPoints >= item.points
                          ? 'bg-[#EEDCC6] text-[#2A1B16] hover:bg-[#F4E8D1] shadow-md'
                          : 'bg-[#2A1B16] border border-[#EEDCC6]/20 text-[#EEDCC6]/40 cursor-not-allowed'
                      }`}
                    >
                      {currentPoints >= item.points ? (
                        <>
                          <span>REDEEM NOW</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>REQUIRES {item.points} PTS</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: HOW TO EARN */}
        {activeTab === 'EARN' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 flex items-center justify-center text-[#EEDCC6]">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">1. ORDER IN-STORE OR DIGITAL</h3>
              <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                Scan your member pass or place an order via our digital creator lab. Every $1 equals 1 to 2 Shake Points based on your tier.
              </p>
            </div>

            <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 flex items-center justify-center text-[#EEDCC6]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">2. CRAFT BESPOKE RECIPES</h3>
              <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                Earn 50 bonus points every time you create and save a new custom coffee creation in the Make Your Coffee simulator.
              </p>
            </div>

            <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 flex items-center justify-center text-[#EEDCC6]">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">3. SEND DIGITAL GIFT CARDS</h3>
              <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
                Send a friend an experiential coffee card. Get 10% back in instant Shake Points credited to your account.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
