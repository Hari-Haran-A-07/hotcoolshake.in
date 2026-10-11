import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';
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
  Printer,
  FileText,
  X,
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
  const [showReceiptModal, setShowReceiptModal] = useState(false);

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
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#EEDCC6] uppercase font-bold px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>REAL-TIME STATUS TELEMETRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            TRACK YOUR <span className="text-[#EEDCC6]">ORDER.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 font-sans">
            Live automated preparation monitoring from extraction to climate-locked dispatch.
          </p>
        </div>

        {order && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Progress Timeline */}
            <div className="lg:col-span-8 bg-[#3C2A21]/70 backdrop-blur-md p-6 sm:p-10 rounded-[32px] border border-[#EEDCC6]/25 shadow-2xl space-y-8">
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EEDCC6]/20 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#EEDCC6]/60 uppercase block">
                    ORDER TRACKING NUMBER
                  </span>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#F4E8D1]">
                    {order.orderNumber}
                  </div>
                  <span className="text-xs font-mono text-[#EEDCC6]">
                    Customer: {order.customer?.name} ({order.customer?.city})
                  </span>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <span className="text-[10px] font-mono text-[#EEDCC6]/60 uppercase block">
                    ESTIMATED TIME
                  </span>
                  <div className="text-lg font-mono font-black text-[#EEDCC6]">
                    {order.estimatedDeliveryTime || '10-15 mins'}
                  </div>
                  <button
                    onClick={handleAdvanceStatus}
                    disabled={advancing || safeIndex >= ORDER_STATES.length - 1}
                    className="px-3.5 py-1.5 rounded-full bg-[#2A1B16] hover:bg-[#EEDCC6] text-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/30 text-[10px] font-mono font-bold uppercase transition-all flex items-center space-x-1.5 disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3 h-3 ${advancing ? 'animate-spin' : ''}`} />
                    <span>SIMULATE NEXT STATUS</span>
                  </button>
                </div>
              </div>

              {/* Multi-Step Timeline */}
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold text-[#EEDCC6] uppercase tracking-wider block">
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
                            ? 'bg-[#2A1B16] border-[#EEDCC6] shadow-xl text-[#F4E8D1] ring-1 ring-[#EEDCC6]'
                            : isDone
                            ? 'bg-[#2A1B16]/60 border-[#EEDCC6]/30 text-[#EEDCC6]'
                            : 'bg-[#2A1B16]/30 border-[#EEDCC6]/10 text-[#EEDCC6]/40'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                              isDone ? 'bg-[#EEDCC6] text-[#2A1B16]' : 'bg-[#3C2A21] text-[#EEDCC6]/50'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4 text-[#2A1B16]" /> : idx + 1}
                          </div>
                          <div>
                            <h4 className="font-mono text-sm font-bold tracking-wider">
                              {st.title}
                            </h4>
                            <p className="text-xs text-[#EEDCC6]/70 mt-0.5">{st.desc}</p>
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="text-[10px] font-mono uppercase text-[#EEDCC6] px-2.5 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/40 animate-pulse">
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
              <div className="p-8 rounded-[32px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 shadow-2xl space-y-6">
                <h3 className="font-display font-bold text-xl text-[#F4E8D1] uppercase">
                  ORDER SUMMARY
                </h3>

                <div className="space-y-3">
                  {order.items?.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3.5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/20 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="font-bold text-[#F4E8D1]">{item.name}</div>
                        <div className="text-[10px] text-[#EEDCC6]/60">
                          Qty: {item.quantity || 1} • {item.temperature || 'SERVED CALIBRATED'}
                        </div>
                      </div>
                      <span className="font-bold text-[#EEDCC6]">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/20 flex items-center justify-between text-base font-mono font-bold">
                  <span className="text-[#EEDCC6]/70">TOTAL PAID:</span>
                  <span className="text-xl text-[#EEDCC6]">
                    ${order.total ? order.total.toFixed(2) : '17.75'}
                  </span>
                </div>

                {/* Telemetry info */}
                <div className="p-4 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/30 space-y-2 text-xs font-mono">
                  <div className="text-[#EEDCC6] font-bold flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-[#EEDCC6]" />
                    <span>ELECTRIC ZERO-EMISSION COURIER</span>
                  </div>
                  <div className="text-[#EEDCC6]/70 text-[11px]">
                    Driver: {order.courierTracking?.driverName || 'Kai Vance'}
                  </div>
                  <div className="text-[#EEDCC6] text-[11px]">
                    {order.courierTracking?.temperatureTelemetry || 'Active Temperature Lock'}
                  </div>
                </div>

                {/* Official Thermal Receipt Button */}
                <button
                  type="button"
                  onClick={() => setShowReceiptModal(true)}
                  className="w-full py-3 rounded-full bg-[#2A1B16] text-[#EEDCC6] border border-[#EEDCC6]/40 font-mono text-xs font-bold tracking-widest uppercase hover:bg-[#3C2A21] hover:text-[#F4E8D1] transition-all flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-[#EEDCC6]" />
                  <span>VIEW OFFICIAL THERMAL RECEIPT</span>
                </button>

                <Link
                  to="/make-your-coffee"
                  className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all flex items-center justify-center space-x-2"
                >
                  <span>CREATE ANOTHER CUP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Luxury Thermal Receipt Modal */}
        {showReceiptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A1B16]/80 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#FAF6F0] text-[#1A120E] p-8 rounded-3xl shadow-2xl border border-[#EEDCC6] font-mono text-xs max-h-[90vh] overflow-y-auto">
              {/* Receipt Header Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-dashed border-[#1A120E]/20 print:hidden">
                <span className="font-bold tracking-wider text-[11px] uppercase text-[#1A120E]/70">
                  DIGITAL THERMAL RECEIPT
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-full bg-[#1A120E] text-[#FAF6F0] hover:bg-[#2A1B16] transition-colors"
                    title="Print or Save PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="p-2 rounded-full bg-[#1A120E]/10 hover:bg-[#1A120E]/20 text-[#1A120E] transition-colors"
                    title="Close Receipt"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Printable Receipt Body */}
              <div className="space-y-4 pt-4 text-center">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-xl tracking-wider text-[#1A120E]">
                    HOT COOL SHAKE
                  </h3>
                  <p className="text-[10px] tracking-widest text-[#1A120E]/60 uppercase">
                    &quot;HOT. COOL. YOUR WAY.&quot;
                  </p>
                  <p className="text-[10px] text-[#1A120E]/50">
                    Flagship Roastery Lab • Global Network
                  </p>
                </div>

                <div className="py-2 border-y border-dashed border-[#1A120E]/20 text-[11px] text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#1A120E]/60">INVOICE NO:</span>
                    <span className="font-bold">{order.orderNumber || 'HCS-2026-01042'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A120E]/60">DATE & TIME:</span>
                    <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A120E]/60">GUEST:</span>
                    <span className="font-bold">{order.customer?.name || 'Sophia Laurent'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1A120E]/60">DISPATCH DESTINATION:</span>
                    <span>{order.customer?.city || 'London Mayfair'}</span>
                  </div>
                </div>

                {/* Itemized Table */}
                <div className="space-y-2 text-left">
                  <div className="flex justify-between text-[10px] font-bold text-[#1A120E]/60 uppercase border-b border-[#1A120E]/10 pb-1">
                    <span>ITEM / CREATION</span>
                    <span>TOTAL</span>
                  </div>
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[10px] text-[#1A120E]/60">
                          {item.quantity || 1}x @ ${(item.price || 0).toFixed(2)} • {item.temperature || 'CALIBRATED'}
                        </div>
                      </div>
                      <span className="font-bold">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals & Taxes */}
                <div className="py-3 border-t border-dashed border-[#1A120E]/20 space-y-1 text-left text-[11px]">
                  <div className="flex justify-between text-[#1A120E]/70">
                    <span>SUBTOTAL:</span>
                    <span>${((order.total || 17.75) * 0.92).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#1A120E]/70">
                    <span>ZERO-EMISSION COURIER:</span>
                    <span className="text-emerald-700 font-bold">$0.00 (COMPLIMENTARY)</span>
                  </div>
                  <div className="flex justify-between text-[#1A120E]/70">
                    <span>VAT / APPLICABLE TAX (8.5%):</span>
                    <span>${((order.total || 17.75) * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm pt-2 border-t border-[#1A120E]/20">
                    <span>TOTAL PAID:</span>
                    <span className="text-base">${(order.total || 17.75).toFixed(2)}</span>
                  </div>
                </div>

                {/* Telemetry Certification Stamp */}
                <div className="p-3 bg-[#1A120E]/5 rounded-xl text-left text-[10px] space-y-1">
                  <div className="font-bold text-[#1A120E] flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CHAMBER-X™ CALIBRATION INTEGRITY CERTIFIED</span>
                  </div>
                  <div className="text-[#1A120E]/70">
                    Telemetry: {order.courierTracking?.temperatureTelemetry || 'Active 04°C / 68°C Lock'}
                  </div>
                  <div className="text-[#1A120E]/70">
                    Courier: {order.courierTracking?.driverName || 'Kai Vance'} • Zero-Emission Electric
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="pt-2 text-center space-y-1">
                  <div className="h-9 flex items-center justify-center space-x-1 opacity-80">
                    {[...Array(32)].map((_, bIdx) => (
                      <span
                        key={bIdx}
                        className={`h-full bg-[#1A120E] inline-block ${
                          bIdx % 3 === 0 ? 'w-1' : bIdx % 5 === 0 ? 'w-1.5' : 'w-0.5'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] font-mono tracking-widest text-[#1A120E]/60 uppercase">
                    * {order.orderNumber || 'HCS-2026-01042'} *
                  </p>
                </div>

                {/* Printable Action Buttons */}
                <div className="pt-4 flex items-center space-x-3 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3 rounded-full bg-[#1A120E] text-[#FAF6F0] font-bold text-xs uppercase tracking-wider hover:bg-[#2A1B16] transition-all flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>PRINT / SAVE PDF</span>
                  </button>
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="px-6 py-3 rounded-full border border-[#1A120E]/30 text-[#1A120E] font-bold text-xs uppercase tracking-wider hover:bg-[#1A120E]/10 transition-all"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
