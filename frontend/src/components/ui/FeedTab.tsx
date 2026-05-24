import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
  active?: boolean;
};

export function FeedTab({ label, active }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={[styles.wrapper, active && styles.activeWrapper]}
    >
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 39,
    paddingHorizontal: 17,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.58)',
  },
  activeWrapper: {
    backgroundColor: COLORS.purple,
  },
  text: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.gray,
  },
  activeText: {
    color: COLORS.white,
    fontWeight: '900',
  },
});
