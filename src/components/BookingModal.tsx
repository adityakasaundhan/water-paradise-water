import React, { useState, useEffect } from 'react';
import { TicketBooking } from '../types';
import { X, Calendar, Ticket, User, Mail, Phone, ShoppingBag, ShieldCheck, Printer, RefreshCw, Layers } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Booking inputs state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [lockerRequired, setLockerRequired] = useState(false);
  const [rentalsCount, setRentalsCount] = useState(0);

  // Computed amounts
  const [totalPrice, setTotalPrice] = useState(350);
  const [isWeekend, setIsWeekend] = useState(false);

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<TicketBooking | null>(null);
  const [bookingHistory, setBookingHistory] = useState<TicketBooking[]>([]);

  // Get weekday/weekend status and update prices
  useEffect(() => {
    if (!visitDate) return;
    const date = new Date(visitDate);
    const day = date.getDay();
    const weekend = day === 0 || day === 6; // Sunday = 0, Saturday = 6
    setIsWeekend(weekend);
  }, [visitDate]);

  // Handle total price calculation
  useEffect(() => {
    const adultRate = isWeekend ? 400 : 350;
    const childRate = isWeekend ? 250 : 200;
    const lockerRate = lockerRequired ? 60 : 0;
    const rentalCostumeRate = rentalsCount * 50;

    const computed = (adultsCount * adultRate) + (childrenCount * childRate) + lockerRate + rentalCostumeRate;
    setTotalPrice(isNaN(computed) ? 0 : computed);
  }, [adultsCount, childrenCount, lockerRequired, rentalsCount, isWeekend]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('wp_ticket_bookings');
    if (stored) {
      try {
        setBookingHistory(JSON.parse(stored));
      } catch (err) {
        console.error('Error loading ticket history:', err);
      }
    }
  }, []);

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !visitDate) return;

    // Generate random premium coupon/ticket code
    const randomCode = `WP-${visitDate.replace(/-/g, '')}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    
    const newBooking: TicketBooking = {
      id: Math.random().toString(36).substr(2, 9),
      fullName,
      email,
      phone,
      visitDate,
      adultCount: adultsCount,
      childCount: childrenCount,
      lockerRequired,
      rentalCostumesCount: rentalsCount,
      totalAmount: totalPrice,
      ticketCode: randomCode,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    // Update state and history
    setConfirmedBooking(newBooking);
    const updatedHistory = [newBooking, ...bookingHistory];
    setBookingHistory(updatedHistory);
    localStorage.setItem('wp_ticket_bookings', JSON.stringify(updatedHistory));
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setVisitDate('');
    setAdultsCount(1);
    setChildrenCount(0);
    setLockerRequired(false);
    setRentalsCount(0);
    setConfirmedBooking(null);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-[10050] bg-black/45 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto font-sans"
    >
      <div 
        id="booking-modal-card"
        className="liquid-glass border border-[#0284c7]/30 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-8 bg-white/95"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-[#0284c7]/15 bg-sky-100/45">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#0284c7] animate-pulse" />
            <h2 className="text-lg font-extrabold text-[#032b45] tracking-wide">
              {confirmedBooking ? 'Your Digital Entry Pass' : 'Water Paradise Ticketing Gate'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 rounded-full bg-[#bae6fd]/40 hover:bg-[#bae6fd]/75 text-[#032b45] transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main flow layout (Forms or Ticket) */}
          <div className="lg:col-span-8 p-8 border-r border-[#0284c7]/15">
            {confirmedBooking ? (
              /* CONFIRMED STATE: Digital Pass */
              <div className="text-center py-4 print:p-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mb-4 text-emerald-600 shadow-sm animate-bounce">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl text-emerald-700 font-extrabold font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '1.9rem' }}>
                    Booking Confirmed successfully!
                  </h3>
                  <p className="text-xs text-[#0c4a6e] mt-2 font-semibold">
                    A copy of this card and payment confirmation was sent to <strong className="text-[#032b45]">{confirmedBooking.email}</strong>
                  </p>
                </div>

                {/* The Ticket Itself */}
                <div 
                  id="printable-ticket" 
                  className="mt-8 border border-[#0284c7]/20 bg-[#bae6fd]/25 backdrop-blur-md rounded-2xl p-6 text-left relative overflow-hidden shadow-xl"
                >
                  {/* Decorative curved tickets cutouts */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-r border-[#0284c7]/20 print:hidden" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l border-[#0284c7]/20 print:hidden" />
                  
                  {/* Water Paradise Brand Identity */}
                  <div className="flex justify-between items-start pb-4 border-b border-[#0284c7]/15">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#032b45] uppercase tracking-wider font-rustic" style={{ fontFamily: "var(--font-display)", fontSize: '1.5rem' }}>
                        Water Paradise<sup className="text-[10px] font-sans">®</sup>
                      </h4>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=WATER+PARADISE+WATERPARK,+XR4M%2B838,+On+bhitauda+road,+Fatehpur,+Uttar+Pradesh+212601"
                        target="_blank"
                        rel="noreferrer referrer"
                        className="text-[10px] text-[#0c4a6e] hover:text-emerald-700 hover:underline font-bold uppercase tracking-widest font-mono block mt-0.5"
                      >
                        Fatehpur, Uttar Pradesh
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 shadow-sm">
                        CONFIRMED PASS
                      </span>
                      <p className="text-[9px] text-[#0c4a6e] font-mono mt-1 font-bold">ISSUED ON {confirmedBooking.createdAt}</p>
                    </div>
                  </div>

                  {/* Booking parameters details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Ticket Holder</span>
                      <strong className="text-sm font-sans font-extrabold text-[#032b45]">{confirmedBooking.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Date of Visit</span>
                      <strong className="text-sm font-sans font-extrabold text-[#032b45]">{new Date(confirmedBooking.visitDate).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Ticket Reference</span>
                      <strong className="text-sm font-mono text-[#032b45] font-extrabold">{confirmedBooking.ticketCode}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 pb-6 border-b border-[#0284c7]/15">
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Attendees Summary</span>
                      <strong className="text-xs font-sans text-[#032b45] font-extrabold">
                        {confirmedBooking.adultCount} Adult{confirmedBooking.adultCount > 1 ? 's' : ''}
                        {confirmedBooking.childCount > 0 ? `, ${confirmedBooking.childCount} Child(ren)` : ''}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Accessory Rentals</span>
                      <strong className="text-xs font-sans text-[#032b45] font-extrabold">
                        {confirmedBooking.lockerRequired ? 'Locker' : 'No Locker'}
                        {confirmedBooking.rentalCostumesCount > 0 ? ` • ${confirmedBooking.rentalCostumesCount} Suit(s)` : ''}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#0c4a6e] uppercase font-mono block font-bold">Total Paid (INR)</span>
                      <strong className="text-sm font-extrabold text-[#032b45]">₹{confirmedBooking.totalAmount}</strong>
                    </div>
                  </div>

                  {/* QR Code Container visual mockup */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
                    <div className="text-xs text-[#0c4a6e] max-w-sm">
                      <p className="font-extrabold text-[#032b45] mb-1">Gate Entry Instructions:</p>
                      <ul className="list-disc pl-4 space-y-0.5 text-[10px] font-semibold">
                        <li>Show this Digital QR Pass code on your mobile at the reception bar.</li>
                        <li>Nylon swimwear is strictly mandatory to enter deep pools.</li>
                        <li>Outside beverages is strictly banned inside.</li>
                        <li>Park hours: 10:00 AM – 6:00 PM.</li>
                      </ul>
                    </div>
                    <div className="flex flex-col items-center">
                      {/* Fake stylized QR code using CSS blocks */}
                      <div className="w-24 h-24 bg-white p-2 rounded-xl flex flex-wrap items-center justify-center relative shadow-md">
                        {/* Interactive QR pattern generator */}
                        <div className="grid grid-cols-6 gap-[2px] w-full h-full opacity-90">
                          {Array.from({ length: 36 }).map((_, i) => {
                            const isAnchor = (i < 3 || (i >= 6 && i < 9) || i % 6 === 0 || i % 6 === 1) && i < 15;
                            const isActive = isAnchor || Math.random() > 0.45;
                            return (
                              <div
                                key={i}
                                className={`rounded-[1px] ${isActive ? 'bg-[#0f172a]' : 'bg-transparent'}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <span className="text-[8px] tracking-widest font-mono text-[#0c4a6e] mt-1.5 uppercase font-bold">SCAN AT ENTRANCE</span>
                    </div>
                  </div>
                </div>

                {/* Ticket controls */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 rounded-full border border-[#0284c7]/40 hover:bg-[#bae6fd]/20 text-xs font-bold text-[#0284c7] flex items-center gap-2 duration-300 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Ticket Pass
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 rounded-full bg-[#0284c7] text-white text-xs font-extrabold flex items-center gap-2 hover:scale-[1.02] duration-300 cursor-pointer shadow-md"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Book Another Pass
                  </button>
                </div>
              </div>
            ) : (
              /* STATE 2: INPUT FORM STATE */
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <h3 className="text-xl font-bold text-[#032b45] mb-1 font-display" style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem' }}>
                    1. Direct Booking Holder Details
                  </h3>
                  <p className="text-[11px] text-[#0c4a6e] font-semibold">Provide booking confirmation recipient contact information.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider uppercase font-extrabold text-[#0c4a6e] flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> Full Name <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aditya Kumar"
                      className="w-full bg-sky-50/50 hover:bg-sky-100/50 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold placeholder-[#0c4a6e]/40"
                    />
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider uppercase font-extrabold text-[#0c4a6e] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Date of Visit <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-sky-50/50 hover:bg-sky-100/50 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider uppercase font-extrabold text-[#0c4a6e] flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" /> Email Address <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aditya@example.com"
                      className="w-full bg-sky-50/50 hover:bg-sky-100/50 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold placeholder-[#0c4a6e]/40"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] tracking-wider uppercase font-extrabold text-[#0c4a6e] flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" /> Mobile Number <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-sky-50/50 hover:bg-sky-100/50 focus:bg-white text-[#032b45] rounded-2xl border border-[#0284c7]/20 focus:border-[#0284c7] focus:outline-none p-3.5 text-sm transition-all font-semibold placeholder-[#0c4a6e]/40"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0284c7]/10">
                  <h3 className="text-xl font-bold text-[#032b45] mb-1 font-display" style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem' }}>
                    2. Select Passes & Quantity
                  </h3>
                  <p className="text-[11px] text-[#0c4a6e] font-semibold">Weekends feature slightly adjusted rates for peak DJ performances.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Adult Tickets */}
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-[#0284c7]/15 flex items-center justify-between shadow-sm">
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-[#032b45]">Adult General Pass</h4>
                      <p className="text-xs text-[#0c4a6e] mt-0.5 font-bold">₹{isWeekend ? '400' : '350'} / ticket</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={adultsCount <= 1}
                        onClick={() => setAdultsCount(adultsCount - 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 disabled:opacity-30 cursor-pointer text-sm font-extrabold"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono font-extrabold text-[#032b45] w-6 text-center">{adultsCount}</span>
                      <button
                        type="button"
                        onClick={() => setAdultsCount(adultsCount + 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 cursor-pointer text-sm font-extrabold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children Tickets */}
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-[#0284c7]/15 flex items-center justify-between shadow-sm">
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-[#032b45]">Children Pass (under 4.5ft)</h4>
                      <p className="text-xs text-[#0c4a6e] mt-0.5 font-bold">₹{isWeekend ? '250' : '200'} / ticket</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={childrenCount <= 0}
                        onClick={() => setChildrenCount(childrenCount - 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 disabled:opacity-30 cursor-pointer text-sm font-extrabold"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono font-extrabold text-[#032b45] w-6 text-center">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 cursor-pointer text-sm font-extrabold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0284c7]/10">
                  <h3 className="text-xl font-bold text-[#032b45] mb-1 font-display" style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem' }}>
                    3. Premium Essentials (Optional Extras)
                  </h3>
                  <p className="text-[11px] text-[#0c4a6e] font-semibold font-sans">Rentals can also be secured directly inside changing lockers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Locker Option checkbox */}
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-[#0284c7]/15 flex items-center justify-between shadow-sm">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="locker-qty"
                        checked={lockerRequired}
                        onChange={(e) => setLockerRequired(e.target.checked)}
                        className="w-5 h-5 rounded-md border-[#0284c7]/30 bg-white text-[#0284c7] focus:ring-0 mt-0.5 cursor-pointer"
                      />
                      <div className="text-left">
                        <label htmlFor="locker-qty" className="text-sm font-extrabold text-[#032b45] cursor-pointer">
                          Premium Security Locker
                        </label>
                        <p className="text-[11px] text-[#0c4a6e] mt-0.5 font-bold">₹60 per locker flat rate</p>
                      </div>
                    </div>
                  </div>

                  {/* Nylon Outfit Rental counts */}
                  <div className="p-4 rounded-2xl bg-sky-50/50 border border-[#0284c7]/15 flex items-center justify-between shadow-sm">
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-[#032b45]">Nylon Costume Rental</h4>
                      <p className="text-xs text-[#0c4a6e] mt-0.5 font-bold">₹50 / outfit</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        disabled={rentalsCount <= 0}
                        onClick={() => setRentalsCount(rentalsCount - 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 disabled:opacity-30 cursor-pointer text-sm font-extrabold"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono font-extrabold text-[#032b45] w-6 text-center">{rentalsCount}</span>
                      <button
                        type="button"
                        onClick={() => setRentalsCount(rentalsCount + 1)}
                        className="w-8 h-8 rounded-full bg-[#bae6fd]/30 border border-[#0284c7]/15 text-[#032b45] flex items-center justify-center hover:bg-[#bae6fd]/60 cursor-pointer text-sm font-extrabold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#0284c7]/15 flex items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] text-[#0c4a6e] uppercase font-mono tracking-wider font-extrabold">Estimated Total</span>
                    <strong className="block text-2xl text-[#032b45] font-sans font-extrabold">₹{totalPrice}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-[#0284c7] text-white text-sm font-extrabold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
                  >
                    Generate Entry Pass
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Side: Informative panel/booking summary and transaction history */}
          <div className="lg:col-span-4 p-8 bg-sky-50/80 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-left">
                <h4 className="text-xs uppercase tracking-widest text-[#0369a1] font-extrabold">GATE DETAILS</h4>
                <p className="text-xs text-[#0c4a6e]/95 mt-2 leading-relaxed font-semibold text-left">
                  Welcome to Fatehpur's first and largest premium water resort destination. All bookings are final and valid for any single day in the chosen calendar month if weather calls for closing.
                </p>
              </div>

              {/* Dynamic summary items */}
              {!confirmedBooking && (
                <div className="p-4 rounded-2xl bg-white/70 border border-[#0284c7]/15 space-y-3.5 shadow-sm">
                  <h5 className="text-xs uppercase tracking-wider text-[#032b45] font-extrabold text-left">Price Estimate Breakdown</h5>
                  <div className="space-y-2 text-xs font-semibold text-left">
                    <div className="flex justify-between">
                      <span className="text-[#0c4a6e]">Adult Ticket ({adultsCount}x)</span>
                      <span className="text-[#032b45] font-extrabold">₹{adultsCount * (isWeekend ? 400 : 350)}</span>
                    </div>
                    {childrenCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#0c4a6e]">Child Ticket ({childrenCount}x)</span>
                        <span className="text-[#032b45] font-extrabold">₹{childrenCount * (isWeekend ? 250 : 200)}</span>
                      </div>
                    )}
                    {lockerRequired && (
                      <div className="flex justify-between">
                        <span className="text-[#0c4a6e]">Secure Vault Locker</span>
                        <span className="text-[#032b45] font-extrabold">₹60</span>
                      </div>
                    )}
                    {rentalsCount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#0c4a6e]">Swim Costume ({rentalsCount}x)</span>
                        <span className="text-[#032b45] font-extrabold">₹{rentalsCount * 50}</span>
                      </div>
                    )}
                    <div className="border-t border-[#0284c7]/15 pt-2 flex justify-between font-extrabold text-[#032b45] text-sm">
                      <span>Grand Sum</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking History section */}
              {bookingHistory.length > 0 && (
                <div className="pt-4 border-t border-[#0284c7]/15 space-y-3 text-left">
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs uppercase tracking-wider text-[#032b45] font-extrabold flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> Recent Tickets ({bookingHistory.length})
                    </h5>
                    <button
                      onClick={() => {
                        localStorage.removeItem('wp_ticket_bookings');
                        setBookingHistory([]);
                      }}
                      className="text-[9px] uppercase tracking-wider text-red-600 hover:text-red-500 font-extrabold cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>

                  {/* List recent bookings */}
                  <div className="max-h-52 overflow-y-auto space-y-2 pr-1.5 custom-scrollbar">
                    {bookingHistory.slice(0, 3).map((hist) => (
                      <div
                        key={hist.id}
                        onClick={() => setConfirmedBooking(hist)}
                        className="p-3 rounded-xl bg-white/70 hover:bg-white border border-[#0284c7]/10 cursor-pointer transition-all duration-300 flex justify-between items-center shadow-sm"
                      >
                        <div className="text-left">
                          <p className="text-xs text-[#032b45] uppercase font-mono tracking-wider truncate max-w-[130px] font-extrabold text-left">
                            {hist.fullName}
                          </p>
                          <p className="text-[10px] text-[#0c4a6e] mt-0.5 font-bold text-left">
                            {hist.visitDate} • {hist.adultCount}A, {hist.childCount}C
                          </p>
                        </div>
                        <span className="text-xs font-mono font-extrabold text-[#0369a1]">
                          ₹{hist.totalAmount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick contact / resort support */}
            <div className="pt-6 mt-8 border-t border-[#0284c7]/10 text-[10px] text-[#0c4a6e]/95 leading-relaxed font-semibold text-left">
              <p className="font-extrabold text-[#032b45] text-left">Need Help booking?</p>
              <p className="mt-1 text-left">Inquiry helpline: +91 91409 52750</p>
              <p className="text-left">Email: info@waterparadisewaterpark.com</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
