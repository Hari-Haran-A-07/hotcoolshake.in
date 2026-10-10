import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { TripleWaveEmblem } from './TripleWaveLogo';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Key } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    closeAuthModal,
    login,
    register,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authModalMode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (role) => {
    if (role === 'admin') {
      setFormData({
        name: 'HOT COOL SHAKE Director',
        email: 'admin@hotcoolshake.com',
        password: 'admin123',
        phone: '+1 (800) 468-2665',
      });
      setAuthModalMode('login');
    } else {
      setFormData({
        name: 'Sophia Laurent',
        email: 'sophia@example.com',
        password: 'user123',
        phone: '+1 (555) 321-9876',
      });
      setAuthModalMode('login');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-[#2A1B16]/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#3C2A21] text-[#F4E8D1] rounded-[32px] overflow-hidden border-2 border-[#EEDCC6]/30 shadow-2xl z-10 p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#2A1B16] text-[#EEDCC6]/70 hover:text-[#F4E8D1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex justify-center mb-1">
              <TripleWaveEmblem size={56} animate />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-black text-[#F4E8D1] uppercase">
              {authModalMode === 'login' ? 'SIGN IN TO YOUR ACCOUNT' : 'CREATE VIP ACCOUNT'}
            </h3>
            <p className="text-xs font-mono text-[#EEDCC6]">
              HOT COOL SHAKE • AUTHENTICATION
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'register' && (
              <div>
                <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#EEDCC6]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sophia Laurent"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                VIP Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#EEDCC6]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sophia@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#EEDCC6]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>
            </div>

            {authModalMode === 'register' && (
              <div>
                <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] placeholder-[#EEDCC6]/40 focus:outline-none focus:border-[#EEDCC6]"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black tracking-widest uppercase shadow-xl hover:bg-[#F4E8D1] transition-all disabled:opacity-50 mt-2"
            >
              {loading
                ? 'AUTHENTICATING...'
                : authModalMode === 'login'
                ? 'ENTER VIP LAB'
                : 'CREATE ACCOUNT'}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-4 border-t border-[#EEDCC6]/20 text-center space-y-2">
            <span className="text-[10px] font-mono text-[#EEDCC6]/70 uppercase block">
              ONE-CLICK DEMO CREDENTIALS
            </span>
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleFillDemo('user')}
                className="px-3 py-1.5 rounded-lg bg-[#2A1B16] hover:bg-[#2A1B16]/80 text-[#EEDCC6] border border-[#EEDCC6]/30 text-[10px] font-mono"
              >
                Demo Patron
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-3 py-1.5 rounded-lg bg-[#2A1B16] hover:bg-[#2A1B16]/80 text-[#F4E8D1] border border-[#EEDCC6]/30 text-[10px] font-mono"
              >
                Director Admin
              </button>
            </div>
          </div>

          {/* Toggle Register/Login */}
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setError('');
                setAuthModalMode(authModalMode === 'login' ? 'register' : 'login');
              }}
              className="text-xs font-mono text-[#EEDCC6]/70 hover:text-[#F4E8D1] transition-colors"
            >
              {authModalMode === 'login'
                ? "Don't have a VIP account? Register here."
                : 'Already have an account? Sign in here.'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
