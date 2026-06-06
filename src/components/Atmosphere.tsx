import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  left: string;
  size: string;
  delay: string;
  speed: string;
  opacity: number;
}

interface SplashDroplet {
  id: number;
  x: number;
  y: number;
  tx: string;
  ty: string;
  size: string;
  delay: string;
  duration: string;
  color: string;
}

interface WaterRipple {
  id: number;
  x: number;
  y: number;
  size: string;
  duration: string;
}

export default function Atmosphere() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [splashes, setSplashes] = useState<SplashDroplet[]>([]);
  const [ripples, setRipples] = useState<WaterRipple[]>([]);

  useEffect(() => {
    // Generate active dynamic water bubbles
    const bubbleList: Bubble[] = Array.from({ length: 45 }).map((_, i) => {
      const sizeNum = Math.random() * 18 + 6; // 6px to 24px
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${sizeNum}px`,
        delay: `${Math.random() * -20}s`, // start immediately
        speed: `${Math.random() * 10 + 8}s`, // speedy 8s to 18s ascent for fresh feel
        opacity: Math.random() * 0.5 + 0.3,  // clear and visible
      };
    });
    setBubbles(bubbleList);
  }, []);

  // Function to trigger a beautiful splash + ripple at (x, y) coordinates
  const triggerWaterEffects = (clientX: number, clientY: number) => {
    const timestamp = Date.now();
    
    // Add a circular ripple ring
    const newRipple: WaterRipple = {
      id: timestamp,
      x: clientX,
      y: clientY,
      size: `${Math.random() * 60 + 60}px`,
      duration: `${Math.random() * 0.8 + 1.2}s`,
    };

    // Add multiple parabolic splash droplets shooting outwards
    const dropletCount = Math.floor(Math.random() * 6) + 7; // 7 to 13 droplets
    const newDroplets: SplashDroplet[] = Array.from({ length: dropletCount }).map((_, i) => {
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = Math.random() * 130 + 50; // distance they travel
      const tx = `${Math.cos(angle) * distance}px`;
      // Push upwards and outwards
      const ty = `${Math.sin(angle) * distance - (Math.random() * 110 + 130)}px`;
      const sizeNum = Math.random() * 14 + 6; // 6px to 20px

      // Alternating color highlights: luxury golden amber or vibrant sparkling lagoon blue
      const color = Math.random() > 0.45 ? '#38bdf8' : '#fef250';

      return {
        id: timestamp + i,
        x: clientX,
        y: clientY,
        tx,
        ty,
        size: `${sizeNum}px`,
        delay: `${Math.random() * 0.1}s`,
        duration: `${Math.random() * 0.6 + 0.8}s`,
        color,
      };
    });

    setRipples((prev) => [...prev.slice(-12), newRipple]); // Keep list tiny for performance
    setSplashes((prev) => [...prev.slice(-35), ...newDroplets]);
  };

  // Automated periodic ambient splashes (representing water park sprays/fountains)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      const randomY = Math.random() * (window.innerHeight * 0.7) + (window.innerHeight * 0.15);
      triggerWaterEffects(randomX, randomY);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Mouse interaction click listener to trigger elegant, realistic dynamic splashes on click
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Skip interactive forms, links, buttons to avoid blocking focus flow
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('button') || 
        target.closest('a')
      ) {
        return;
      }
      triggerWaterEffects(e.clientX, e.clientY);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. COMPREHENSIVE LIGHT BLUE WATER: Radiant Turquoise Lagoon Wave Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7dd3fc] via-[#38bdf8] to-[#0ea5e9] animate-sky-breath" />
      
      {/* Aqua/Teal glowing oceanic highlights to build water depth */}
      <div className="absolute top-[10%] right-[10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#22d3ee]/25 to-[#bae6fd]/5 blur-[120px] animate-water-surge" />
      <div className="absolute bottom-[5%] left-[5%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-[#0284c7]/20 to-[#67e8f9]/15 blur-[100px] animate-water-surge" style={{ animationDelay: '-4s' }} />

      {/* 2. UNDERWATER LIGHT RAY CAUSTICS: Animated pool glare sheet */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay animate-caustic-shimmer bg-gradient-to-r from-transparent via-[#ffffff]/20 to-transparent pointer-events-none" />

      {/* 3. CLOUD CORNER: Dynamic mist to make the horizon feel tropical and fresh */}
      <div className="absolute inset-x-0 top-[5%] h-[250px] pointer-events-none opacity-[0.25] mix-blend-screen select-none">
        <div 
          className="cloud-layered-1 absolute left-[-100px] top-0 rounded-full bg-gradient-to-r from-[#e0f2fe]/40 to-[#e0f2fe]/5"
          style={{ width: '500px', height: '220px' }}
        />
        <div 
          className="cloud-layered-2 absolute left-[25%] top-10 rounded-full bg-gradient-to-r from-[#ffffff]/30 to-[#bae6fd]/5"
          style={{ width: '600px', height: '260px' }}
        />
      </div>

      {/* 4. DYNAMIC MOVING WATER BUBBLES */}
      <div className="absolute inset-0 w-full h-full select-none">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble-glow absolute bottom-0 rounded-full mix-blend-screen"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              '--speed': b.speed,
              '--delay': b.delay,
              // Water bubble glass style with specular highlight glare
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(186, 230, 253, 0.4) 40%, rgba(56, 189, 248, 0.1) 75%, rgba(255, 255, 255, 0.75) 100%)',
              border: '1.2px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2), inset -2px -2px 6px rgba(255, 255, 255, 0.45)',
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 5. DYNAMIC SPLASH DROPLETS */}
      {splashes.map((s) => (
        <div
          key={s.id}
          className="animate-luxury-splash absolute rounded-full mix-blend-screen"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            '--tx': s.tx,
            '--ty': s.ty,
            '--duration': s.duration,
            animationDelay: s.delay,
            background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${s.color} 55%, rgba(255, 255, 255, 0.15) 100%)`,
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 3px 10px rgba(14, 165, 233, 0.15), inset -1.5px -1.5px 5px rgba(255, 255, 255, 0.5)',
          } as React.CSSProperties}
        />
      ))}

      {/* 6. DYNAMIC WATER RIPPLE RINGS */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="animate-luxury-ripple absolute rounded-full border-2 mix-blend-screen"
          style={{
            left: r.x - parseInt(r.size) / 2,
            top: r.y - parseInt(r.size) / 2,
            width: r.size,
            height: r.size,
            '--duration': r.duration,
          } as React.CSSProperties}
        />
      ))}

    </div>
  );
}
