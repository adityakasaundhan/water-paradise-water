import React from 'react';
import { CalendarRange, ArrowDown } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const handleScrollDown = () => {
    const infoSec = document.getElementById('info-strip');
    if (infoSec) {
      infoSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dqfggutr5/image/upload/f_auto,q_auto/1000085327_rer9ud')` }}
    >
      {/* Slight dark gradient overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-sky-950/20 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Cinematic Tagline upper label */}
        <span className="bg-gradient-to-r from-yellow-300 to-lime-300 bg-clip-text text-transparent uppercase tracking-[0.3em] text-xs font-black mb-6 animate-fade-rise font-orange pb-1">
          Welcome to Fatehpur's Premier Luxury Water Destination
        </span>

        {/* Main Heading with required styling & Great Vibes font */}
        <h1
          id="hero-heading"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] leading-none tracking-tight max-w-7xl font-normal animate-fade-rise py-3 select-none flex flex-col items-center gap-1 sm:gap-2"
        >
          {/* Line 1: Water Paradise in luxurious calligraphic script with horizontal padding to prevent clipping */}
          <span 
            className="inline-block pl-8 pr-8 pb-3 pt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef250] to-[#facc15] font-rustic drop-shadow-[0_2px_15px_rgba(254,242,80,0.3)]"
            style={{ fontFamily: 'var(--font-display)', lineHeight: '1.25' }}
          >
            Water Paradise
          </span>
          {/* Line 2: WATERPARK in sophisticated luxury spaced serif to prevent script W overlaps */}
          <span 
            className="text-white text-base sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.55em] font-medium font-luxury drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)] transition-all duration-500 hover:text-yellow-300 pl-[0.55em]"
            style={{ fontFamily: 'var(--font-luxury)' }}
          >
            Waterpark
          </span>
        </h1>

        {/* Subtext with strict text copy */}
        <p
          id="hero-subtext"
          className="text-sky-100/95 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-orange font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
        >
          Escape the summer heat at Fatehpur's favorite water destination. Experience{' '}
          <span className="text-[#fef250] font-extrabold underline decoration-yellow-400/50 underline-offset-4">thrilling water slides</span>,{' '}
          <span className="text-[#fef250] font-extrabold underline decoration-yellow-400/50 underline-offset-4">family swimming pools</span>,{' '}
          <span className="text-[#fef250] font-extrabold underline decoration-yellow-400/50 underline-offset-4">exciting rain dance zones</span>, and{' '}
          <span className="text-[#fef250] font-extrabold underline decoration-yellow-400/50 underline-offset-4">unforgettable moments</span> with friends and loved ones.
        </p>

        {/* Required Hero CTA */}
        <div className="animate-fade-rise-delay-2 mt-12 flex flex-col items-center gap-4">
          <button
            onClick={onBookClick}
            id="hero-cta-button"
            className="liquid-glass rounded-full px-14 py-5 text-sm text-yellow-300 hover:text-yellow-200 border-2 border-yellow-400/30 hover:border-yellow-400/60 hover:bg-white/10 font-extrabold uppercase tracking-widest hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer shadow-xl flex items-center gap-3 font-orange bg-white/5"
          >
            <CalendarRange className="w-5 h-5 text-yellow-300 animate-pulse" />
            Book Your Day Pass
          </button>

          {/* Small subtle review note */}
          <span className="text-xs text-sky-200 font-semibold mt-1 pb-1 font-orange tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Entry Pass starting at just <span className="text-yellow-300 font-black">₹350</span>
          </span>
        </div>
      </div>

      {/* Cinematic scroll down hint */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer text-white/50 hover:text-white/80 transition-all duration-300 group font-sans z-10"
        aria-label="Scroll to details"
        id="hero-scroll-btn"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">Explore Resort</span>
        <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
      </button>
    </section>
  );
}
