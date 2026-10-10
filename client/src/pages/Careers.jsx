import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripleWaveEmblem } from '../components/common/TripleWaveLogo';
import {
  Briefcase,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  Building,
  GraduationCap,
} from 'lucide-react';

export const Careers = () => {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedRole, setSelectedRole] = useState(null);
  const [applicant, setApplicant] = useState({ name: '', email: '', phone: '', portfolio: '', resumeNotes: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = [
    'ALL',
    'BEVERAGE ALCHEMY & ROASTING',
    'STORE OPERATIONS & HOSPITALITY',
    'ENGINEERING & DIGITAL LAB',
    'CREATIVE & INDUSTRIAL DESIGN',
  ];

  const jobs = [
    {
      id: 1,
      department: 'BEVERAGE ALCHEMY & ROASTING',
      title: 'Lead Sensory Scientist & Cupper',
      location: 'London / Global Roastery Lab',
      type: 'Full-time',
      experience: '4+ Years in Specialty Coffee',
      description: 'Lead green bean evaluation, Q-Grader calibrations, and fluid-bed roasting profile design.',
      responsibilities: [
        'Curate single-origin lots with international partner farms scoring 86+ Q-grade',
        'Optimize thermodynamics for fluid-bed zero-emission roasting batches',
        'Design seasonal botanical syrup reductions and flavor extraction protocols',
      ],
    },
    {
      id: 2,
      department: 'STORE OPERATIONS & HOSPITALITY',
      title: 'Flagship Master Barista & Lab Guide',
      location: 'Singapore / Marina Bay Sands',
      type: 'Full-time',
      experience: '2+ Years Barista Experience',
      description: 'Operate automated extraction chambers, guide customer cupping sessions, and craft bespoke orders.',
      responsibilities: [
        'Deliver high-touch hospitality and guide guests through the Make Your Coffee lab',
        'Calibrate daily espresso grind distributions and nitrogen tap lines',
        'Maintain impeccable hygienic chamber telemetry standards',
      ],
    },
    {
      id: 3,
      department: 'ENGINEERING & DIGITAL LAB',
      title: 'Full-Stack Platform Engineer (MERN & IoT)',
      location: 'Remote / London Flagship Tech Hub',
      type: 'Full-time',
      experience: '3+ Years Web Architecture',
      description: 'Develop next-generation digital ordering systems, chamber telemetry WebSockets, and rewards ecosystem.',
      responsibilities: [
        'Build scalable microservices for live roasting telemetry and order dispatch',
        'Optimize responsive digital ordering web app with high-performance 60fps animations',
        'Integrate real-time courier GPS tracking and automated store routing',
      ],
    },
    {
      id: 4,
      department: 'CREATIVE & INDUSTRIAL DESIGN',
      title: 'Senior Ergonomic Vessel & Packaging Designer',
      location: 'Tokyo / London Atelier',
      type: 'Full-time',
      experience: '5+ Years Physical Product Design',
      description: 'Design zero-waste borosilicate glass vessels, titanium thermal flasks, and sustainable packaging.',
      responsibilities: [
        'Prototype double-wall vacuum vessels with ergonomic fluid dynamics and thermal retention',
        'Develop closed-loop circular return systems for flagship stores',
        'Collaborate with brand visual teams on premium laser-etched insignia',
      ],
    },
  ];

  const filteredJobs = selectedDept === 'ALL'
    ? jobs
    : jobs.filter((j) => j.department === selectedDept);

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

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
            <Briefcase className="w-3.5 h-3.5 text-[#EEDCC6]" />
            <span>JOIN THE CREW</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-[#F4E8D1] uppercase">
            SHAPE THE FUTURE OF <span className="text-[#EEDCC6]">COFFEE</span>
          </h1>

          <p className="text-base sm:text-lg font-sans text-[#EEDCC6]/80 font-normal leading-relaxed">
            We are coffee scientists, industrial designers, software engineers, and passionate baristas building the world’s most advanced coffee-commerce platform.
          </p>
        </div>

        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-3">
            <GraduationCap className="w-8 h-8 text-[#EEDCC6]" />
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">SENSORY & Q-GRADER SPONSORSHIP</h3>
            <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
              Full tuition coverage for international SCA certifications, barista championships, and Q-Grader licensing.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-3">
            <Building className="w-8 h-8 text-[#EEDCC6]" />
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">GLOBAL ROASTERY EXCHANGE</h3>
            <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
              Opportunities to work across our flagship roasteries in London, Singapore, Tokyo, and Mumbai.
            </p>
          </div>

          <div className="p-8 rounded-[28px] bg-[#3C2A21]/70 border border-[#EEDCC6]/25 space-y-3">
            <Sparkles className="w-8 h-8 text-[#EEDCC6]" />
            <h3 className="font-display font-bold text-xl text-[#F4E8D1]">UNLIMITED LAB ACCESS</h3>
            <p className="text-xs text-[#EEDCC6]/75 font-sans leading-relaxed">
              Complimentary specialty whole bean allocations, bespoke lab vessels, and daily handcrafted coffee.
            </p>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-[#EEDCC6] text-[#2A1B16] shadow-md'
                  : 'bg-[#3C2A21] text-[#EEDCC6]/70 hover:text-[#F4E8D1] border border-[#EEDCC6]/20'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => {
                setSelectedRole(job);
                setIsSubmitted(false);
              }}
              className="bg-[#3C2A21]/70 border border-[#EEDCC6]/25 rounded-[28px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#EEDCC6]/50 transition-all cursor-pointer group shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-xs font-mono text-[#EEDCC6]">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2A1B16] border border-[#EEDCC6]/30">
                    {job.department}
                  </span>
                  <span>{job.type}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#F4E8D1] group-hover:text-[#EEDCC6] transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-[#EEDCC6]/75 font-sans">
                  {job.description}
                </p>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 flex-shrink-0">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-[#EEDCC6]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#EEDCC6]" />
                  <span>{job.location}</span>
                </div>
                <span className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase group-hover:bg-[#F4E8D1] transition-all">
                  <span>APPLY NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Application Modal */}
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#2A1B16] border-2 border-[#EEDCC6]/40 rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative space-y-6"
            >
              <button
                onClick={() => setSelectedRole(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#3C2A21] border border-[#EEDCC6]/30 text-[#EEDCC6] hover:text-[#F4E8D1]"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="space-y-2 pr-8">
                    <span className="text-xs font-mono text-[#EEDCC6] uppercase font-bold">
                      {selectedRole.department} • {selectedRole.location}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F4E8D1] uppercase">
                      {selectedRole.title}
                    </h2>
                    <p className="text-xs text-[#EEDCC6]/80 font-sans">
                      {selectedRole.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#3C2A21] border border-[#EEDCC6]/20 space-y-2 text-xs">
                    <span className="font-mono text-[#EEDCC6] font-bold block uppercase">KEY FOCUS AREAS:</span>
                    <ul className="space-y-1 text-[#F4E8D1]">
                      {selectedRole.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#EEDCC6] flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={handleSubmitApplication} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={applicant.name}
                          onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={applicant.email}
                          onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={applicant.phone}
                          onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                          Portfolio / LinkedIn
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={applicant.portfolio}
                          onChange={(e) => setApplicant({ ...applicant, portfolio: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-mono text-[#EEDCC6] uppercase block mb-1">
                          Tell Us About Your Coffee Philosophy / Background
                        </label>
                        <textarea
                          rows="3"
                          value={applicant.resumeNotes}
                          onChange={(e) => setApplicant({ ...applicant, resumeNotes: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-[#3C2A21] border border-[#EEDCC6]/30 text-xs text-[#F4E8D1] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#F4E8D1] transition-all flex items-center justify-center space-x-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT CANDIDACY</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#3C2A21] border border-[#EEDCC6] text-[#EEDCC6] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#F4E8D1]">APPLICATION TRANSMITTED</h3>
                  <p className="text-xs text-[#EEDCC6]/80 max-w-md mx-auto">
                    Thank you, {applicant.name}. Our talent & sensory lead will review your application for the {selectedRole.title} position and reach out within 48 hours.
                  </p>
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="px-6 py-2.5 rounded-full bg-[#EEDCC6] text-[#2A1B16] font-mono text-xs font-bold uppercase mt-4"
                  >
                    BACK TO OPEN ROLES
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;
