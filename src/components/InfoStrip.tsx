import React from 'react';
import { MapPin, Clock, TicketCheck, Sparkles, Navigation } from 'lucide-react';

export default function InfoStrip() {
  const infoItems = [
    {
      id: 'info-location',
      icon: MapPin,
      title: 'Our Location',
      primaryText: 'WATER PARADISE WATERPARK, XR4M+838',
      secondaryText: 'On bhitauda road, Fatehpur, UP 212601',
      action: {
        text: 'Get Directions',
        url: 'https://www.google.com/maps/search/?api=1&query=WATER+PARADISE+WATERPARK,+XR4M%2B838,+On+bhitauda+road,+Fatehpur,+Uttar+Pradesh+212601'
      }
    },
    {
      id: 'info-timings',
      icon: Clock,
      title: 'Park Timings',
      primaryText: '10:00 AM – 6:00 PM',
      secondaryText: 'Open Daily (Mon - Sun)',
      badge: 'Active Season'
    },
    {
      id: 'info-tickets',
      icon: TicketCheck,
      title: 'Day Pass Rates',
      primaryText: 'Weekdays: ₹350 / person',
      secondaryText: 'Weekends & Holidays: ₹400 / person',
      note: 'Kids below 3ft: FREE'
    },
    {
      id: 'info-attractions',
      icon: Sparkles,
      title: 'Key Attractions',
      primaryText: 'Water Slides • Swimming Pool',
      secondaryText: 'Rain Dance • DJ Floor',
      highlight: true
    }
  ];

  return (
    <section 
      id="info-strip" 
      className="relative z-10 px-6 max-w-7xl mx-auto -mt-24 sm:-mt-16 mb-24 font-sans"
    >
      {/* 4-column responsive grid container of glassmorphic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-orange">
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className={`liquid-glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500/[0.02] border border-emerald-500/15 shadow-lg group ${
                item.highlight ? 'bg-emerald-500/[0.03]' : ''
              }`}
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300 text-emerald-600">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  
                  {item.badge && (
                    <span className="text-[9px] uppercase tracking-widest font-semibold border border-lime-500/35 text-emerald-800 bg-lime-500/10 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-[10px] tracking-widest text-[#0c4a6e]/85 uppercase font-extrabold mb-2">
                  {item.title}
                </h3>
                <p className="text-[#032b45] font-extrabold text-[15px] leading-snug">
                  {item.action ? (
                    <a href={item.action.url} target="_blank" rel="noreferrer referrer" className="hover:underline hover:text-emerald-700 transition-colors">
                      {item.primaryText}
                    </a>
                  ) : (
                    item.primaryText
                  )}
                </p>
                <p className="text-[#075985] text-xs mt-1 leading-snug font-medium">
                  {item.action ? (
                    <a href={item.action.url} target="_blank" rel="noreferrer referrer" className="hover:underline hover:text-emerald-700 transition-colors">
                      {item.secondaryText}
                    </a>
                  ) : (
                    item.secondaryText
                  )}
                </p>
              </div>

              {/* Detail footer elements depending on card type */}
              <div className="mt-5 pt-3 border-t border-[#0c4a6e]/10 flex items-center justify-between">
                {item.action && (
                  <a
                    href={item.action.url}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="text-xs text-[#0f172a] hover:text-emerald-700 font-bold flex items-center gap-1.5 transition-colors group/link"
                  >
                    <Navigation className="w-3 h-3 text-emerald-600 group-hover/link:animate-bounce" />
                    {item.action.text}
                  </a>
                )}
                {item.note && (
                  <span className="text-[11px] text-[#075985] italic font-medium">
                    {item.note}
                  </span>
                )}
                {!item.action && !item.note && (
                  <span className="text-[10px] text-[#0c4a6e]/60 uppercase tracking-[0.1em] font-extrabold font-mono">
                    Water Paradise®
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
