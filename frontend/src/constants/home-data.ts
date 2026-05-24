import { COLORS } from './colors';

export const moods = [
  { id: '1', title: 'Festive', icon: 'party-popper', color: COLORS.yellow },
  { id: '2', title: 'Rigolote', icon: 'emoticon-lol-outline', color: COLORS.coral },
  { id: '3', title: 'Dansante', icon: 'dance-ballroom', color: COLORS.purple },
  { id: '4', title: 'Dramatique', icon: 'drama-masks', color: COLORS.purple },
  { id: '5', title: 'Romantique', icon: 'heart-multiple', color: COLORS.turquoise },
];

export const homeEvents = [
  {
    id: '1',
    title: 'Stand-up local',
    category: 'Humour',
    distance: '150 m',
    time: '20:00',
    icon: 'microphone',
    color: COLORS.coral,
  },
  {
    id: '2',
    title: 'DJ Set',
    category: 'Musique',
    distance: '300 m',
    time: '22:00',
    icon: 'headphones',
    color: COLORS.purple,
  },
];
