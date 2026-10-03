import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: 'CUSTOMER_SUPPORT',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      q: 'How does the "Make Your Coffee" virtual laboratory work?',
      a: 'Our digital laboratory allows you to choose your vacuum-sealed vessel, calibrate single-origin espresso bases, layer rare botanical and dessert flavor notes, and choose between thermal 68°C heated or sub-zero 04°C cryogenic cooling with real-time telemetry.',
    },
    {
      q: 'What makes your thermal bottles circular and sustainable?',
      a: 'We eliminate all single-use plastics and paper cups. Our vessels are made of 100% recyclable double-walled 18/8 stainless steel and aerospace titanium alloys, retaining sub-zero chill for up to 24 hours and thermal bloom heat for up to 18 hours.',
    },
    {
      q: 'Do you offer international shipping and local flagship delivery?',
      a: 'Yes, we operate automated Flagship Roastery Labs in Mumbai, Singapore, Dubai, London, New York, and Tokyo. Custom creations ordered within metropolitan zones are dispatched via climate-controlled EV courier in under 30 minutes.',
    },
    {
      q: 'Can I reorder my custom saved formula?',
      a: 'Absolutely. Every custom blend receives a unique telemetry certificate code stored in our system. You can reorder your signature blend with 1-click from your order tracking screen or laboratory profile.',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: 'CUSTOMER_SUPPORT',
          message: '',
        });
      }
    } catch (e) {
      console.error('Contact submission error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#071A2B] text-[#F7FAF9] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial-navy opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#67D9D0]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-[#B8783E]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#D6A06A] uppercase font-bold px-4 py-1.5 rounded-full bg-[#0B2538] border border-[#B8783E]/30"
          >
            <Mail className="w-3.5 h-3.5 text-[#B8783E]" />
            <span>GLOBAL CONCIERGE & INQUIRIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F7FAF9] uppercase"
          >
            CONTACT <br />
            <span className="text-gradient-brand">CONCIERGE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8B0B4] font-sans leading-relaxed"
          >
            Have questions regarding custom blend formulations, corporate laboratory catering, or international flagship partnerships? Our concierge team is at your service.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#0B2538]/80 rounded-[36px] p-8 sm:p-10 border border-[#B8783E]/30 shadow-luxury-card space-y-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-[#F7FAF9]">
                TRANSMIT AN INQUIRY
              </h2>
              <span className="text-xs font-mono text-[#67D9D0] flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>AVG RESPONSE: &lt; 4 HOURS</span>
              </span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-[#071A2B] border border-[#67D9D0]/30 text-[#F7FAF9] space-y-4 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#67D9D0]/10 text-[#67D9D0] flex items-center justify-center mx-auto border border-[#67D9D0]/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#F7FAF9]">Transmission Received</h3>
                <p className="text-xs font-mono text-[#A8B0B4] max-w-md mx-auto leading-relaxed">
                  Your message has been routed to our Senior Beverage Concierge. A personalized response will be dispatched to your email address.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-3 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-bold uppercase hover:brightness-110 transition-all"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sophia Laurent"
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/50 focus:outline-none focus:border-[#67D9D0] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/50 focus:outline-none focus:border-[#67D9D0] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (800) 468-2665"
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/50 focus:outline-none focus:border-[#67D9D0] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs font-mono text-[#F7FAF9] focus:outline-none focus:border-[#67D9D0] transition-colors"
                    >
                      <option value="CUSTOMER_SUPPORT">Customer Experience Concierge</option>
                      <option value="FLAGSHIP_PARTNERSHIP">Flagship Roastery Partnership</option>
                      <option value="CORPORATE_CATERING">Corporate Custom Alchemy Bar</option>
                      <option value="PRESS_MEDIA">Press & Brand Inquiries</option>
                      <option value="OTHER">Other Telemetry Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Custom Roastery Collaboration or Support"
                    className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/50 focus:outline-none focus:border-[#67D9D0] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#D6A06A] uppercase block mb-1.5 font-bold">
                    Message Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your request, custom batch details, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-[#071A2B] border border-[#B8783E]/30 text-xs text-[#F7FAF9] placeholder-[#A8B0B4]/50 focus:outline-none focus:border-[#67D9D0] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-brand-gradient text-[#071A2B] font-mono text-xs font-black tracking-widest uppercase hover:brightness-110 shadow-luxury transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-[#071A2B] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT TO CONCIERGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Flagship Contacts & FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[36px] bg-[#0B2538]/80 text-[#F7FAF9] border border-[#67D9D0]/20 shadow-luxury-card space-y-5 backdrop-blur-md">
              <h3 className="font-display font-bold text-xl text-[#F7FAF9]">
                DIRECT CHANNELS
              </h3>
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center space-x-3 text-[#A8B0B4]">
                  <div className="p-2.5 rounded-xl bg-[#071A2B] text-[#67D9D0]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+1 (800) 468-2665 (Toll-Free Global)</span>
                </div>
                <div className="flex items-center space-x-3 text-[#A8B0B4]">
                  <div className="p-2.5 rounded-xl bg-[#071A2B] text-[#B8783E]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>concierge@hotcoolshake.com</span>
                </div>
                <div className="flex items-center space-x-3 text-[#A8B0B4]">
                  <div className="p-2.5 rounded-xl bg-[#071A2B] text-[#D6A06A]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Flagship Innovation Lab, SoHo, NY</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#D6A06A] uppercase px-1">
                FREQUENTLY ASKED QUESTIONS
              </h3>

              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0B2538]/60 border border-[#B8783E]/20 transition-all hover:border-[#67D9D0]/30"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between text-left font-display font-bold text-sm text-[#F7FAF9]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D6A06A] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-[#A8B0B4] font-sans mt-3 leading-relaxed"
                        >
                          {faq.a}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
