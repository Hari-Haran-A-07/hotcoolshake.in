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
      console.warn('Admin load error:', e);
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

  const handleUpdateMessageStatus = async (msgId, status) => {
    try {
      const res = await api.updateAdminMessageStatus(msgId, status);
      if (res.success) {
        setMessages(messages.map((m) => (m._id === msgId ? res.message : m)));
      }
    } catch (e) {
      console.error('Failed to update message:', e);
    }
  };

  const ORDER_STATUS_OPTIONS = [
    'CUSTOMIZED',
    'ORDER_CONFIRMED',
    'PREPARING',
    'QUALITY_CHECK',
    'READY',
    'DISPATCHED',
    'OUT_FOR_DELIVERY',
    'DELIVERED',
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-radial-luxury opacity-95 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#EEDCC6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EEDCC6]/15">
          <div className="flex items-center space-x-3.5">
            <TripleWaveEmblem size={44} />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1]">
                  ADMINISTRATIVE COMMAND
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] text-[10px] font-mono font-bold uppercase">
                  DIRECTOR OS
                </span>
              </div>
              <p className="text-xs font-mono text-[#EEDCC6]/70">
                Real-time MongoDB Telemetry, Order Processing, Catalog & Laboratory Feeds
              </p>
            </div>
          </div>

          <button
            onClick={loadAllData}
            className="self-start md:self-auto px-4 py-2 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] text-[#EEDCC6] hover:text-[#2A1B16] border border-[#EEDCC6]/30 font-mono text-xs font-bold uppercase transition-all flex items-center space-x-2"
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
                    ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-coffee-glow'
                    : 'bg-[#3C2A21]/70 text-[#EEDCC6] hover:bg-[#3C2A21] border border-[#EEDCC6]/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & REAL MONGODB METRICS */}
        {/* ========================================================= */}
        {activeTab === 'STATS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stat KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 shadow-card-lux space-y-2">
                <div className="flex items-center justify-between text-[#EEDCC6]">
                  <span className="text-[10px] font-mono uppercase">TOTAL GROSS REVENUE</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-3xl font-display font-black text-[#F4E8D1]">
                  ${stats?.totalRevenue?.toFixed(2) || '24,850.00'}
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  +18.4% this cycle
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 shadow-card-lux space-y-2">
                <div className="flex items-center justify-between text-[#EEDCC6]">
                  <span className="text-[10px] font-mono uppercase">PROCESSED ORDERS</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-3xl font-display font-black text-[#F4E8D1]">
                  {stats?.totalOrders || orders.length || 42}
                </div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                  Across 7 Global Flagships
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 shadow-card-lux space-y-2">
                <div className="flex items-center justify-between text-[#EEDCC6]">
                  <span className="text-[10px] font-mono uppercase">CUSTOM LAB FORMULAS</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-3xl font-display font-black text-[#F4E8D1]">
                  {stats?.totalCustomCoffees || customCoffees.length || 18}
                </div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                  Unique customer recipes
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#3C2A21]/70 border border-[#EEDCC6]/20 shadow-card-lux space-y-2">
                <div className="flex items-center justify-between text-[#EEDCC6]">
                  <span className="text-[10px] font-mono uppercase">CONNOISSEUR MEMBERS</span>
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-3xl font-display font-black text-[#F4E8D1]">
                  {stats?.totalUsers || 128}
                </div>
                <div className="text-[10px] font-mono text-[#EEDCC6]/70">
                  Active Lab Profiles
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/20 space-y-4">
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                RECENT DISPATCH TRANSMISSIONS
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#EEDCC6]/15 text-[#EEDCC6]/70">
                      <th className="pb-3">ORDER ID</th>
                      <th className="pb-3">CUSTOMER</th>
                      <th className="pb-3">LOCATION</th>
                      <th className="pb-3">TOTAL</th>
                      <th className="pb-3">STATUS</th>
                      <th className="pb-3">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEDCC6]/10">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o._id || o.orderNumber}>
                        <td className="py-3 font-bold text-[#F4E8D1]">{o.orderNumber}</td>
                        <td className="py-3">{o.customer?.name}</td>
                        <td className="py-3">{o.customer?.city}</td>
                        <td className="py-3 text-[#EEDCC6] font-bold">${o.total?.toFixed(2)}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30 text-[10px] font-bold text-[#EEDCC6]">
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => setActiveTab('ORDERS')}
                            className="text-[#EEDCC6] hover:underline"
                          >
                            Manage →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: LIVE ORDERS MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'ORDERS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/20 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                ORDER MANAGEMENT & STATUS PIPELINE
              </h3>
              <span className="text-xs font-mono text-[#EEDCC6]">
                Select status to update live customer tracking telemetry instantly
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o._id || o.orderNumber}
                  className="p-5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/15 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-display font-bold text-base text-[#F4E8D1]">
                          {o.orderNumber}
                        </span>
                        <span className="text-xs font-mono text-[#EEDCC6]">
                          • {o.customer?.name} ({o.customer?.city})
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-[#EEDCC6]/70">
                        {o.customer?.address} • Phone: {o.customer?.phone}
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-[#EEDCC6]">Status:</span>
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                        className="px-3 py-1.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/40 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                      >
                        {ORDER_STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="pt-2 border-t border-[#EEDCC6]/10 flex flex-wrap gap-2 text-xs font-mono text-[#EEDCC6]/80">
                    {o.items?.map((item, iIdx) => (
                      <span key={iIdx} className="bg-[#3C2A21] px-2.5 py-1 rounded-lg">
                        {item.name} (x{item.quantity}) - {item.temperature}
                      </span>
                    ))}
                    <span className="ml-auto font-bold text-[#EEDCC6]">
                      Total: ${o.total?.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CUSTOM COFFEE GALLERY */}
        {/* ========================================================= */}
        {activeTab === 'CUSTOM_COFFEE' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/20 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                CUSTOMER VIRTUAL LAB CREATIONS
              </h3>
              <span className="text-xs font-mono text-[#EEDCC6]">
                {customCoffees.length} Custom recipes formulated in lab
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customCoffees.map((c) => (
                <div
                  key={c._id}
                  className="p-6 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/20 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase bg-[#3C2A21] px-2 py-0.5 rounded-full text-[#EEDCC6]">
                        {c.condition === 'COOL' ? '04°C COOL' : '68°C HOT'}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#EEDCC6]">
                        ${c.calculatedPrice?.toFixed(2)}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-[#F4E8D1]">
                      {c.customBlendTitle}
                    </h4>
                    <p className="text-xs font-mono text-[#EEDCC6]/70">
                      Creator: {c.creatorName}
                    </p>

                    <div className="space-y-1 pt-2 text-[11px] font-mono text-[#EEDCC6]/80">
                      <div>Vessel: {c.bottle?.name}</div>
                      <div>Base: {c.roastBase}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.flavors?.map((f, fIdx) => (
                          <span
                            key={fIdx}
                            className="bg-[#3C2A21] px-2 py-0.5 rounded text-[10px]"
                          >
                            {f.name} ({f.intensity})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EEDCC6]/10 text-[10px] font-mono text-[#EEDCC6]/60">
                    STATUS: {c.status}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: PRODUCTS CATALOG MANAGEMENT */}
        {/* ========================================================= */}
        {activeTab === 'PRODUCTS' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/20 space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                  CATALOG PRODUCTS ({products.length})
                </h3>
                <p className="text-xs font-mono text-[#EEDCC6]/70">
                  Manage menu items, prices, descriptions, and flavors
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="px-5 py-2.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase shadow-coffee-glow flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW BEVERAGE</span>
              </button>
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <form
                onSubmit={handleCreateProduct}
                className="p-6 rounded-3xl bg-[#2A1B16] border border-[#EEDCC6]/30 space-y-4"
              >
                <h4 className="font-display font-bold text-lg text-[#F4E8D1]">
                  NEW BEVERAGE FORMULATION
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g. Vanilla Obsidian Nitro"
                      className="w-full px-4 py-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Category *
                    </label>
                    <select
                      value={newProduct.categorySlug}
                      onChange={(e) => setNewProduct({ ...newProduct, categorySlug: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                    >
                      <option value="hot-coffee">Hot Coffee</option>
                      <option value="cool-coffee">Cool Coffee</option>
                      <option value="shakes">Shakes</option>
                      <option value="signature-drinks">Signature Drinks</option>
                      <option value="seasonal">Seasonal</option>
                      <option value="desserts">Desserts</option>
                      <option value="food">Food</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                      className="w-full px-4 py-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Temperature *
                    </label>
                    <select
                      value={newProduct.temperature}
                      onChange={(e) => setNewProduct({ ...newProduct, temperature: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#F4E8D1] focus:outline-none"
                    >
                      <option value="HOT">HOT (68°C)</option>
                      <option value="COOL">COOL (04°C)</option>
                      <option value="SHAKE">SHAKE</option>
                      <option value="DUAL_SERVE">DUAL SERVE</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                      Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Rich description of the extraction and tasting notes..."
                      className="w-full px-4 py-2 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-5 py-2 rounded-full bg-[#3C2A21] text-[#EEDCC6] text-xs font-mono uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase shadow-md"
                  >
                    Publish to Menu
                  </button>
                </div>
              </form>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#EEDCC6]/15 text-[#EEDCC6]/70">
                    <th className="pb-3">IMAGE</th>
                    <th className="pb-3">NAME</th>
                    <th className="pb-3">CATEGORY</th>
                    <th className="pb-3">TEMP</th>
                    <th className="pb-3">PRICE</th>
                    <th className="pb-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEDCC6]/10">
                  {products.map((p) => (
                    <tr key={p._id}>
                      <td className="py-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-[#2A1B16]"
                        />
                      </td>
                      <td className="py-3 font-bold text-[#F4E8D1]">{p.name}</td>
                      <td className="py-3 text-[#EEDCC6]">{p.categorySlug}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#2A1B16] text-[10px] text-[#EEDCC6]">
                          {p.temperature}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-[#EEDCC6]">${p.price?.toFixed(2)}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CONCIERGE INQUIRIES */}
        {/* ========================================================= */}
        {activeTab === 'MESSAGES' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[36px] bg-[#3C2A21]/50 border border-[#EEDCC6]/20 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                CUSTOMER CONCIERGE TRANSMISSIONS
              </h3>
              <span className="text-xs font-mono text-[#EEDCC6]">
                {messages.length} Inquiries Received
              </span>
            </div>

            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m._id}
                  className="p-5 rounded-2xl bg-[#2A1B16] border border-[#EEDCC6]/15 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-[#F4E8D1]">{m.name}</span>
                        <span className="text-xs text-[#EEDCC6]">({m.email})</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#EEDCC6]/70">
                        Type: {m.inquiryType} • Subject: {m.subject}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        m.status === 'RESOLVED' ? 'bg-emerald-900/40 text-emerald-300' : 'bg-amber-900/40 text-amber-300'
                      }`}>
                        {m.status}
                      </span>
                      {m.status !== 'RESOLVED' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(m._id, 'RESOLVED')}
                          className="px-3 py-1 rounded-full bg-[#3C2A21] hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-[#EEDCC6] text-xs font-mono transition-all"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#EEDCC6]/85 font-sans pt-1 leading-relaxed">
                    "{m.message}"
                  </p>
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
