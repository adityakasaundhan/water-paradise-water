import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Compass, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Slides' | 'Pools' | 'Events' | 'Vibe'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Slides', 'Pools', 'Events', 'Vibe'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="relative z-10 px-8 py-20 max-w-7xl mx-auto font-sans">
      <div className="text-center md:text-left md:flex justify-between items-end mb-12">
        {/* Title */}
        <div>
          <span className="text-[#0369a1] uppercase tracking-[0.2em] text-[10px] font-extrabold flex items-center justify-center md:justify-start gap-2 mb-2 font-mono">
            <Compass className="w-3.5 h-3.5 animate-spin" /> Cinematic Snapshots
          </span>
          <h2
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#032b45] via-emerald-500 to-[#032b45] tracking-tight font-rustic py-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Summer Canvas
          </h2>
          <p className="text-[#0c4a6e]/90 max-w-md mt-2 text-xs sm:text-sm leading-relaxed font-semibold">
            Witness the real splashes, standard sunloungers, and festive DJ rain dances at Water Paradise Fatehpur.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 md:mt-0 font-sans">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0284c7] text-white font-extrabold shadow-lg shadow-[#0284c7]/25 scale-105'
                  : 'liquid-glass text-[#0c4a6e] hover:text-[#032b45] border border-[#0284c7]/20 bg-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="liquid-glass rounded-2xl overflow-hidden aspect-[4/3] group relative cursor-pointer hover:border-[#0284c7]/35 transition-all duration-500 shadow-lg border border-[#0284c7]/15 bg-white/20"
          >
            {/* Image */}
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Premium Hover Overlay glass */}
            <div className="absolute inset-0 bg-[#032b45]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6 z-10">
              <div className="flex justify-between items-start">
                <span className="text-[9px] uppercase tracking-widest font-extrabold border border-white/20 text-[#0284c7] bg-white px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="p-2 bg-white/10 rounded-full text-white border border-white/20">
                  <Eye className="w-4 h-4" />
                </span>
              </div>

              <div>
                <h4 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef250] to-[#facc15] font-normal font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '1.9rem' }}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-sky-100/90 mt-1 leading-relaxed font-semibold">
                  {item.description}
                </p>
              </div>
            </div>
            
            {/* Subtle card shade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#032b45]/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 z-0 group-hover:opacity-0 transition-opacity duration-300">
              <span className="text-[10px] font-extrabold text-[#032b45] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0284c7]/20">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-white/95 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 animate-fade-rise text-[#032b45]"
          id="gallery-lightbox"
        >
          {/* Header */}
          <div className="flex justify-between items-center max-w-7xl w-full mx-auto pb-4 font-sans text-left">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#0c4a6e] font-mono font-extrabold text-left">
                {filteredItems[lightboxIndex].category} • Slide {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <h3 className="text-2xl text-[#032b45] font-normal font-rustic mt-0.5 text-left" style={{ fontFamily: "var(--font-display)", fontSize: '2.5rem' }}>
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 text-[#032b45] transition-colors cursor-pointer border border-[#0284c7]/10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Picture Slide Stage with Next/Prev Arrow keys */}
          <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full mx-auto my-4">
            {/* Prev Trigger */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-sky-50 hover:bg-sky-100 text-[#032b45] border border-[#0284c7]/10 transition-colors cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Picture */}
            <div 
              className="relative rounded-2xl overflow-hidden max-h-[70vh] w-full flex justify-center items-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-full object-contain rounded-xl select-none"
              />
            </div>

            {/* Next Trigger */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-sky-50 hover:bg-sky-100 text-[#032b45] border border-[#0284c7]/10 transition-colors cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Footer stats / text */}
          <div className="text-center max-w-2xl mx-auto pt-4 border-t border-[#0284c7]/10 w-full font-sans">
            <p className="text-xs text-[#0c4a6e] mt-1 leading-relaxed font-semibold">
              {filteredItems[lightboxIndex].description}
            </p>
            <p className="text-[10px] text-[#0284c7] uppercase tracking-[0.2em] font-mono mt-3 font-extrabold">
              WATER PARADISE® RESORT
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
