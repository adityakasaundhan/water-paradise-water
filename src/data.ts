import { Attraction, GalleryItem, FAQItem } from './types';

export const BACKGROUND_VIDEOS = [
  {
    id: 'sunny-pool',
    name: 'Glistening Sunlit Pool',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-water-splashes-in-a-sunny-swimming-pool-42282-large.mp4',
    description: 'Refreshing water splashing under bright golden summer rays.'
  },
  {
    id: 'clean-ripples',
    name: 'Aqua Ripple Loop',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-and-transparent-water-under-the-sun-42284-large.mp4',
    description: 'Serene crystal clear aqua ripples under gorgeous tropical sunlight.'
  },
  {
    id: 'active-friends',
    name: 'Friends Pool Splash',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-young-people-diving-into-a-swimming-pool-42285-large.mp4',
    description: 'Happy high-energy moments diving in pristine pools.'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'turbo-cascade',
    name: 'Turbo Cascade Slide',
    description: 'Fatehpur\'s highest and fastest thrill slide. Plunge through multiple corkscrew coils and finish with an epic, breathtaking splash pool touchdown.',
    category: 'slides',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'Above 120 cm',
    intensityLevel: 'Extreme',
    stats: [
      { label: 'Max Speed', value: '45 km/h' },
      { label: 'Slide Length', value: '140 meters' },
      { label: 'G-Force Max', value: '2.4 G' }
    ]
  },
  {
    id: 'lagoon-oasis',
    name: 'Grand Paradise Lagoon',
    description: 'Escape into our massive premium swimming pool surrounded by elegant loungers, dynamic water geysers, and pristine crystal reflections that shine under the sun.',
    category: 'pools',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'All Ages (Kids with parents)',
    intensityLevel: 'Low',
    stats: [
      { label: 'Water Depth', value: '1.2 - 1.8m' },
      { label: 'Pool Area', value: '18,500 sq ft' },
      { label: 'Sanitation', value: '24/7 Active UV' }
    ]
  },
  {
    id: 'rain-shakedown',
    name: 'Tropical DJ Rain Dance',
    description: 'Unleash your inner rhythm under a refreshing state-of-the-art downpour system syncing high-pressure mist, colorful club lasers, and booming soundscapes.',
    category: 'events',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'No restriction',
    intensityLevel: 'High',
    stats: [
      { label: 'Mist Outlets', value: '64 Surround' },
      { label: 'Audio Power', value: '8,000 Watts' },
      { label: 'Laser Colors', value: 'RGB Multi-Spectrum' }
    ]
  },
  {
    id: 'lil-splash-bay',
    name: 'Little Splash Adventure',
    description: 'A custom, super-safe aqua playground crafted exclusively for youngsters. Safe mini-slides, gentle bucket dumps, and funny animal water-spray sculptures.',
    category: 'kids',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'Below 130 cm',
    intensityLevel: 'Low',
    stats: [
      { label: 'Avg Depth', value: '0.4 meters' },
      { label: 'Interactive Games', value: '12 Stations' },
      { label: 'Avg Water Temp', value: '26°C Warm' }
    ]
  },
  {
    id: 'cyclone-vortex',
    name: 'Vortex Deep Plunge',
    description: 'Enter a funnel of pure excitement before sliding down an open-air slide. It is a cinematic experience with sweeping views of the entire water park before the grand dunk.',
    category: 'slides',
    imageUrl: 'https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'Above 130 cm',
    intensityLevel: 'High',
    stats: [
      { label: 'Funnel Diameter', value: '12 meters' },
      { label: 'Drop Height', value: '15 meters' },
      { label: 'Ride Duration', value: '45 seconds' }
    ]
  },
  {
    id: 'monsoon-river',
    name: 'Monsoon Lazy River',
    description: 'Grab a standard premium single or double ring-tube and float lazily along our beautifully landscaped canal under cascading waterfalls and tropical shade trees.',
    category: 'pools',
    imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800&auto=format&fit=crop',
    heightRequirement: 'All Ages',
    intensityLevel: 'Low',
    stats: [
      { label: 'Length', value: '380 meters' },
      { label: 'Float Speed', value: '1.2 km/h' },
      { label: 'Water Capacity', value: '1.5M Litres' }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Grand Thrill Cascade',
    description: 'Exciting swirls of our peak high-speed multi-lane racer slides and steep curves.',
    imageUrl: 'https://res.cloudinary.com/dqfggutr5/image/upload/f_auto,q_auto/1000085328_xqpfyi',
    category: 'Slides'
  },
  {
    id: 'g2',
    title: 'Prismatic Lagoon Oasis',
    description: 'Glistening azure family pools and beautiful crystal-clear water layout at Water Paradise.',
    imageUrl: 'https://res.cloudinary.com/dqfggutr5/image/upload/v1780745524/Screenshot_20260606-164640_Google_smyook.png',
    category: 'Pools'
  },
  {
    id: 'g3',
    title: 'DJ Laser Rain Stage',
    description: 'High-pumping energetic rain dance parties with vibrant dynamic multi-color light shows.',
    imageUrl: 'https://res.cloudinary.com/dqfggutr5/image/upload/v1780745707/Screenshot_20260606-164718_Google_unldym.png',
    category: 'Events'
  },
  {
    id: 'g4',
    title: 'Luxurious Water Resort Sanctuary',
    description: 'The majestic grand entrance and sun-drenched wellness layout of our premier venue.',
    imageUrl: 'https://res.cloudinary.com/dqfggutr5/image/upload/f_auto,q_auto/1000085327_rer9ud',
    category: 'Vibe'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What are the ticket rates for entry?',
    answer: 'Our general entry tickets are affordable and competitive. On weekdays (Monday to Friday), the entry fee is ₹350. On weekends (Saturday and Sunday) and national holidays, the entry fee is ₹400. Children below 3 feet height can enter for free.',
    category: 'Tickets'
  },
  {
    id: 'f2',
    question: 'Are swimsuits mandatory? Can we rent them at the resort?',
    answer: 'Yes, Nylon or Polyester swimwear is strictly required to access all pools and slides for safety and hygiene. But don\'t worry! We offer premium quality, sanitized swimwear rentals and purchases for men, women, and children directly at our changing rooms for a very nominal charge.',
    category: 'Hygiene'
  },
  {
    id: 'f3',
    question: 'What is included in the Day Pass ticket?',
    answer: 'Your standard Day Pass ticket includes unlimited, full-day access to all major water slides, lazy river, family swimming pools, the DJ Rain Dance floor, changing rooms, and shower facilities. Locker rentals, costumes, and food/beverages are available at extra charges.',
    category: 'Tickets'
  },
  {
    id: 'f4',
    question: 'Are there professional lifeguards on duty?',
    answer: 'Absolutely. Safety is our ultimate premium parameter. We have a team of highly-trained, certified lifeguards positioned at every single pool, slide-descent, and slide-arrival point. A fully equipped medical room is also present in case of any discomfort.',
    category: 'Safety'
  },
  {
    id: 'f5',
    question: 'Is outside food or drinks permitted inside?',
    answer: 'No, outside food, snacks, and soft beverages are not permitted inside variables for safety and layout cleanliness. However, we host multiple premium food courts and kiosks inside offering delicious, freshly prepared regional delicacies, street food, ice creams, and refreshing drinks at reasonable prices.',
    category: 'Rules'
  }
];
