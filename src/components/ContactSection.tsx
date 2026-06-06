import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, Mail, Phone, MapPin, Send, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  // Accordions active index State
  const [activeFaq, setActiveFaq] = useState<string | null>('f1');
  
  // Contact Form Inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  
  // Submission indicator
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFaqToggle = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate luxury API response callback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Clean up fields except name
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const contactDetails = [
    {
      icon: Phone,
      title: 'Helpline Telephone Numbers',
      primary: '+91 91409 52750',
      secondary: '+91 51802 24522',
      href: 'tel:+919140952750'
    },
    {
      icon: Mail,
      title: 'Official Mail Channels',
      primary: 'info@waterparadisewaterpark.com',
      secondary: 'bookings@waterparadisewaterpark.com',
      href: 'mailto:info@waterparadisewaterpark.com'
    },
    {
      icon: MapPin,
      title: 'Our Premium Venue',
      primary: 'WATER PARADISE WATERPARK, XR4M+838',
      secondary: 'On bhitauda road, Fatehpur, Uttar Pradesh 212601',
      href: 'https://www.google.com/maps/search/?api=1&query=WATER+PARADISE+WATERPARK,+XR4M%2B838,+On+bhitauda+road,+Fatehpur,+Uttar+Pradesh+212601'
    }
  ];

  return (
    <section id="contact" className="relative z-10 px-8 py-20 max-w-7xl mx-auto font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: FAQ Accordion Systems */}
        <div>
          <span className="text-[#0369a1] uppercase tracking-[0.25em] text-[10px] font-extrabold flex items-center gap-2 mb-2 font-mono">
            <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" /> Frequent Inquiries
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#032b45] tracking-tight font-rustic py-2 mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Curated Answers
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="liquid-glass rounded-2xl border border-[#0284c7]/20 overflow-hidden transition-all duration-300 bg-white/85 shadow-sm"
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => handleFaqToggle(faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center text-[#032b45] font-extrabold text-sm md:text-base cursor-pointer hover:bg-sky-50/50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0284c7] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>

                  {/* Body Content */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-60 border-t border-[#0284c7]/10' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 text-xs md:text-sm text-[#0c4a6e] leading-relaxed font-semibold">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick info badges / safety rules */}
          <div className="mt-8 p-5 rounded-2xl bg-sky-50 border border-[#0284c7]/20 flex gap-4 items-start">
            <AlertCircle className="w-6 h-6 text-[#0284c7] shrink-0" />
            <div className="text-xs text-[#0c4a6e] font-semibold text-left">
              <strong className="text-[#032b45] font-extrabold">Safety notice:</strong> Lockers, nylon costumes and lockers can also be booked on-the-spot inside changing areas. Guard lifeguards are always positioned at deep pool limits.
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form & Context channels */}
        <div className="space-y-10">
          
          {/* Form System */}
          <div className="liquid-glass rounded-3xl p-8 border border-[#0284c7]/20 relative overflow-hidden bg-white/90 shadow-md">
            {/* Background shade */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#0284c7]/5 rounded-full blur-2xl pointer-events-none" />

            {submitSuccess ? (
              /* Success screen feedback */
              <div className="text-center py-10 animate-fade-rise">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 animate-pulse" />
                </div>
                <h3 className="text-3xl text-emerald-800 font-extrabold font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '2.5rem' }}>
                  Message Received, {name}!
                </h3>
                <p className="text-sm text-[#0c4a6e] mt-3 max-w-sm mx-auto leading-relaxed font-semibold">
                  Thank you for writing to Water Paradise. Our customer desk has received your ticket and will reach back out to you at <strong className="text-[#032b45] font-extrabold">{email || 'your email'}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setName('');
                  }}
                  className="mt-8 px-6 py-2.5 bg-[#0284c7] text-white text-xs font-extrabold rounded-full hover:scale-[1.02] duration-300 cursor-pointer shadow-md inline-flex items-center gap-2 uppercase tracking-wide"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              /* Form input fields */
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="text-left">
                  <h4 className="text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#032b45] via-emerald-500 to-[#032b45] font-mileast" style={{ fontFamily: "var(--font-mileast)", fontSize: '2.4rem', textTransform: 'none' }}>
                    Connect with Our Desk
                  </h4>
                  <p className="text-[11px] text-[#0c4a6e] font-semibold mt-2">Planning a group picnic? Send your details for customized discounts.</p>
                </div>

                {/* Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] uppercase tracking-widest text-[#0c4a6e] font-extrabold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aditya Kumar"
                    className="w-full bg-sky-50/50 hover:bg-sky-50/80 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold placeholder-[#0c4a6e]/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest text-[#0c4a6e] font-extrabold">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditya@example.com"
                      className="w-full bg-sky-50/50 hover:bg-sky-50/80 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold placeholder-[#0c4a6e]/40"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[9px] uppercase tracking-widest text-[#0c4a6e] font-extrabold">Enquiry Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-sky-50/50 hover:bg-sky-50/80 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all cursor-pointer font-semibold"
                    >
                      <option value="General Enquiry" className="text-[#032b45]">General Enquiry</option>
                      <option value="Group Picnic Rates" className="text-[#032b45]">Group Picnic (15+ people)</option>
                      <option value="Corporate Retreats" className="text-[#032b45]">Corporate Outings</option>
                      <option value="Event Hosting" className="text-[#032b45]">Birthday & Rain Parties</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[9px] uppercase tracking-widest text-[#0c4a6e] font-extrabold">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your requirement, date range or group parameters..."
                    className="w-full bg-sky-50/50 hover:bg-sky-50/80 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all resize-none font-sans font-semibold placeholder-[#0c4a6e]/40"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-extrabold uppercase tracking-widest rounded-full hover:scale-[1.03] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" /> Submit Enquiry
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick contact channels cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            {contactDetails.map((det, idx) => {
              const Icon = det.icon;
              return (
                <a
                  key={idx}
                  href={det.href}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="p-4 rounded-2xl bg-white/90 hover:bg-sky-50/30 border border-[#0284c7]/15 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="p-2 bg-sky-50 rounded-xl self-start group-hover:bg-[#bae6fd]/40 border border-[#0284c7]/10 transition-colors mb-4">
                    <Icon className="w-4 h-4 text-[#0284c7]" />
                  </div>
                  <div className="text-left font-sans">
                    <h5 className="text-[9px] uppercase tracking-widest text-[#0369a1] font-extrabold text-left">{det.title}</h5>
                    <p className="text-[#032b45] text-xs font-extrabold mt-1 truncate text-left">{det.primary}</p>
                    <p className="text-[#0c4a6e] text-[10px] mt-0.5 truncate font-bold text-left">{det.secondary}</p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
