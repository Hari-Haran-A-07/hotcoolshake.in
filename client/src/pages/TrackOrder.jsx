import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { usePageLoader } from '../context/LoadingContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
  Snowflake,
  ShieldCheck,
  RotateCw,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';

const ORDER_STATES = [
  { key: 'ORDER_RECEIVED', title: 'ORDER RECEIVED', desc: 'Order transmitted to Flagship Roastery Lab.' },
  { key: 'PREPARING', title: 'PREPARING', desc: 'Single-origin beans ground and calibrated.' },
  { key: 'BLENDING', title: 'BLENDING', desc: 'Sonic vortex agitation and ingredient layering.' },
  { key: 'HEATING_COOLING', title: 'HEATING / COOLING', desc: 'Active thermal induction (68°C) or cryogenic lock (04°C).' },
  { key: 'FINAL_CHECK', title: 'FINAL CHECK', desc: 'Laser TDS refractometry and hermetic seal verification.' },
  { key: 'READY', title: 'READY', desc: 'Packaged in thermal retention case for pickup or dispatch.' },
  { key: 'COMPLETED', title: 'COMPLETED', desc: 'Enjoy your custom HOT COOL SHAKE creation!' },
];

export const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const { startPageTransition } = usePageLoader();

  const fetchOrderDetails = async () => {
    try {
      const orderId = id || 'HCS-2026-01042';
      const res = await api.getOrder(orderId);
      if (res.success && res.order) {
        setOrder(res.order);
      } else {
        throw new Error('Fallback needed');
      }
    } catch (e) {
      // Fallback sample order state
      setOrder({
        orderNumber: id || 'HCS-2026-01042',
        customer: { name: 'Sophia Laurent', city: 'London', address: '72 Artisan Boulevard' },
        status: 'HEATING_COOLING',
        estimatedDeliveryTime: '12 mins remaining',
        assignedHub: { name: 'Global Flagship Roastery Lab', city: 'London Mayfair' },
        courierTracking: {
          driverName: 'Kai Vance',
          vehicleType: 'Climate-Controlled Electric Shuttle',
          temperatureTelemetry: 'Strict 04°C / 68°C Active Telemetry Lock',
        },
        items: [
          { name: 'Custom Velvet Vanilla Cryo Reserve', price: 12.00, quantity: 1, temperature: 'COOL' },
          { name: 'Obsidian Velvet Cortado', price: 5.75, quantity: 1, temperature: 'HOT' },
        ],
        total: 17.75,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    const pollTimer = setInterval(fetchOrderDetails, 12000);
    return () => clearInterval(pollTimer);
  }, [id]);

  const handleAdvanceStatus = async () => {
    if (!order) return;
    setAdvancing(true);
    const currentIndex = ORDER_STATES.findIndex((s) => s.key === order.status || s.key === order.status?.replace('-', '_'));
    const nextIndex = Math.min((currentIndex >= 0 ? currentIndex : 1) + 1, ORDER_STATES.length - 1);
    const nextStatus = ORDER_STATES[nextIndex].key;

    try {
      const res = await api.updateOrderStatus(order._id || order.orderNumber, nextStatus);
      if (res.success) {
        setOrder(res.order);
      } else {
        setOrder({ ...order, status: nextStatus });
      }
    } catch (e) {
      setOrder({ ...order, status: nextStatus });
    } finally {
      setAdvancing(false);
    }
  };

  const currentStatusIndex = ORDER_STATES.findIndex((s) => s.key === order?.status || s.key === order?.status?.replace('-', '_'));
  const safeIndex = currentStatusIndex >= 0 ? currentStatusIndex : 3;

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30">
            <Zap className="w-3.5 h-3.5 text-[#67D9D0]" />
            <span>REAL-TIME STATUS TELEMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase">
            TRACK YOUR <span className="text-brand-gradient">ORDER.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#A8B0B4] font-sans">
            Live automated preparation monitoring from extraction to climate-locked dispatch.
          </p>
        </div>

        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Progress Timeline */}
            <div className="lg:col-span-8 bg-[#0B2538]/80 backdrop-blur-md p-6 sm:p-10 rounded-[36px] border-2 border-[#B8783E]/30 shadow-2xl space-y-8">
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#A8B0B4] uppercase block">
                    ORDER TRACKING NUMBER
                  </span>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#F7FAF9]">
                    {order.orderNumber}
                  </div>
                  <span className="text-xs font-mono text-[#D6A06A]">
                    Customer: {order.customer?.name} ({order.customer?.city})
                  </span>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span className="text-[10px] font-mono text-[#A8B0B4] uppercase block">
                    ESTIMATED TIME
                  </span>
                  <div className="text-lg font-mono font-black text-[#67D9D0]">
                    {order.estimatedDeliveryTime || '10-15 mins'}
                  </div>
                  <button
                    onClick={handleAdvanceStatus}
                    disabled={advancing || safeIndex >= ORDER_STATES.length - 1}
                    className="px-3.5 py-1.5 rounded-full bg-[#071A2B] hover:bg-brand-gradient text-[#67D9D0] hover:text-[#071A2B] border border-[#67D9D0]/30 text-[10px] font-mono font-bold uppercase transition-all flex items-center space-x-1.5 disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${advancing ? 'animate-spin' : ''}`} />
                    <span>SIMULATE NEXT STATUS</span>
                  </button>
                </div>
              </div>

              {/* Multi-Step Timeline */}
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-[#D6A06A] uppercase tracking-wider block">
                  PREPARATION & DISPATCH PROGRESS
                </span>

                <div className="space-y-4">
                  {ORDER_STATES.map((st, idx) => {
                    const isDone = safeIndex >= idx;
                    const isCurrent = safeIndex === idx;

                    return (
                      <div
                        key={st.key}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          isCurrent
                            ? 'bg-[#071A2B] border-[#67D9D0] shadow-teal-glow text-[#F7FAF9]'
                            : isDone
                            ? 'bg-[#071A2B]/60 border-[#B8783E]/40 text-[#D6A06A]'
                            : 'bg-[#071A2B]/30 border-white/5 text-[#A8B0B4]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                              isDone ? 'bg-brand-gradient text-[#071A2B]' : 'bg-[#0B2538] text-[#A8B0B4]'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div>
                            <h4 className="font-mono text-sm font-bold tracking-wider">
                              {st.title}
                            </h4>
                            <p className="text-xs text-[#A8B0B4] mt-0.5">{st.desc}</p>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="text-[10px] font-mono uppercase text-[#67D9D0] px-2.5 py-1 rounded-full bg-[#0B2538] border border-[#67D9D0]/40 animate-pulse">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Order Items & Telemetry Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[36px] bg-[#0B2538] border-2 border-[#B8783E]/30 shadow-2xl space-y-6">
                <h3 className="font-display font-bold text-xl text-[#F7FAF9] uppercase">
                  ORDER SUMMARY
                </h3>

                <div className="space-y-3">
                  {order.items?.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 rounded-2xl bg-[#071A2B] border border-white/10 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="font-bold text-[#F7FAF9]">{item.name}</div>
                        <div className="text-[10px] text-[#A8B0B4]">
                          Qty: {item.quantity || 1} • {item.temperature || 'SERVED CALIBRATED'}
                        </div>
                      </div>
                      <span className="font-bold text-[#67D9D0]">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-base font-mono font-bold">
                  <span className="text-[#A8B0B4]">TOTAL PAID:</span>
                  <span className="text-xl text-brand-gradient">
                    ${order.total ? order.total.toFixed(2) : '17.75'}
                  </span>
                </div>

                {/* Telemetry info */}
                <div className="p-4 rounded-2xl bg-[#071A2B] border border-[#67D9D0]/30 space-y-2 text-xs font-mono">
                  <div className="text-[#67D9D0] font-bold flex items-center space-x-1.5">
                    <Truck className="w-4 h-4" />
                    <span>ELECTRIC ZERO-EMISSION COURIER</span>
                  </div>
                  <div className="text-[#A8B0B4] text-[11px]">
                    Driver: {order.courierTracking?.driverName || 'Kai Vance'}
                  </div>
                  <div className="text-[#D6A06A] text-[11px]">
                    {order.courierTracking?.temperatureTelemetry || 'Active Temperature Lock'}
                  </div>
                </div>

                <button
                  onClick={() => startPageTransition('/make-your-coffee', 'CREATE ANOTHER')}
                  data-cursor="create"
                  className="w-full py-3.5 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase shadow-bronze-glow hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <span>CREATE ANOTHER CUP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
