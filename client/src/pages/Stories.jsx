import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  BookOpen,
  Sparkles,
  Clock,
  User,
  ArrowRight,
  X,
  Share2,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export const Stories = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStory, setSelectedStory] = useState(null);

  const categories = [
    'ALL',
    'ROASTING CRAFT',
    'SENSORY LAB',
    'GLOBAL ORIGINS',
    'SUSTAINABILITY',
    'CULTURE',
  ];

  const stories = [
    {
      id: 1,
      category: 'ROASTING CRAFT',
      title: 'The Thermodynamics of Convection Roasting: 0.1°C Precision',
      subtitle: 'How zero-emission fluid bed roasting unlocks delicate origin terpenes.',
      date: 'OCTOBER 2026',
      readTime: '5 MIN READ',
      author: 'Marcus Vance, Head of Roasting Science',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
      content: `Traditional drum roasting relies heavily on conductive heat transfer, which can inadvertently scorch bean cellular structures and mask delicate floral aromatics. At HOT COOL SHAKE, our fluid-bed convection chambers suspend each green bean in an aerodynamic vortex of heated air.
      
By calibrating the thermal gradient down to 0.1°C per second, the Maillard reactions unfold with surgical precision. This preserves volatile origin compounds—such as the jasmine floral notes in Ethiopian Yirgacheffe and the stone-fruit acidity of Colombian Pink Bourbon—without generating charred bitterness.`,
    },
    {
      id: 2,
      category: 'SENSORY LAB',
      title: 'HOT vs COOL: How Temperature Modulates Taste Perception',
      subtitle: 'The physiological science of why hot coffee emphasizes sweetness while cold brew heightens clarity.',
      date: 'SEPTEMBER 2026',
      readTime: '6 MIN READ',
      author: 'Dr. Elena Rostova, Sensory Director',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
      content: `Human taste receptors (TRPM5 ion channels) exhibit heightened sensitivity between 15°C and 35°C. At 68°C, our Hot creations activate retronasal olfaction, filling the palate with buttery lipids and rich caramelized notes.
      
Conversely, when coffee is cryogenically flash-chilled to 04°C without ice dilution, volatile acids stabilize, bringing an exceptionally crisp, velvety mouthfeel and refreshing finish. Our bespoke Make Your Coffee lab empowers you to calibrate this thermal relationship directly.`,
    },
    {
      id: 3,
      category: 'GLOBAL ORIGINS',
      title: 'High Altitude Harvest: Inside the Fog Forests of Guji',
      subtitle: 'A photographic journey into the 2,200-meter cloud forest farms of southern Ethiopia.',
      date: 'SEPTEMBER 2026',
      readTime: '4 MIN READ',
      author: 'Tadele Kebede, Origin Sourcing Lead',
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=1200&auto=format&fit=crop',
      content: `In the Guji Highlands, coffee is not merely grown—it thrives wild beneath the canopy of indigenous acacia and wanza trees. The extreme diurnal temperature variation (warm sunny afternoons followed by crisp sub-10°C nights) slows cherry maturation, allowing dense sugars to concentrate inside the bean parchment.
      
Through our Direct Sourcing Initiative, we work alongside 120 smallholder farming families, paying premiums that directly fund clean community water wells and organic soil rejuvenation programs.`,
    },
    {
      id: 4,
      category: 'SUSTAINABILITY',
      title: 'Zero Single-Use: The Architecture of Our Thermal Vessels',
      subtitle: 'Why we engineered hand-blown borosilicate and titanium vessels instead of disposable cups.',
      date: 'AUGUST 2026',
      readTime: '5 MIN READ',
      author: 'Sarah Lin, Chief Industrial Designer',
      image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1200&auto=format&fit=crop',
      content: `Over 16 billion single-use paper cups end up in landfills annually due to non-recyclable polyethylene inner linings. At HOT COOL SHAKE, we rejected this compromise.
      
Every vessel in our catalog is built for thousands of lifecycle brews. Double-wall vacuum borosilicate glass and aeronautical titanium ensure your coffee stays at exact thermal equilibrium—hot for 12 hours or cold for 24 hours—with zero environmental waste.`,
    },
    {
      id: 5,
      category: 'CULTURE',
      title: 'The Art of the Shake: Reimagining Blended Coffee',
      subtitle: 'Moving beyond sugary syrups toward nitrogen micro-aeration and culinary botanical infusions.',
      date: 'AUGUST 2026',
      readTime: '4 MIN READ',
      author: 'Julian Thorne, Beverage Alchemist',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop',
      content: `For decades, blended iced coffee has been dominated by artificial powdered bases and high-fructose syrups. Our SHAKE philosophy redefines this category through acoustic vortex blending and nitrogen micro-aeration.
      
By emulsifying cold-pressed oat milk, single-origin espresso concentrates, and whole botanical spices under dynamic pressure, we achieve a luxurious, mousse-like texture that celebrates the authentic character of the coffee bean.`,
    },
  ];

  const filteredStories = selectedCategory === 'ALL'
    ? stories
    : stories.filter((s) => s.category === selectedCategory);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#2A1B16] text-[#F4E8D1] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EEDCC6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#3C2A21]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono font-bold tracking-widest text-[#EEDCC6] uppercase shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>EDITORIAL JOURNAL & RESEARCH</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            STORIES FROM THE <span className="text-[#EEDCC6]">LAB</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#EEDCC6]/80 font-normal leading-relaxed">
            Explorations in roasting physics, terroir expeditions, sustainable design, and sensory gastronomy.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md'
                  : 'bg-[#3C2A21] text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Top Story */}
        {filteredStories.length > 0 && (
          <div
            onClick={() => setSelectedStory(filteredStories[0])}
            className="bg-[#3C2A21]/70 border border-[#EEDCC6]/30 rounded-[32px] overflow-hidden shadow-2xl cursor-pointer group hover:border-[#EEDCC6]/60 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[380px] bg-[#2A1B16] overflow-hidden">
                <img
                  src={filteredStories[0].image}
                  alt={filteredStories[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/40 text-[#EEDCC6] font-mono text-[10px] font-bold uppercase">
                  FEATURED EDITORIAL
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs font-mono text-[#EEDCC6]">
                    <span>{filteredStories[0].category}</span>
                    <span>•</span>
                    <span>{filteredStories[0].readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase group-hover:text-[#EEDCC6] transition-colors">
                    {filteredStories[0].title}
                  </h2>

                  <p className="text-sm font-sans text-[#EEDCC6]/80 leading-relaxed">
                    {filteredStories[0].subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/20 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#EEDCC6]/60">
                    By {filteredStories[0].author}
                  </span>
                  <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[#EEDCC6]">
                    <span>READ ESSAY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.slice(1).map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-[#EEDCC6]/50 transition-all shadow-lg group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden bg-[#2A1B16]">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#2A1B16]/90 border border-[#EEDCC6]/30 text-[#EEDCC6] font-mono text-[9px] font-bold uppercase">
                  {story.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-[#EEDCC6]/70">
                    <span>{story.date}</span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#F4E8D1] group-hover:text-[#EEDCC6] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs font-sans text-[#EEDCC6]/75 line-clamp-2 leading-relaxed">
                    {story.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EEDCC6]/15 flex items-center justify-between text-xs font-mono text-[#EEDCC6]">
                  <span className="truncate max-w-[180px] text-[#EEDCC6]/60">
                    {story.author}
                  </span>
                  <span className="font-bold flex items-center space-x-1">
                    <span>READ</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#2A1B16] border-2 border-[#EEDCC6]/40 rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative space-y-6"
            >
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#EEDCC6] hover:text-[#F4E8D1]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[10px] font-mono font-bold text-[#EEDCC6] uppercase">
                  <span>{selectedStory.category}</span>
                  <span>•</span>
                  <span>{selectedStory.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-display font-black text-[#F4E8D1] uppercase">
                  {selectedStory.title}
                </h2>

                <div className="flex items-center space-x-3 text-xs font-mono text-[#EEDCC6]/70">
                  <span>By {selectedStory.author}</span>
                  <span>•</span>
                  <span>{selectedStory.date}</span>
                </div>
              </div>

              <div className="h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#3C2A21]">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-sm sm:text-base font-sans text-[#F4E8D1] leading-relaxed whitespace-pre-line space-y-4">
                {selectedStory.content}
              </div>

              <div className="pt-6 border-t border-[#EEDCC6]/20 flex justify-between items-center">
                <button
                  onClick={() => alert('Article link copied to clipboard!')}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs font-mono text-[#EEDCC6]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE ESSAY</span>
                </button>

                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stories;
