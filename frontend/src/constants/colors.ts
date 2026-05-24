export const COLORS = {
  cream: '#FFF8EF',
  purple: '#7C5CFF',
  coral: '#FF7A59',
  yellow: '#FFD166',
  turquoise: '#4ECDC4',
  dark: '#1F2937',
  white: '#FFFFFF',
  gray: '#6B7280',
  softGray: '#F3EEE8',
  grayCard: '#DDD8D8',
  grayText: '#6B7280',
};

export const Colors = {
  // Backgrounds
  bg: '#080810',
  surface: '#0F0F1A',
  elevated: '#161625',
  card: '#1A1A2E',
  cardAlt: '#12121E',

  // Borders
  border: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.12)',
  borderGlow: 'rgba(124,58,237,0.3)',

  // Purple (primary brand)
  purple: '#7C3AED',
  purpleLight: '#A78BFA',
  purpleBright: '#8B5CF6',
  purpleDark: '#5B21B6',
  purpleMuted: 'rgba(124,58,237,0.15)',
  purpleGlow: 'rgba(124,58,237,0.35)',

  // Blue
  blue: '#2563EB',
  blueLight: '#60A5FA',
  blueMuted: 'rgba(37,99,235,0.15)',

  // Pink
  pink: '#DB2777',
  pinkLight: '#F472B6',
  pinkMuted: 'rgba(219,39,119,0.15)',

  // Cyan
  cyan: '#0891B2',
  cyanLight: '#67E8F9',
  cyanMuted: 'rgba(8,145,178,0.15)',

  // Amber (comedy/entertainment)
  amber: '#D97706',
  amberLight: '#FCD34D',
  amberMuted: 'rgba(217,119,6,0.15)',

  // Green
  green: '#059669',
  greenLight: '#34D399',
  greenMuted: 'rgba(5,150,105,0.15)',

  // Red (live)
  live: '#EF4444',
  liveMuted: 'rgba(239,68,68,0.15)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.65)',
  textTertiary: 'rgba(255,255,255,0.35)',
  textDisabled: 'rgba(255,255,255,0.20)',

  // Glass
  glass: 'rgba(255,255,255,0.05)',
  glassStrong: 'rgba(255,255,255,0.10)',
  glassBorder: 'rgba(255,255,255,0.08)',

  // Gradients (use with LinearGradient)
  gradients: {
    purple: ['#7C3AED', '#5B21B6'] as const,
    purpleBlue: ['#8B5CF6', '#2563EB'] as const,
    purplePink: ['#7C3AED', '#DB2777'] as const,
    aurora: ['#8B5CF6', '#3B82F6', '#06B6D4'] as const,
    night: ['#080810', '#0F0F1A'] as const,
    cardGlow: ['rgba(124,58,237,0.2)', 'rgba(124,58,237,0)'] as const,
    overlayBottom: ['rgba(8,8,16,0)', 'rgba(8,8,16,0.95)'] as const,
    overlayTop: ['rgba(8,8,16,0.8)', 'rgba(8,8,16,0)'] as const,
    pinkPurple: ['#DB2777', '#7C3AED'] as const,
    cyanBlue: ['#0891B2', '#2563EB'] as const,
    amberPink: ['#D97706', '#DB2777'] as const,
  },

  // Category event type colors
  categoryColors: {
    music: '#7C3AED',
    comedy: '#D97706',
    dance: '#DB2777',
    visual: '#0891B2',
    theater: '#2563EB',
    photography: '#059669',
    poetry: '#8B5CF6',
    dj: '#EC4899',
    all: '#A78BFA',
  },
} as const;

export type CategoryType = keyof typeof Colors.categoryColors;
