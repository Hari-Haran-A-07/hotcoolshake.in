import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Sparkles, Mail, Check, Globe } from 'lucide-react';
import { TripleWaveLogo } from '../components/common/TripleWaveLogo';
import { updatePageMeta } from '../utils/seo';

export const PressKit = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    updatePageMeta({
      title: 'Press & Media Kit',
      description: 'Official HOT COOL SHAKE media assets, brand guidelines, editorial photography, and press releases.',
    });
  }, []);

  const pressReleases = [
    {
      date: 'OCTOBER 2026',
      title: 'HOT COOL SHAKE Unveils Revolutionary Aero-Grid™ Precision Temperature Bottling System',
      outlet: 'Global Beverage Wire',
      tag: 'TECH INNOVATION',
    },
    {
      date: 'SEPTEMBER 2026',
      title: 'Flagship Roastery Opens on Fifth Avenue with 24-Tap Nitrogen & Cryo-Infusion Wall',
      outlet: 'Architectural Digest & Epicurean',
      tag: 'GLOBAL EXPANSION',
    },
    {
      date: 'AUGUST 2026',
      title: 'Zero-Emission Direct-Trade Sourcing Initiative Achieves 100% Regenerative Coffee Certification',
      outlet: 'Sustainable Living Chronicle',
      tag: 'ESG & ETHICS',
    },
  ];

  const brandColors = [
    { name: 'Espresso Noir', hex: '#2A1B16', role: 'Primary Background' },
    { name: 'Champagne Crema', hex: '#EEDCC6', role: 'Primary Typography' },
    { name: 'Imperial Gold', hex: '#C49A45', role: 'Luxury Accent' },
    { name: 'Roaster Dark', hex: '#1C120C', role: 'Deep Surface' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-[#F4E8D1]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/20 text-xs font-mono text-[#C49A45] uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL MEDIA RESOURCES</span>
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          Press & Brand Kit
        </h1>
        <p className="text-sm sm:text-base text-[#EEDCC6]/70 font-sans leading-relaxed">
          Welcome to the official press center for HOT COOL SHAKE. Download approved high-resolution logos, brand guidelines, lifestyle photography, and company fact sheets.
        </p>
      </motion.div>

      {/* Brand Asset Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#3C2A21]/40 border border-[#EEDCC6]/15 hover:border-[#EEDCC6]/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#2A1B16] flex items-center justify-center border border-[#EEDCC6]/10 h-32">
              <TripleWaveLogo size="lg" />
            </div>
            <h3 className="font-serif text-lg font-bold">Vector Logo Kit</h3>
            <p className="text-xs text-[#EEDCC6]/70 leading-relaxed font-mono">
              Vector SVG and high-resolution PNG lockups in dark, light, and monochrome editions.
            </p>
          </div>
          <a
            href="/favicon.svg"
            download="HOT_COOL_SHAKE_LOGO.svg"
            className="mt-6 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/25 hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-xs font-mono font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD VECTOR (.SVG)</span>
          </a>
        </div>

        <div className="p-6 rounded-2xl bg-[#3C2A21]/40 border border-[#EEDCC6]/15 hover:border-[#EEDCC6]/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#2A1B16] flex items-center justify-center border border-[#EEDCC6]/10 h-32 text-center">
              <FileText className="w-12 h-12 text-[#C49A45]" />
            </div>
            <h3 className="font-serif text-lg font-bold">Company Fact Sheet</h3>
            <p className="text-xs text-[#EEDCC6]/70 leading-relaxed font-mono">
              Fast facts: 24 flagships across 9 countries, Chamber-X thermodynamics, patented cryo-bottles.
            </p>
          </div>
          <button
            onClick={() => alert('Fast Facts summary generated in browser.')}
            className="mt-6 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/25 hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-xs font-mono font-bold transition-all"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD FACTS (PDF)</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#3C2A21]/40 border border-[#EEDCC6]/15 hover:border-[#EEDCC6]/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#2A1B16] flex items-center justify-center border border-[#EEDCC6]/10 h-32">
              <ImageIcon className="w-12 h-12 text-[#EEDCC6]" />
            </div>
            <h3 className="font-serif text-lg font-bold">High-Res Roastery Photography</h3>
            <p className="text-xs text-[#EEDCC6]/70 leading-relaxed font-mono">
              Ultra HD photography of our marble extraction bars, roasting drums, and thermal vessels.
            </p>
          </div>
          <button
            onClick={() => window.open('https://unsplash.com', '_blank')}
            className="mt-6 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-[#2A1B16] border border-[#EEDCC6]/25 hover:bg-[#EEDCC6] hover:text-[#2A1B16] text-xs font-mono font-bold transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>MEDIA ASSET GALLERY</span>
          </button>
        </div>
      </div>

      {/* Brand Color System */}
      <div className="mt-16 p-8 rounded-2xl bg-[#3C2A21]/20 border border-[#EEDCC6]/15">
        <h3 className="font-serif text-2xl font-bold mb-2">Signature Brand Palette</h3>
        <p className="text-xs font-mono text-[#EEDCC6]/60 mb-6">Standard brand color definitions for digital and print reproduction.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brandColors.map((col) => (
            <div key={col.hex} className="rounded-xl p-4 bg-[#2A1B16] border border-[#EEDCC6]/10 space-y-2">
              <div className="h-14 rounded-lg shadow-inner" style={{ backgroundColor: col.hex }} />
              <div>
                <p className="font-serif text-sm font-bold">{col.name}</p>
                <p className="font-mono text-xs text-[#C49A45] font-bold">{col.hex}</p>
                <p className="font-mono text-[10px] text-[#EEDCC6]/50">{col.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Press Releases */}
      <div className="mt-16 space-y-4">
        <h3 className="font-serif text-2xl font-bold">Recent Press Releases</h3>
        <div className="space-y-3">
          {pressReleases.map((pr, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#3C2A21]/30 border border-[#EEDCC6]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#C49A45]/20 text-[#C49A45] border border-[#C49A45]/30">
                    {pr.tag}
                  </span>
                  <span className="text-xs font-mono text-[#EEDCC6]/50">{pr.date}</span>
                </div>
                <h4 className="font-serif text-base font-semibold text-[#F4E8D1]">{pr.title}</h4>
                <p className="text-xs font-mono text-[#EEDCC6]/60">Source: {pr.outlet}</p>
              </div>
              <button
                onClick={() => alert(`Full release: ${pr.title}`)}
                className="self-start sm:self-center px-4 py-2 rounded-lg bg-[#2A1B16] border border-[#EEDCC6]/20 text-xs font-mono hover:bg-[#EEDCC6] hover:text-[#2A1B16] transition-all"
              >
                Read Article
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PR Contact Desk */}
      <div className="mt-16 text-center p-8 rounded-2xl bg-[#3C2A21]/40 border border-[#EEDCC6]/15 max-w-xl mx-auto space-y-3">
        <Mail className="w-8 h-8 text-[#C49A45] mx-auto" />
        <h4 className="font-serif text-xl font-bold">Media Inquiries</h4>
        <p className="text-xs text-[#EEDCC6]/70 leading-relaxed font-mono">
          Journalists, broadcast teams, and editors may reach out to our global press desk at{' '}
          <a href="mailto:press@hotcoolshake.in" className="text-[#C49A45] underline font-bold">
            press@hotcoolshake.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PressKit;
