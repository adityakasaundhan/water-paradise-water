import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const handleScrollDown = () => {
    const infoSec = document.getElementById('info-strip');
    if (infoSec) {
      infoSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-screen overflow-hidden z-[1]"
    >
      {/* Background image container with a bottom fade mask to blend seamlessly into Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: `url('https://res.cloudinary.com/dqfggutr5/image/upload/f_auto,q_auto/1000085327_rer9ud')`,
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }}
      />

      {/* Slight dark gradient overlay for text visibility with matching mask */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-sky-950/20 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
        }}
      />

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
          {/* Small subtle review note */}
          <span className="text-xs text-sky-200 font-semibold mt-1 pb-1 font-orange tracking-wider uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            Entry Pass starting at just <span className="text-yellow-300 font-black">₹350</span>
          </span>
        </div>
      </div>

    </section>
  );
}
