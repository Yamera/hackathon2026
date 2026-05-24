import { StyleSheet } from 'react-native';

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
};

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const LineHeight = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7,
};

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
};

export const Typography = StyleSheet.create({
  displayLarge: {
    fontFamily: FontFamily.extrabold,
    fontSize: FontSize['5xl'],
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
    color: '#FFFFFF',
  },
  displayMedium: {
    fontFamily: FontFamily.extrabold,
    fontSize: FontSize['4xl'],
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['4xl'] * LineHeight.tight,
    color: '#FFFFFF',
  },
  displaySmall: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
    color: '#FFFFFF',
  },
  headingLarge: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    letterSpacing: LetterSpacing.tight,
    color: '#FFFFFF',
  },
  headingMedium: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.xl,
    letterSpacing: LetterSpacing.tight,
    color: '#FFFFFF',
  },
  headingSmall: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.lg,
    color: '#FFFFFF',
  },
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.relaxed,
    color: 'rgba(255,255,255,0.65)',
  },
  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    color: 'rgba(255,255,255,0.65)',
  },
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    color: 'rgba(255,255,255,0.65)',
  },
  label: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.xs,
    letterSpacing: LetterSpacing.widest,
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
  },
  caption: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.45)',
  },
});
