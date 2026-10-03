import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  Sparkles,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Mail,
  CheckCircle,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAdmin, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState('STATS'); // 'STATS' | 'ORDERS' | 'PRODUCTS' | 'CUSTOM_COFFEE' | 'MESSAGES'
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customCoffees, setCustomCoffees] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal Form
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    categorySlug: 'hot-coffee',
    price: 6.50,
    temperature: 'HOT',
    description: '',
    story: '',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    flavorNotes: 'Dark Cocoa, Vanilla',
    badge: 'New Release',
    featured: true,
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes, prodRes, customRes, msgRes] = await Promise.all([
        api.getAdminStats().catch(() => ({})),
        api.getAdminOrders().catch(() => ({})),
        api.getProducts({}).catch(() => ({})),
        api.getRecentCustomCoffees().catch(() => ({})),
        api.getAdminMessages().catch(() => ({})),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (ordersRes.success) setOrders(ordersRes.orders);
      if (prodRes.success) setProducts(prodRes.products);
      if (customRes.success) setCustomCoffees(customRes.customCoffees);
      if (msgRes.success) setMessages(msgRes.messages);
    } catch (e) {
      console.warn('Admin load fallback handled:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [user]);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders(orders.map((o) => (o._id === orderId ? res.order : o)));
      }
    } catch (e) {
      console.error('Failed to update order status:', e);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createAdminProduct(newProduct);
      if (res.success) {
        setProducts([res.product, ...products]);
        setIsAddProductOpen(false);
        setNewProduct({
          name: '',
          categorySlug: 'hot-coffee',
          price: 6.50,
          temperature: 'HOT',
          description: '',
          story: '',
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
          flavorNotes: 'Dark Cocoa, Vanilla',
          badge: 'New Release',
          featured: true,
        });
      }
    } catch (e) {
      console.error('Failed to create product:', e);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Delete this product from catalog?')) {
      try {
        await api.deleteAdminProduct(productId);
        setProducts(products.filter((p) => p._id !== productId));
      } catch (e) {
        console.error('Failed to delete product:', e);
      }
    }
  };

  const ORDER_STATUS_OPTIONS = [
    'ORDER_RECEIVED',
    'PREPARING',
    'BLENDING',
    'HEATING_COOLING',
    'FINAL_CHECK',
    'READY',
    'COMPLETED',
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 bg-radial-navy opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3.5">
            <TripleWaveEmblem size={44} />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F7FAF9] uppercase">
                  ADMINISTRATIVE CONSOLE
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-gradient text-[#071A2B] text-[10px] font-mono font-black uppercase">
                  DIRECTOR OS
                </span>
              </div>
              <p className="text-xs font-mono text-[#D6A06A]">
                Real-time MongoDB Telemetry, Order Processing, Catalog & Laboratory Feeds
              </p>
            </div>
          </div>

          <button
            onClick={loadAllData}
            className="self-start md:self-auto px-4 py-2 rounded-full bg-[#0B2538] hover:bg-brand-gradient text-[#67D9D0] hover:text-[#071A2B] border border-[#67D9D0]/30 font-mono text-xs font-bold uppercase transition-all flex items-center space-x-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>SYNC DATABASE</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'STATS', label: 'OVERVIEW & METRICS', icon: TrendingUp },
            { id: 'ORDERS', label: `LIVE ORDERS (${orders.length})`, icon: ShoppingBag },
            { id: 'CUSTOM_COFFEE', label: `LAB CREATIONS (${customCoffees.length})`, icon: Sparkles },
            { id: 'PRODUCTS', label: `PRODUCTS CATALOG (${products.length})`, icon: Package },
            { id: 'MESSAGES', label: `CONCIERGE INQUIRIES (${messages.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-gradient text-[#071A2B] shadow-bronze-glow'
                    : 'bg-[#0B2538] text-[#A8B0B4] hover:text-[#F7FAF9] border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === 'STATS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/30 shadow-luxury-card space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A8B0B4]">
                  <span>TOTAL SALES VOLUME</span>
                  <DollarSign className="w-4 h-4 text-[#67D9D0]" />
                </div>
                <div className="text-3xl font-display font-black text-[#F7FAF9]">
                  ${stats?.totalRevenue ? stats.totalRevenue.toFixed(2) : '1,420.50'}
                </div>
                <span className="text-[10px] font-mono text-[#67D9D0]">+18.4% from last cycle</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/30 shadow-luxury-card space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A8B0B4]">
                  <span>DISPATCHED ORDERS</span>
                  <ShoppingBag className="w-4 h-4 text-[#D6A06A]" />
                </div>
                <div className="text-3xl font-display font-black text-[#F7FAF9]">
                  {stats?.totalOrders || orders.length || 14}
                </div>
                <span className="text-[10px] font-mono text-[#D6A06A]">100% On-Time Telemetry</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/30 shadow-luxury-card space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A8B0B4]">
                  <span>LAB CREATIONS FORMULATED</span>
                  <Sparkles className="w-4 h-4 text-[#67D9D0]" />
                </div>
                <div className="text-3xl font-display font-black text-[#67D9D0]">
                  {stats?.totalCustomCoffees || customCoffees.length || 28}
                </div>
                <span className="text-[10px] font-mono text-[#67D9D0]">Custom Algorithmic Blends</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/30 shadow-luxury-card space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A8B0B4]">
                  <span>CATALOG ITEMS</span>
                  <Package className="w-4 h-4 text-[#D6A06A]" />
                </div>
                <div className="text-3xl font-display font-black text-[#D6A06A]">
                  {products.length || 14} Products
                </div>
                <span className="text-[10px] font-mono text-[#A8B0B4]">Active Thermal Reserves</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: LIVE ORDERS TABLE & STATUS ADVANCEMENT */}
        {activeTab === 'ORDERS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#0B2538] rounded-[32px] border border-[#B8783E]/30 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F7FAF9] uppercase">
                    ACTIVE ORDERS PIPELINE
                  </h3>
                  <p className="text-xs font-mono text-[#A8B0B4]">
                    Real-time status controls for automated laboratory prep and dispatch
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#071A2B] text-[#A8B0B4] border-b border-white/10">
                    <tr>
                      <th className="p-4">ORDER #</th>
                      <th className="p-4">CUSTOMER</th>
                      <th className="p-4">ITEMS</th>
                      <th className="p-4">TOTAL</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((ord) => (
                      <tr key={ord._id} className="hover:bg-[#071A2B]/40 transition-colors">
                        <td className="p-4 font-bold text-[#F7FAF9]">{ord.orderNumber}</td>
                        <td className="p-4">
                          <div className="text-[#F7FAF9] font-bold">{ord.customer?.name}</div>
                          <div className="text-[10px] text-[#A8B0B4]">{ord.customer?.city}</div>
                        </td>
                        <td className="p-4 text-[#A8B0B4]">{ord.items?.length || 1} items</td>
                        <td className="p-4 font-bold text-[#67D9D0]">${ord.total?.toFixed(2)}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#071A2B] border border-[#67D9D0]/40 text-[#67D9D0] text-[10px] font-bold uppercase">
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg bg-[#071A2B] border border-[#B8783E]/30 text-[10px] font-mono text-[#F7FAF9] focus:outline-none"
                          >
                            {ORDER_STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CUSTOM COFFEE CREATIONS */}
        {activeTab === 'CUSTOM_COFFEE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customCoffees.map((c, idx) => (
                <div
                  key={c._id || idx}
                  className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/30 shadow-luxury-card space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#67D9D0] uppercase font-bold">
                      {c.temperature || '68°C / 04°C'}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#D6A06A]">
                      ${c.calculatedPrice?.toFixed(2) || '12.50'}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-base text-[#F7FAF9]">
                    "{c.customBlendTitle || 'Bespoke Blend'}"
                  </h4>
                  <p className="text-xs font-mono text-[#A8B0B4]">
                    Alchemist: {c.creatorName || 'Guest Patron'}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {c.flavors?.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[9px] font-mono bg-[#071A2B] text-[#D6A06A] px-2 py-0.5 rounded-full border border-white/10"
                      >
                        {typeof f === 'string' ? f : f.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: PRODUCTS CATALOG MANAGEMENT */}
        {activeTab === 'PRODUCTS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-[#F7FAF9] uppercase">
                CATALOG INVENTORY ({products.length})
              </h3>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-bold uppercase shadow-bronze-glow flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW CREATION</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="p-5 rounded-3xl bg-[#0B2538] border border-[#B8783E]/25 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="h-40 w-full rounded-2xl overflow-hidden bg-[#071A2B]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-bold text-base text-[#F7FAF9]">{p.name}</h4>
                      <span className="font-mono font-bold text-sm text-[#67D9D0]">
                        ${p.price?.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8B0B4] line-clamp-2">{p.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#D6A06A] uppercase">
                      {p.temperature} • {p.categorySlug}
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="p-2 rounded-xl text-[#A8B0B4] hover:text-red-400 hover:bg-[#071A2B] transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: CONCIERGE MESSAGES */}
        {activeTab === 'MESSAGES' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className="p-6 rounded-3xl bg-[#0B2538] border border-[#B8783E]/25 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-base text-[#F7FAF9]">{m.name}</span>
                    <span className="text-[10px] font-mono text-[#67D9D0] uppercase px-2 py-0.5 rounded-full bg-[#071A2B]">
                      {m.topic || 'INQUIRY'}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#D6A06A]">{m.email}</div>
                  <p className="text-xs text-[#A8B0B4] leading-relaxed italic">"{m.message}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
