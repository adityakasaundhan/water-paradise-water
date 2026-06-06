import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoStrip from './components/InfoStrip';
import Attractions from './components/Attractions';
import Gallery from './components/Gallery';
import ContactSection from './components/ContactSection';
import BookingModal from './components/BookingModal';
import Atmosphere from './components/Atmosphere';
import { BACKGROUND_VIDEOS } from './data';
import { Play, Pause, Film, VolumeX, Volume2, ShieldCheck, ChevronUp } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Monitor scrolling to highlight navbar links and show top scroll button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'attractions', 'gallery', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log('Video play error:', err));
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isVideoMuted;
    setIsVideoMuted(!isVideoMuted);
  };

  const handleVideoSelect = (idx: number) => {
    setActiveVideoIdx(idx);
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => console.log('Video track reload error:', err));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-foreground select-none overflow-x-hidden bg-background font-sans">
      
      {/* Golden & Silver Atmosphere containing Bubbles, Clouds, and Twilight Sky */}
      <Atmosphere />

      {/* Required Screen-filling Fixed Background Video Player */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          ref={videoRef}
          key={BACKGROUND_VIDEOS[activeVideoIdx].url}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 mix-blend-screen"
          autoPlay
          loop
          muted={isVideoMuted}
          playsInline
        >
          <source src={BACKGROUND_VIDEOS[activeVideoIdx].url} type="video/mp4" />
        </video>

        {/* Crystal clear light blue water overlay with glowing cyan & light blue tints */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#38bdf8]/10 via-[#0ea5e9]/20 to-[#bae6fd]/30 backdrop-blur-[0.5px] z-0" />
      </div>

      {/* Main glass-navbar content layout */}
      <div className="relative z-10 flex flex-col w-full min-h-screen font-sans">
        
        {/* Navigation Bar */}
        <Navbar 
          onBookClick={() => setIsBookingOpen(true)} 
          activeSection={activeSection} 
        />

        {/* Hero Section */}
        <Hero onBookClick={() => setIsBookingOpen(true)} />

        {/* Quick Information Strip details */}
        <InfoStrip />

        {/* Detailed Attractions list */}
        <Attractions />

        {/* Cinematic Photo Gallery */}
        <Gallery />

        {/* FAQ accordions + Contact form */}
        <ContactSection />

        {/* Footer */}
        <footer className="relative z-10 border-t border-[#0284c7]/10 bg-white/90 backdrop-blur-md pt-16 pb-12 px-8 shadow-md">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo and Tagline */}
            <div className="md:col-span-2 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-[#032b45]" style={{ fontFamily: "var(--font-display)" }}>
                  Water Paradise<sup className="text-xs">®</sup>
                </span>
              </div>
              <p className="text-xs text-[#0c4a6e] max-w-sm leading-relaxed font-semibold text-left">
                Fatehpur's first and largest luxury retreat, combining extreme-speed slides, family-safe wave pools, and breathtaking tropical vegetation.
              </p>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-extrabold text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Recommended 100% Family Safe Rated
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-left font-sans">
              <h4 className="text-xs font-extrabold text-[#032b45] tracking-wider uppercase mb-4 text-left">Discover Resort</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-left">
                <li><a href="#home" className="text-[#0c4a6e] hover:text-[#032b45] transition-colors">Hero Entry</a></li>
                <li><a href="#attractions" className="text-[#0c4a6e] hover:text-[#032b45] transition-colors">Splash Attractions</a></li>
                <li><a href="#gallery" className="text-[#0c4a6e] hover:text-[#032b45] transition-colors">Resort Gallery</a></li>
                <li><a href="#info-strip" className="text-[#0c4a6e] hover:text-[#032b45] transition-colors">Pass Bookings</a></li>
                <li><a href="#contact" className="text-[#0c4a6e] hover:text-[#032b45] transition-colors">Helpline & Queries</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="text-left font-sans">
              <h4 className="text-xs font-extrabold text-[#032b45] tracking-wider uppercase mb-4 text-left">The Gate Office</h4>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=WATER+PARADISE+WATERPARK,+XR4M%2B838,+On+bhitauda+road,+Fatehpur,+Uttar+Pradesh+212601"
                target="_blank"
                rel="noreferrer referrer"
                className="block text-xs text-[#0c4a6e] hover:text-emerald-700 hover:underline leading-relaxed font-semibold text-left transition-colors"
              >
                WATER PARADISE WATERPARK, XR4M+838,<br />
                On bhitauda road, Fatehpur,<br />
                Uttar Pradesh, India - 212601
              </a>
              <p className="text-xs text-[#032b45] font-extrabold mt-3 text-left">Phone: +91 91409 52750</p>
              <p className="text-xs text-[#0c4a6e]/90 font-semibold text-left">Email: info@waterparadisewaterpark.com</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-[#0284c7]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-[11px] text-[#0c4a6e] font-sans text-left">
            <div className="space-y-2">
              <p className="font-mono font-bold">© {new Date().getFullYear()} Water Paradise Waterpark, Fatehpur. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono font-bold text-[#0c4a6e]/85">
                <a href="#" className="hover:text-[#032b45] transition-colors">Security Rules</a>
                <span>•</span>
                <a href="#" className="hover:text-[#032b45] transition-colors">Nylon Code of Hygiene</a>
                <span>•</span>
                <a href="#" className="hover:text-[#032b45] transition-colors">Terms of Ticketing</a>
              </div>
            </div>

            {/* Premium Forge Eternal Tech Creator Badge */}
            <div className="liquid-glass border border-[#0284c7]/15 bg-gradient-to-br from-emerald-50/70 to-blue-50/70 p-4 rounded-2xl max-w-sm w-full md:w-80 shadow-md">
              <span className="block text-[8px] uppercase tracking-[0.25em] text-[#0284c7] font-extrabold mb-1 font-mono">
                Website Developed & Formed By
              </span>
              <h5 className="text-sm font-black text-[#032b45] tracking-tight font-sans">
                Forge Eternal Tech
              </h5>
              <div className="mt-2 space-y-0.5 text-[11px] text-slate-700 font-semibold font-sans">
                <p>Founder: <span className="text-emerald-800 font-extrabold">Aditya Kasaundhan</span></p>
                <p>Contact: <a href="tel:9511421803" className="hover:underline text-[#0284c7] font-bold">9511421803</a></p>
                <p>Email: <a href="mailto:eternalsforge@gmail.com" className="hover:underline text-[#0284c7] font-bold">eternalsforge@gmail.com</a></p>
                <p>Location: <span className="text-slate-800 font-extrabold">Fatehpur, India</span></p>
              </div>
            </div>
          </div>
        </footer>

      </div>



      {/* Persistent Day Pass Booking and Coupon Generation Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

    </div>
  );
}
