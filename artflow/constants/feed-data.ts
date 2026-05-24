import { COLORS } from './colors';

export const tabs = ['Pour toi', 'Abonnements', 'Tendance', 'Local'];

export const stories = [
  {
    id: '1',
    name: 'Maya',
    live: true,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
  },
  {
    id: '2',
    name: 'Elena',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
  },
  {
    id: '3',
    name: 'Sofia',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400',
  },
  {
    id: '4',
    name: 'DJ Nocturn',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
  },
  {
    id: '5',
    name: 'Kailens',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400',
  },
];

export const trending = [
  {
    id: '1',
    name: 'Maya Chen',
    subtitle: 'Jazz pianiste & compositrice',
    live: true,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    color: COLORS.coral,
  },
  {
    id: '2',
    name: 'Alex Rivera',
    subtitle: 'DJ électronique & producteur',
    image: 'https://images.unsplash.com/photo-1571266028243-d220c9c7c752?q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    color: COLORS.turquoise,
  },
  {
    id: '3',
    name: 'Elena Vasquez',
    subtitle: 'Danse contemporaine',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    color: COLORS.purple,
  },
];

export const posts = [
  {
    id: '1',
    artist: 'Maya Chen',
    location: 'Blue Note Café, NYC',
    time: '4h',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=900',
    likes: '1,2K',
    comments: '89',
    shares: '34',
    caption: 'Hier soir au Blue Note était magique. Merci à tous ceux qui sont venus ✨ Nouveau morceau original disponible maintenant !',
    tags: ['#jazz', '#piano', '#livemusic', '#nyc'],
    accent: COLORS.purple,
  },
  {
    id: '2',
    artist: 'Elena Vasquez',
    location: 'Williamsburg, Brooklyn',
    time: '8h',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900',
    likes: '4,5K',
    comments: '312',
    shares: '201',
    caption: 'Nouvelle chorégraphie pour la performance du parc. Mouvement, émotion et lumière.',
    tags: ['#dance', '#contemporary', '#movement'],
    accent: COLORS.coral,
  },
];
