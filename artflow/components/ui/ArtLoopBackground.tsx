import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GlowProps = {
  colors: readonly [string, string];
  style: StyleProp<ViewStyle>;
  start: { x: number; y: number };
  end: { x: number; y: number };
};

// React Native Web accepts CSS backgrounds, but the native ViewStyle type does not expose them.
const webBackground = Platform.OS === 'web'
  ? ({
    backgroundImage: [
      'radial-gradient(circle at top left, rgba(255, 209, 102, 0.75), transparent 30%)',
      'radial-gradient(circle at top right, rgba(78, 205, 196, 0.45), transparent 28%)',
      'radial-gradient(circle at bottom left, rgba(255, 122, 89, 0.35), transparent 28%)',
      'radial-gradient(circle at bottom right, rgba(124, 92, 255, 0.35), transparent 30%)',
    ].join(', '),
  } as unknown as ViewStyle)
  : undefined;

function Glow({ colors, style, start, end }: GlowProps) {
  return (
    <View style={[styles.glow, style]}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

export default function ArtLoopBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.base, webBackground]} pointerEvents="none">
      {Platform.OS === 'web' ? null : (
        <>
          <Glow
            colors={['rgba(255,209,102,0.75)', 'rgba(255,209,102,0)']}
            style={styles.topLeft}
            start={{ x: 0.18, y: 0.18 }}
            end={{ x: 0.9, y: 0.9 }}
          />
          <Glow
            colors={['rgba(78,205,196,0.45)', 'rgba(78,205,196,0)']}
            style={styles.topRight}
            start={{ x: 0.82, y: 0.18 }}
            end={{ x: 0.1, y: 0.9 }}
          />
          <Glow
            colors={['rgba(255,122,89,0.35)', 'rgba(255,122,89,0)']}
            style={styles.bottomLeft}
            start={{ x: 0.18, y: 0.82 }}
            end={{ x: 0.9, y: 0.1 }}
          />
          <Glow
            colors={['rgba(124,92,255,0.35)', 'rgba(124,92,255,0)']}
            style={styles.bottomRight}
            start={{ x: 0.82, y: 0.82 }}
            end={{ x: 0.08, y: 0.08 }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFF8EF',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    borderRadius: 999,
    overflow: 'hidden',
  },
  topLeft: {
    top: -80,
    left: -100,
    width: 310,
    height: 310,
  },
  topRight: {
    top: -85,
    right: -115,
    width: 290,
    height: 290,
  },
  bottomLeft: {
    bottom: -115,
    left: -125,
    width: 300,
    height: 300,
  },
  bottomRight: {
    bottom: -110,
    right: -90,
    width: 315,
    height: 315,
  },
});
