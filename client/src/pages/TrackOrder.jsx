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
} from 'lucide-react';

const ORDER_STATES = [
  { key: 'CUSTOMIZED', title: 'Lab Configuration Crafted', desc: 'Recipe and temperature telemetry configured.' },
  { key: 'ORDER_CONFIRMED', title: 'Order Confirmed', desc: 'Received at Flagship Roastery Lab.' },
  { key: 'PREPARING', title: 'Precision Automated Brewing', desc: 'Active extraction and thermal cycle.' },
  { key: 'QUALITY_CHECK', title: 'Optical & Sensor Quality Check', desc: 'Viscosity and vacuum seal verified.' },
  { key: 'READY', title: 'Packaged in Thermal Lock', desc: 'Vessel sealed in temperature lock.' },
  { key: 'DISPATCHED', title: 'Dispatched from Hub', desc: 'Handed to zero-emission electric courier.' },
  { key: 'OUT_FOR_DELIVERY', title: 'Out For Delivery', desc: 'Courier approaching destination.' },
  { key: 'DELIVERED', title: 'Handcrafted Perfection Delivered', desc: 'Enjoy your custom HOT COOL SHAKE!' },
];

export const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const { startPageTransition } = usePageLoader();

  const fetchOrderDetails = async () => {
    try {
      const orderId = id || 'HCS-2025-01042';
      const res = await api.getOrder(orderId);
      if (res.success) {
        setOrder(res.order);
      }
    } catch (e) {
      console.warn('Could not load order by ID, using sample order data:', e);
      // Fallback sample order state
      setOrder({
        orderNumber: id || 'HCS-2025-01042',
        customer: { name: 'Sophia Laurent', city: 'London', address: '72 Artisan Boulevard' },
        status: 'OUT_FOR_DELIVERY',
        estimatedDeliveryTime: '4 mins remaining',
        courierTracking: {
          driverName: 'Kai Vance',
          vehicleType: 'Climate-Controlled Electric Shuttle',
          temperatureTelemetry: 'Strict 04.1°C Cryo-Lock Maintained',
        },
        items: [
          { name: 'Custom Velvet Vanilla Cryo Reserve', price: 12.00, quantity: 1, temperature: 'COOL' },
          { name: 'Obsidian Velvet Cortado', price: 5.75, quantity: 2, temperature: 'HOT' },
        ],
        total: 23.65,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    const pollTimer = setInterval(fetchOrderDetails, 15000); // live sync
    return () => clearInterval(pollTimer);
  }, [id]);

  const handleAdvanceStatus = async () => {
    if (!order) return;
    setAdvancing(true);
    const currentIndex = ORDER_STATES.findIndex((s) => s.key === order.status);
    const nextIndex = Math.min(currentIndex + 1, ORDER_STATES.length - 1);
    const nextStatus = ORDER_STATES[nextIndex].key;

    try {
      const res = await api.updateOrderStatus(order._id || order.orderNumber, nextStatus);
      if (res.success) {
        setOrder(res.order);
      }
    } catch (e) {
      // simulate locally
      setOrder({ ...order, status: nextStatus });
    } finally {
      setAdvancing(false);
    }
  };

  const currentStatusIndex = ORDER_STATES.findIndex((s) => s.key === order?.status);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-radial-luxury opacity-90 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EEDCC6]/15">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE DISPATCH TELEMETRY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-[#F4E8D1]">
              ORDER {order?.orderNumber || 'TRACKING'}
            </h1>
            <p className="text-xs font-mono text-[#EEDCC6]/80">
              Destination: {order?.customer?.address}, {order?.customer?.city}
            </p>
          </div>

          {/* Simulator Advance Status Action for Live Demo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAdvanceStatus}
              disabled={advancing || currentStatusIndex === ORDER_STATES.length - 1}
              className="px-5 py-2.5 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] text-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase transition-all flex items-center space-x-2 disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${advancing ? 'animate-spin' : ''}`} />
              <span>ADVANCE ORDER STAGE (SIMULATOR)</span>
            </button>
          </div>
        </div>

        {/* Courier & Telemetry Banner */}
        <div className="p-6 sm:p-8 rounded-[36px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">
                COURIER FLEET
              </span>
              <h3 className="font-display font-bold text-base text-[#F4E8D1]">
                {order?.courierTracking?.driverName || 'Kai Vance'}
              </h3>
              <p className="text-xs font-mono text-[#EEDCC6]">
                {order?.courierTracking?.vehicleType || 'Electric Climate Shuttle'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-[#2A1B16] text-[#EEDCC6]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">
                CLIMATE TELEMETRY
              </span>
              <h3 className="font-display font-bold text-base text-[#F4E8D1]">
                Active Temperature Lock
              </h3>
              <p className="text-xs font-mono text-emerald-400">
                {order?.courierTracking?.temperatureTelemetry || '04.1°C Calibrated'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 md:justify-end">
            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">
                ESTIMATED ARRIVAL
              </span>
              <h3 className="font-display font-black text-2xl text-[#EEDCC6]">
                {order?.estimatedDeliveryTime || '20-30 mins'}
              </h3>
            </div>
          </div>
        </div>

        {/* Visual Animated Status Timeline Pipeline */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-[#2A1B16] border border-[#EEDCC6]/25 shadow-2xl space-y-8">
          <h2 className="text-xl font-display font-bold text-[#F4E8D1] uppercase">
            STATUS TIMELINE & TELEMETRY STAGES
          </h2>

          <div className="space-y-6">
            {ORDER_STATES.map((state, idx) => {
              const isCompleted = idx <= currentStatusIndex;
              const isCurrent = idx === currentStatusIndex;

              return (
                <motion.div
                  key={state.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start space-x-4 relative group"
                >
                  {/* Connecting Line */}
                  {idx < ORDER_STATES.length - 1 && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-10 ${
                        idx < currentStatusIndex ? 'bg-[#EEDCC6]' : 'bg-[#3C2A21]'
                      } transition-colors duration-500`}
                    />
                  )}

                  {/* Icon Node */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all z-10 flex-shrink-0 ${
                      isCompleted
                        ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-coffee-glow'
                        : 'bg-[#3C2A21] text-[#EEDCC6]/40 border border-[#EEDCC6]/20'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3
                        className={`font-display font-bold text-sm sm:text-base ${
                          isCurrent
                            ? 'text-[#F4E8D1] font-black'
                            : isCompleted
                            ? 'text-[#EEDCC6]'
                            : 'text-[#EEDCC6]/40'
                        }`}
                      >
                        {state.title}
                      </h3>
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[9px] font-mono font-bold uppercase animate-pulse">
                          CURRENT STAGE
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs font-sans mt-0.5 ${
                        isCompleted ? 'text-[#EEDCC6]/80' : 'text-[#EEDCC6]/30'
                      }`}
                    >
                      {state.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="p-8 rounded-[36px] bg-[#3C2A21]/60 border border-[#EEDCC6]/20 space-y-4">
          <h3 className="font-display font-bold text-lg text-[#F4E8D1]">
            CREATIONS IN THIS DISPATCH
          </h3>

          <div className="space-y-3">
            {order?.items?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/15 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#F4E8D1]">{item.name}</h4>
                  <span className="text-[#EEDCC6]/70">
                    Quantity: {item.quantity} • Temperature: {item.temperature}
                  </span>
                </div>
                <span className="font-bold text-sm text-[#EEDCC6]">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-sm font-display font-bold text-[#F4E8D1] border-t border-[#EEDCC6]/15">
            <span>TOTAL PAID:</span>
            <span className="font-mono text-base text-[#EEDCC6]">${order?.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
