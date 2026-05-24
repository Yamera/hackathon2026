import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/colors';
import { BorderRadius } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
  borderGlow?: boolean;
  glowColor?: string;
  noPadding?: boolean;
}

export function GlassCard({
  children,
  style,
  intensity = 20,
  borderGlow = false,
  glowColor = Colors.purple,
  noPadding = false,
}: GlassCardProps) {
  return (
    <View
      style={[
        styles.container,
        borderGlow && { borderColor: glowColor, borderWidth: 1 },
        style,
      ]}
    >
      <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={[styles.overlay, StyleSheet.absoluteFill]} />
      <View style={noPadding ? undefined : styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  overlay: {
    backgroundColor: Colors.glass,
  },
  content: {
    padding: 16,
  },
});
