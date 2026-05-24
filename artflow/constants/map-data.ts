import { COLORS } from './colors';

export const categories = [
  { id: 'all', label: 'Tous', icon: 'sparkles', color: COLORS.purple, active: true },
  { id: 'visual', label: 'Art visuel', icon: 'palette', color: COLORS.yellow, active: false },
  { id: 'scene', label: 'Art de la scène', icon: 'drama-masks', color: COLORS.coral, active: false },
  { id: 'audio', label: 'Art audio', icon: 'music', color: COLORS.purple, active: false },
];

export const mapPins = [
  { id: '1', icon: 'image', color: COLORS.yellow, top: 70, left: 105 },
  { id: '2', icon: 'microphone', color: COLORS.coral, top: 62, left: 235 },
  { id: '3', icon: 'music', color: COLORS.purple, top: 105, left: 315 },
  { id: '4', icon: 'guitar-acoustic', color: COLORS.turquoise, top: 170, left: 35 },
  { id: '5', icon: 'piano', color: COLORS.purple, top: 245, left: 95 },
  { id: '6', icon: 'camera', color: COLORS.yellow, top: 230, left: 270 },
  { id: '7', icon: 'drama-masks', color: COLORS.turquoise, top: 300, left: 320 },
];

export const nearbyEvents = [
  {
    id: '1',
    title: 'Stand-up Show',
    subtitle: 'Open Mic',
    time: '20:00',
    distance: '150 m',
    icon: 'microphone',
    color: COLORS.coral,
    image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?q=80&w=600',
  },
  {
    id: '2',
    title: 'DJ Set',
    subtitle: 'House & Techno',
    time: '22:00',
    distance: '300 m',
    icon: 'music',
    color: COLORS.purple,
    image: 'https://images.unsplash.com/photo-1571266028243-d220c9c7c752?q=80&w=600',
  },
  {
    id: '3',
    title: "Exposition d'art",
    subtitle: 'Galerie Le Bloc',
    time: '10:00 – 18:00',
    distance: '450 m',
    icon: 'palette',
    color: COLORS.yellow,
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600',
  },
  {
    id: '4',
    title: 'Concert acoustique',
    subtitle: 'Musique live',
    time: '21:00',
    distance: '600 m',
    icon: 'music-circle',
    color: COLORS.turquoise,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600',
  },
];
