import React, { useState, useEffect } from 'react';
import { Menu, X, Waves } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  activeSection: string;
}

export default function Navbar({ onBookClick, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-sky-950/85 backdrop-blur-md border-b border-white/10 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="relative z-10 flex justify-between items-center px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <Waves className="w-7 h-7 text-yellow-300 animate-pulse" />
          <span 
            className="text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fffbeb] via-[#fef250] to-[#fffbeb] font-normal font-rustic inline-block pl-5 pr-4 py-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Water Paradise<sup className="text-xs ml-0.5 font-sans relative -top-3 text-[#fef250]">®</sup>
          </span>
        </a>

        {/* Desktop Web Navigation Links (70% Orange Avenue font) */}
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
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#fef250] rounded-full animate-fade-rise" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4 font-orange">
          <button
            onClick={onBookClick}
            id="nav-book-button"
            className="liquid-glass rounded-full px-6 py-2.5 text-xs text-white border border-[#fef250]/40 bg-[#fef250]/15 hover:scale-[1.03] hover:bg-[#fef250]/30 hover:border-[#fef250]/70 hover:text-[#fffbeb] transition-all duration-300 cursor-pointer shadow-md inline-block active:scale-95 uppercase tracking-wider font-extrabold"
          >
            Book Tickets
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden fixed inset-0 top-[70px] bg-sky-950/95 backdrop-blur-xl z-40 flex flex-col px-8 py-10 gap-8 border-t border-white/10 animate-fade-rise"
        >
          <div className="flex flex-col gap-6">
            {navItems.map((item) => {
               const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xl tracking-wide ${
                    isActive 
                      ? 'text-[#fef250] font-extrabold pl-2 border-l-2 border-[#fef250]' 
                      : 'text-white/80 hover:text-[#fffbeb] pl-2 font-medium'
                  } transition-all`}
                  style={{ fontFamily: isActive ? 'var(--font-sans)' : "var(--font-display)", fontSize: isActive ? '1.1rem' : '1.8rem' }}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 font-orange">
            <p className="text-xs text-[#fef250] mb-4 uppercase tracking-wider font-extrabold">Water Paradise Fatehpur, UP</p>
            <p className="text-sm font-extrabold text-white/90">WATER PARADISE WATERPARK, XR4M+838</p>
            <p className="text-xs text-sky-100/75 mt-1 font-medium">Timings: 10:00 AM – 6:00 PM</p>
          </div>
        </div>
      )}
    </header>
  );
}
