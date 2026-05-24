import { COLORS } from './colors';

export const stories = [
  { id: 'new', name: 'Nouvelle', type: 'new' },
  {
    id: 'maya',
    name: 'Maya',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=400',
    online: true,
  },
  {
    id: 'alex',
    name: 'Alex',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    online: true,
  },
  {
    id: 'lea',
    name: 'Léa',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    online: true,
  },
  {
    id: 'jay',
    name: 'Jay',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400',
    online: true,
  },
];

export const conversations = [
  {
    id: '1',
    name: 'Maya Ben',
    verified: true,
    message: "Super ! On se voit samedi pour l'atelier alors 😊",
    time: '10:24',
    unread: 2,
    active: true,
    online: true,
    image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=400',
  },
  {
    id: '2',
    name: 'Thomas G.',
    message: 'Merci pour ton message, ça me motive beaucoup !',
    time: '09:11',
    online: true,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=400',
  },
  {
    id: '3',
    name: 'Léa Martin',
    message: 'On peut se faire un call cette semaine ?',
    time: 'Hier',
    unread: 1,
    online: true,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  },
  {
    id: '4',
    name: 'Studio 303',
    message: 'Ta présence à l\'événement est confirmée ✅',
    time: 'Hier',
    online: true,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
  },
  {
    id: '5',
    name: 'Art Collectif',
    message: 'Nouveau projet : "Voix Multiples" Rejoins-nous !',
    time: 'Mar.',
    online: true,
    image: null,
    initials: 'ART\nCOLLECTIF',
  },
  {
    id: '6',
    name: 'DJ Snake',
    message: 'Le mix est prêt 🎧 Dis-moi ce que t\'en penses !',
    time: 'Lun.',
    online: true,
    image: 'https://images.unsplash.com/photo-1598387846148-47e82ee120cc?q=80&w=400',
  },
];

export const storyGradient = [COLORS.purple, COLORS.coral] as const;
