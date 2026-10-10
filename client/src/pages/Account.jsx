import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  User,
  Coffee,
  Package,
  Award,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit3,
} from 'lucide-react';

export const Account = () => {
  const { user, logout, openAuthModal, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('CREATIONS'); // 'CREATIONS' | 'ORDERS' | 'SETTINGS'
  const [userOrders, setUserOrders] = useState([]);
  const [customCreations, setCustomCreations] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const loadUserData = async () => {
        setLoadingData(true);
        try {
          const [ordersRes, customRes] = await Promise.all([
            api.getUserOrders(),
            api.getUserCustomCoffees(),
          ]);
          if (ordersRes.success) setUserOrders(ordersRes.orders || []);
          if (customRes.success) setCustomCreations(customRes.customCoffees || []);
        } catch (err) {
          console.warn('Account user data load error:', err);
        } finally {
          setLoadingData(false);
        }
      };
      loadUserData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#2A1B16] text-[#F4E8D1] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-[32px] bg-[#3C2A21]/80 border border-[#EEDCC6]/30 text-center space-y-6 shadow-2xl">
          <TripleWaveEmblem size={56} />
          <h1 className="text-3xl font-display font-black text-[#F4E8D1] uppercase">
            MEMBER ACCOUNT
          </h1>
          <p className="text-xs text-[#EEDCC6]/80 font-sans leading-relaxed">
            Sign in to view your Shake Points ledger, access saved bespoke recipes, track real-time orders, and manage addresses.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#F4E8D1] transition-all shadow-md"
          >
            SIGN IN / REGISTER
          </button>
        </div>
      </div>
    );
  }

  const points = user?.rewardsPoints || 320;
  const tier = user?.rewardsTier || 'BREWER';

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Profile Card Top */}
        <div className="bg-[#3C2A21]/70 border border-[#EEDCC6]/30 rounded-[32px] p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2A1B16] border-2 border-[#EEDCC6]/40 flex items-center justify-center text-[#EEDCC6] font-display font-black text-2xl shadow-lg">
                {user?.name ? user.name[0].toUpperCase() : 'H'}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                    {user?.name || 'Valued Member'}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[9px] font-mono text-[#EEDCC6] font-bold uppercase">
                    {tier}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#EEDCC6]/70">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Points & Quick Action */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="text-left md:text-right border-l md:border-l-0 md:border-r border-[#EEDCC6]/20 pl-4 md:pl-0 md:pr-6">
                <span className="text-[10px] font-mono text-[#EEDCC6]/60 uppercase block">ACTIVE REWARDS</span>
                <div className="text-2xl font-mono font-black text-[#EEDCC6]">
                  {points} <span className="text-xs font-normal text-[#F4E8D1]">PTS</span>
                </div>
                <Link
                  to="/rewards"
                  className="text-[10px] font-mono text-[#EEDCC6] hover:underline uppercase block mt-0.5"
                >
                  REWARDS LEDGER & CATALOG →
                </Link>
              </div>

              <button
                onClick={logout}
                className="p-3 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 text-[#EEDCC6]/70 hover:text-[#F4E8D1] transition-all"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-start border-b border-[#EEDCC6]/20">
          <div className="flex space-x-6">
            {[
              { id: 'CREATIONS', label: 'SAVED CREATIONS', icon: Coffee },
              { id: 'ORDERS', label: 'ORDER HISTORY & TRACKING', icon: Package },
              { id: 'SETTINGS', label: 'ADDRESSES & PREFERENCES', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-2 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border-b-2 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-[#EEDCC6] text-[#EEDCC6]'
                      : 'border-transparent text-[#EEDCC6]/50 hover:text-[#F4E8D1]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: SAVED CREATIONS */}
        {activeTab === 'CREATIONS' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
                  YOUR BESPOKE COFFEE RECIPES
                </h2>
                <p className="text-xs text-[#EEDCC6]/70 font-sans">
                  Custom formulations saved from your interactive laboratory sessions.
                </p>
              </div>

              <Link
                to="/make-your-coffee"
                className="px-5 py-2.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase hover:bg-[#F4E8D1] transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEW CREATION</span>
              </Link>
            </div>

            {customCreations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customCreations.map((c) => (
                  <div
                    key={c._id}
                    className="p-6 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-4 hover:border-[#EEDCC6]/50 transition-all shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[9px] font-mono text-[#EEDCC6] font-bold uppercase">
                          {c.condition || 'HOT'}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#EEDCC6]">
                          ${c.calculatedPrice?.toFixed(2) || '9.50'}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
                        {c.customBlendTitle || 'Obsidian Velvet Infusion'}
                      </h3>

                      <div className="text-xs font-mono text-[#EEDCC6]/70 mt-2 space-y-1">
                        <div>Vessel: {c.bottle?.name || 'Classic Glass'}</div>
                        <div>Base: {c.coffeeBase || 'Italian Dark Roast'}</div>
                        <div>Milk: {c.milkBase || 'Oat Silk'}</div>
                      </div>

                      {c.flavors?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {c.flavors.map((f, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-full bg-[#2A1B16] text-[9px] font-mono text-[#F4E8D1]"
                            >
                              {f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#EEDCC6]/20 flex justify-between items-center">
                      <Link
                        to="/make-your-coffee"
                        className="text-xs font-mono text-[#EEDCC6] font-bold flex items-center space-x-1"
                      >
                        <span>RE-ORDER IN LAB</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-8 rounded-[32px] bg-[#3C2A21]/40 border border-[#EEDCC6]/20 space-y-4">
                <Coffee className="w-12 h-12 text-[#EEDCC6]/40 mx-auto" />
                <h3 className="font-display font-bold text-lg text-[#F4E8D1]">NO SAVED RECIPES YET</h3>
                <p className="text-xs text-[#EEDCC6]/70 max-w-sm mx-auto">
                  Step into the Make Your Coffee lab to architect your custom temperature, vessel, and flavour universe.
                </p>
                <Link
                  to="/make-your-coffee"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider"
                >
                  <span>LAUNCH COFFEE LAB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ORDER HISTORY */}
        {activeTab === 'ORDERS' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
                ORDER HISTORY & TELEMETRY
              </h2>
              <p className="text-xs text-[#EEDCC6]/70 font-sans">
                Review past and active orders with live dispatch courier coordinates.
              </p>
            </div>

            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.map((ord) => (
                  <div
                    key={ord._id}
                    className="p-6 rounded-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/25 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-sm text-[#F4E8D1]">
                          ORDER #{ord._id?.substring(0, 8).toUpperCase()}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[9px] font-mono text-[#EEDCC6] uppercase font-bold">
                          {ord.status || 'PROCESSING'}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-[#EEDCC6]/70">
                        Placed on {new Date(ord.createdAt || Date.now()).toLocaleDateString()} • {ord.items?.length || 1} Item(s)
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:space-x-6">
                      <div className="font-mono font-black text-lg text-[#EEDCC6]">
                        ${ord.totalAmount?.toFixed(2)}
                      </div>
                      <Link
                        to={`/track-order/${ord._id}`}
                        className="px-4 py-2 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-xs font-bold uppercase hover:bg-[#3C2A21] transition-all flex items-center space-x-1"
                      >
                        <span>LIVE TRACKING</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 p-8 rounded-[32px] bg-[#3C2A21]/40 border border-[#EEDCC6]/20 space-y-3">
                <Package className="w-12 h-12 text-[#EEDCC6]/40 mx-auto" />
                <h3 className="font-display font-bold text-lg text-[#F4E8D1]">NO PREVIOUS ORDERS</h3>
                <p className="text-xs text-[#EEDCC6]/70 max-w-sm mx-auto">
                  Browse our handcrafted signature menu or design a bespoke bottle today.
                </p>
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider"
                >
                  <span>EXPLORE MENU</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SETTINGS & ADDRESSES */}
        {activeTab === 'SETTINGS' && (
          <div className="max-w-2xl bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[32px] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
                SAVED ADDRESSES & PREFERENCES
              </h2>
              <p className="text-xs text-[#EEDCC6]/70 font-sans">
                Manage your primary shipping address and sensory defaults.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#EEDCC6] uppercase block mb-1">
                  Default Delivery Street
                </label>
                <input
                  type="text"
                  defaultValue={user?.defaultAddress?.street || '450 Innovation Way, Suite 100'}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#EEDCC6] uppercase block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.defaultAddress?.city || 'London'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#EEDCC6] uppercase block mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.defaultAddress?.postalCode || 'W1K 7AA'}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Preferences saved!')}
                  className="px-6 py-3 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#F4E8D1] transition-all"
                >
                  SAVE PREFERENCES
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
