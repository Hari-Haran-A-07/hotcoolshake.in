import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api';
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown, Sparkles, Send, MessageSquare } from 'lucide-react';

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
      a: 'Our digital laboratory allows you to choose your vacuum-sealed vessel, calibrate single-origin espresso bases, layer rare botanical and dessert flavor notes, and choose between thermal 68°C heated or sub-zero 04°C cryogenic cooling.',
    },
    {
      q: 'What makes your thermal bottles circular and sustainable?',
      a: 'We eliminate all single-use plastics and paper cups. Our vessels are made of 100% recyclable double-walled 18/8 stainless steel and aerospace titanium alloys, retaining sub-zero chill for up to 32 hours and boiling heat for up to 18 hours.',
    },
    {
      q: 'Do you offer international shipping and local flagship delivery?',
      a: 'Yes, we operate automated Flagship Roastery Labs in Mumbai, Singapore, Dubai, London, New York, Tokyo, and Sydney. Custom creations ordered within these metropolitan zones are dispatched via climate-controlled EV courier in under 30 minutes.',
    },
    {
      q: 'Can I reorder my custom saved formula?',
      a: 'Absolutely. Every custom blend receives a unique telemetry certificate code stored in our database. You can reorder your signature blend with 1-click from your order tracking screen or laboratory profile.',
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
    <div className="min-h-screen pt-28 pb-24 bg-[#F4E8D1] text-[#2A1B16] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest text-[#3C2A21] uppercase font-bold px-4 py-1.5 rounded-full bg-[#EEDCC6] border border-[#3C2A21]/20">
            <Mail className="w-3.5 h-3.5" />
            <span>GLOBAL CONCIERGE & INQUIRIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#2A1B16] uppercase">
            CONTACT CONCIERGE.
          </h1>
          <p className="text-xs sm:text-sm text-[#3C2A21]/80 font-sans">
            Have questions regarding custom blend formulations, corporate laboratory catering, or international flagship partnerships?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-[#EEDCC6]/50 rounded-[36px] p-8 sm:p-10 border border-[#3C2A21]/15 shadow-card-lux space-y-6">
            <h2 className="text-2xl font-display font-bold text-[#2A1B16]">
              TRANSMIT AN INQUIRY
            </h2>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#2A1B16] text-[#F4E8D1] space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-[#EEDCC6] mx-auto" />
                <h3 className="font-display font-bold text-lg">Inquiry Transmitted</h3>
                <p className="text-xs font-mono text-[#EEDCC6]/80">
                  Our international coffee concierge will respond to your transmission within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Sophia Laurent"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs text-[#2A1B16] focus:outline-none focus:border-[#2A1B16]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sophia@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs text-[#2A1B16] focus:outline-none focus:border-[#2A1B16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (800) 468-2665"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs text-[#2A1B16] focus:outline-none focus:border-[#2A1B16]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs font-mono text-[#2A1B16] focus:outline-none"
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
                  <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Custom Roastery Collaboration or Support"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs text-[#2A1B16] focus:outline-none focus:border-[#2A1B16]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#3C2A21] uppercase block mb-1">
                    Message Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your request or questions..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F4E8D1] border border-[#3C2A21]/20 text-xs text-[#2A1B16] focus:outline-none focus:border-[#2A1B16]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-[#2A1B16] hover:bg-[#3C2A21] text-[#F4E8D1] font-mono text-xs font-black tracking-widest uppercase shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'TRANSMITTING...' : 'TRANSMIT TO CONCIERGE'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Flagship Contacts & FAQ Accordion */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[36px] bg-[#2A1B16] text-[#F4E8D1] border border-[#EEDCC6]/20 shadow-2xl space-y-4">
              <h3 className="font-display font-bold text-xl text-[#F4E8D1]">
                DIRECT CHANNELS
              </h3>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center space-x-3 text-[#EEDCC6]">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) 468-2665 (Toll-Free Global)</span>
                </div>
                <div className="flex items-center space-x-3 text-[#EEDCC6]">
                  <Mail className="w-4 h-4" />
                  <span>concierge@hotcoolshake.com</span>
                </div>
                <div className="flex items-center space-x-3 text-[#EEDCC6]">
                  <MapPin className="w-4 h-4" />
                  <span>Flagship Innovation Lab, SoHo, NY</span>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold tracking-widest text-[#3C2A21] uppercase px-1">
                FREQUENTLY ASKED QUESTIONS
              </h3>

              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#EEDCC6]/60 border border-[#3C2A21]/15 transition-all"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between text-left font-display font-bold text-sm text-[#2A1B16]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#3C2A21] transition-transform ${
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
                          className="text-xs text-[#3C2A21]/80 font-sans mt-2.5 leading-relaxed"
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
