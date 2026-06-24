import React, { useState, useEffect } from 'react';
import { Menu, X, Waves } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Body scroll lock and accessibility listeners
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Attractions', href: '#attractions' },
    { name: 'Tickets', href: '#info-strip' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      // Small timeout to allow menu transition to finish or at least start before scrolling
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-500 ${
        mobileMenuOpen
          ? 'py-4 bg-[#062B45] border-b border-white/5'
          : isScrolled 
            ? 'py-4 bg-sky-950/85 backdrop-blur-md border-b border-white/10 shadow-lg' 
            : 'py-6 bg-transparent'
      }`}
    >
      <div className="relative z-10 flex justify-between items-center px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer relative z-[10002]"
        >
          <Waves className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-300 animate-pulse" />
          <span 
            className="text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef250] to-[#fffbeb] font-normal font-rustic inline-block pl-2 sm:pl-5 pr-4 py-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Water Paradise<sup className="text-xs ml-0.5 font-sans relative -top-2 sm:-top-3 text-[#fef250]">®</sup>
          </span>
        </a>

        {/* Desktop Web Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 font-orange">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs uppercase tracking-widest font-extrabold relative py-1 transition-colors duration-300 ${
                  isActive 
                    ? 'text-[#fef250] drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]' 
                    : 'text-white/90 hover:text-[#fffbeb]'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#fef250] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 font-orange relative z-[10002]">
          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-white/90 hover:text-white transition-colors"
            id="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <div
        id="mobile-drawer"
        className={`md:hidden fixed inset-0 w-full h-screen bg-[#062B45] z-[10001] flex flex-col justify-center items-center px-10 gap-10 transition-transform duration-350 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center gap-8 w-full">
          {navItems.map((item) => {
             const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-3xl sm:text-4xl text-center tracking-wide uppercase transition-all duration-300 ${
                  isActive 
                    ? 'text-[#fef250] font-black' 
                    : 'text-white/70 hover:text-white font-medium'
                }`}
                style={{ fontFamily: isActive ? 'var(--font-sans)' : "var(--font-display)" }}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        <div className="mt-12 w-full pt-10 border-t border-white/10 text-center font-orange">
          <p className="text-[10px] text-[#fef250] mb-3 uppercase tracking-[0.2em] font-extrabold px-4">Water Paradise Fatehpur, UP</p>
          <p className="text-xs font-extrabold text-white/90 max-w-[250px] mx-auto leading-relaxed">WATER PARADISE WATERPARK, XR4M+838</p>
          <p className="text-[10px] text-sky-100/50 mt-2 font-medium">Timings: 10:00 AM – 6:00 PM</p>
        </div>
      </div>
    </header>
  );
}
