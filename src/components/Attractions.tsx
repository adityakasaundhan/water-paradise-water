import React, { useState } from 'react';
import { ATTRACTIONS } from '../data';
import { Attraction } from '../types';
import { Sparkles, Compass, ShieldAlert, Zap, Layers, Maximize2, X } from 'lucide-react';

export default function Attractions() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'slides' | 'pools' | 'events' | 'kids'>('all');
  const [activeAttraction, setActiveAttraction] = useState<Attraction | null>(null);

  const categories = [
    { value: 'all', label: 'All Sights' },
    { value: 'slides', label: 'High Energy Slides' },
    { value: 'pools', label: 'Luxury Pools & Rivers' },
    { value: 'events', label: 'DJ Rain Party' },
    { value: 'kids', label: 'Family & Kids Bay' },
  ];

  const filteredAttractions = ATTRACTIONS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <section id="attractions" className="relative z-10 px-8 py-20 max-w-7xl mx-auto font-sans">
      <div className="text-center md:text-left md:flex justify-between items-end mb-14">
        {/* Title Block */}
        <div>
          <span className="text-[#0369a1] uppercase tracking-[0.25em] text-[10px] font-extrabold flex items-center justify-center md:justify-start gap-2 mb-2 font-orange">
            <Compass className="w-3.5 h-3.5 animate-spin" /> Unrivaled Adventures
          </span>
          <h2 
            className="text-5xl md:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#032b45] via-[#0284c7] to-[#032b45] tracking-tight font-rustic py-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Realm of Splashes
          </h2>
          <p className="text-[#0c4a6e]/90 max-w-md mt-2 text-xs sm:text-sm leading-relaxed font-semibold font-orange">
            Engineered for pure adrenaline, safety, and ultimate cooling comfort. Discover our major attractions.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8 md:mt-0 font-orange">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#0284c7] text-white font-extrabold shadow-lg shadow-[#0284c7]/25 scale-105'
                  : 'liquid-glass text-[#0c4a6e] hover:text-[#032b45] border border-[#0284c7]/20 bg-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid displays filtered results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAttractions.map((att) => {
          return (
            <div
              key={att.id}
              className="liquid-glass rounded-3xl overflow-hidden group flex flex-col justify-between hover:scale-[1.01] hover:bg-[#0284c7]/5 transition-all duration-500 shadow-xl border border-[#0284c7]/15 bg-white/20"
            >
              {/* Body details */}
              <div className="p-6 flex-grow flex flex-col justify-between font-orange">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#032b45] via-[#0284c7] to-[#032b45] font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '1.9rem' }}>
                      {att.name}
                    </h3>
                    {att.intensityLevel && (
                      <span className={`text-[8px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full backdrop-blur-md shadow-md flex items-center gap-1 border shrink-0 mt-1 ${
                        att.intensityLevel === 'Extreme' 
                          ? 'bg-red-50/90 border-red-200 text-red-700'
                          : att.intensityLevel === 'High'
                          ? 'bg-amber-50/90 border-amber-200 text-amber-700'
                          : 'bg-emerald-50/90 border-emerald-200 text-emerald-700'
                      }`}>
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        {att.intensityLevel}
                      </span>
                    )}
                  </div>
                  <p className="text-[#0c4a6e]/95 text-xs leading-relaxed mb-6 line-clamp-3 font-semibold">
                    {att.description}
                  </p>
                </div>

                {/* Mini features & dynamic parameters */}
                <div>
                  <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-[#0284c7]/15 mb-4 bg-white/35 rounded-xl px-2">
                    {att.stats.slice(0, 3).map((st, idx) => (
                      <div key={idx} className="text-center">
                        <span className="block text-[8px] uppercase tracking-widest text-[#0c4a6e]/85 font-extrabold font-mono">
                          {st.label}
                        </span>
                        <span className="block text-[11px] text-[#0284c7] font-extrabold mt-0.5 whitespace-nowrap">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#0c4a6e] flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 text-[#0284c7]" />
                      Req: {att.heightRequirement || 'General'}
                    </span>
                    <button
                      onClick={() => setActiveAttraction(att)}
                      className="text-[10px] uppercase tracking-wider text-[#0284c7] bg-[#bae6fd]/40 hover:bg-[#bae6fd]/70 border border-[#0284c7]/35 px-4 py-2 rounded-full font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      View Spec
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern specification Lightbox modal */}
      {activeAttraction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-rise" id="spec-lightbox">
          <div className="liquid-glass border border-[#0284c7]/30 rounded-3xl max-w-lg w-full p-8 relative flex flex-col gap-6 shadow-2xl overflow-hidden bg-white/95">
            {/* Background glass shine decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            {/* Information content */}
            <div className="w-full flex flex-col justify-between font-orange">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-[#0284c7] mb-1 font-extrabold">
                    {activeAttraction.category} • Spec sheet
                  </span>
                  <button
                    onClick={() => setActiveAttraction(null)}
                    className="p-1 px-1.5 rounded-full bg-[#bae6fd]/30 hover:bg-[#bae6fd]/60 text-[#032b45] transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-3xl text-[#032b45] font-normal mt-1 leading-[1.1] font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '2.5rem' }}>
                  {activeAttraction.name}
                </h3>

                <p className="text-xs text-[#0c4a6e] mt-3 leading-relaxed font-semibold">
                  {activeAttraction.description}
                </p>

                {/* Table details */}
                <div className="mt-6 space-y-3 font-orange">
                  <div className="flex justify-between border-b border-[#0284c7]/15 pb-2 text-xs">
                    <span className="text-[#0c4a6e] flex items-center gap-1.5 font-bold">
                      <Layers className="w-3.5 h-3.5 text-[#0284c7]" /> Height Limit
                    </span>
                    <span className="text-[#032b45] font-extrabold">{activeAttraction.heightRequirement || 'All Ages'}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#0284c7]/15 pb-2 text-xs">
                    <span className="text-[#0c4a6e] flex items-center gap-1.5 font-bold">
                      <Zap className="w-3.5 h-3.5 text-[#0284c7]" /> Thrill Intensity
                    </span>
                    <span className="text-[#032b45] font-extrabold">{activeAttraction.intensityLevel || 'Low'}</span>
                  </div>
                  {activeAttraction.stats.map((st, idx) => (
                    <div key={idx} className="flex justify-between border-b border-[#0284c7]/15 pb-1.5 text-xs">
                      <span className="text-[#0c4a6e] font-bold">{st.label}</span>
                      <span className="text-[#032b45] font-extrabold">{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end font-orange">
                <button
                  onClick={() => setActiveAttraction(null)}
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-xs font-black rounded-full hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-md uppercase tracking-wider"
                >
                  Confirm Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
