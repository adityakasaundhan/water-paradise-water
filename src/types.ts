export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'slides' | 'pools' | 'events' | 'kids';
  imageUrl: string;
  heightRequirement?: string;
  intensityLevel?: 'Low' | 'Medium' | 'High' | 'Extreme';
  stats: {
    label: string;
    value: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Slides' | 'Pools' | 'Events' | 'Vibe';
}

export interface TicketBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  visitDate: string;
  adultCount: number;
  childCount: number;
  lockerRequired: boolean;
  rentalCostumesCount: number;
  totalAmount: number;
  ticketCode: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
